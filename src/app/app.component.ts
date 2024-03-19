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
        const amountTo = this.currenciesService.getAmount(
          amountFrom,
          this.form.value.currencyFrom as Pairs,
          this.form.value.currencyTo as Pairs,
        );
        this.form.get('amountTo')?.setValue(amountTo, { emitEvent: false });
      });

    combineLatest([this.currenciesService.isLoaded$, this.form.get('amountTo')!.valueChanges])
      .pipe(filter(([isLoaded]) => !isLoaded))
      .subscribe(([, amountTo]) => {
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
}
