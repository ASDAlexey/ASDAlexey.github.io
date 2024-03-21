import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroupDirective, NgForm, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { combineLatest, delay, filter, startWith, take } from 'rxjs';

import { Pairs } from './services/currencies.interface';
import { CurrenciesService } from './services/currencies.service';

interface Data {
  amountFrom: FormControl<string>;
  currencyFrom: FormControl<Pairs | ''>;
  amountTo: FormControl<string>;
  currencyTo: FormControl<Pairs | ''>;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  isLoaded$ = this.currenciesService.isLoaded$;
  matcher = new MyErrorStateMatcher();

  currencies = [
    { name: '₽', code: Pairs.RUB },
    { name: '$', code: Pairs.USD },
    { name: '€', code: Pairs.EUR },
    { name: '£', code: Pairs.GBP },
  ];

  form = this.formBuilder.group<Data>({
    amountFrom: this.formBuilder.control('', [Validators.required]),
    currencyFrom: this.formBuilder.control(Pairs.USD, [Validators.required]),
    amountTo: this.formBuilder.control('', [Validators.required]),
    currencyTo: this.formBuilder.control(Pairs.RUB, [Validators.required]),
  });

  readonly #destroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private currenciesService: CurrenciesService,
  ) {}

  ngOnInit(): void {
    this.loadCurrencyPairsRates();
  }

  ngAfterViewInit(): void {
    this.formListener();
  }

  swap(): void {
    const { currencyFrom = Pairs.USD, currencyTo = Pairs.RUB, amountFrom = '' } = this.form.value;
    this.form.patchValue({ currencyFrom: currencyTo, currencyTo: currencyFrom }, { emitEvent: false });
    this.form.get('amountFrom')?.setValue(amountFrom);
  }

  input(event: Event): boolean {
    const key = (event as KeyboardEvent).key;

    if (key === 'Backspace' || key === 'ArrowLeft' || key === 'ArrowRight') {
      return true;
    }

    const regex = /[\d,]/;

    if (!regex.test(key)) {
      return false;
    }

    if (key === '.') {
      return false;
    }

    const input = event.target as HTMLInputElement;

    if (!(event.target as HTMLInputElement).value && key === ',') {
      return false;
    }

    if (key === ',' && (event.target as HTMLInputElement).value.match(',')) {
      return false;
    }

    const selection = input.value.substring(input.selectionStart ?? 0, input.selectionEnd ?? 0);
    const selectionStart = input.selectionStart ?? 0;
    const index = input.value.indexOf(',') + 1;

    if (selection && (!!selection.match(',') || selectionStart >= index)) {
      return true;
    }

    return this.getDigits(input.value) < 2;
  }

  private formListener(): void {
    combineLatest([
      this.currenciesService.isLoaded$,
      this.form.get('amountFrom')!.valueChanges,
      this.form.get('currencyFrom')!.valueChanges.pipe(startWith(this.form.value.currencyFrom ?? Pairs.USD)),
      this.form.get('currencyTo')!.valueChanges.pipe(startWith(this.form.value.currencyTo ?? Pairs.RUB)),
    ])
      .pipe(
        filter(([isLoaded]) => !isLoaded),
        delay(0),
      )
      .subscribe(([, amountFrom]) => {
        if (amountFrom.endsWith(',')) {
          amountFrom = amountFrom.replace(',', '');
        }

        const amountTo = this.currenciesService.getAmount(
          amountFrom,
          this.form.value.currencyFrom as Pairs,
          this.form.value.currencyTo as Pairs,
        );
        this.form.get('amountTo')?.setValue(amountTo, { emitEvent: false });
      });

    combineLatest([this.currenciesService.isLoaded$, this.form.get('amountTo')!.valueChanges])
      .pipe(
        filter(([isLoaded]) => !isLoaded),
        delay(0),
      )
      .subscribe(([, amountTo]) => {
        if (amountTo.endsWith(',')) {
          amountTo = amountTo.replace(',', '');
        }

        const amountFrom = this.currenciesService.getAmount(
          amountTo,
          this.form.value.currencyTo as Pairs,
          this.form.value.currencyFrom as Pairs,
        );
        this.form.get('amountFrom')?.setValue(amountFrom, { emitEvent: false });
      });
  }

  private loadCurrencyPairsRates(): void {
    this.currenciesService
      .loadCurrencyPairsRates(this.currencies.map((currency) => currency.code))
      .pipe(take(1), takeUntilDestroyed(this.#destroyRef))
      .subscribe((data) => {
        this.currenciesService.setCurrencyPairsRates(data);
      });
  }

  private getDigits(value: string): number {
    const i = value.indexOf(',') + 1;
    return i && value.length - i;
  }
}
