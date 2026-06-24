import { Injectable, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, Observable } from 'rxjs';
import { createSpyFromClass, Spy } from 'vitest-auto-spy';
import { injectSpy, mockAccessorsProp, mockReadonlyProp, mockReadonlyPropGetter, provideAutoSpy } from 'vitest-auto-spy/angular';
import 'vitest-auto-spy/rxjs';

@Injectable({ providedIn: 'root' })
class DemoService {
  readonly value$ = new Observable<number>();
  readonly count = signal(0);
  readonly version: number = 1;
  label = 'initial';

  getConfig(key: string): string {
    return `real:${key}`;
  }

  save(data: unknown): boolean {
    return Boolean(data);
  }
}

describe('vitest-auto-spy showcase', () => {
  describe('provideAutoSpy + injectSpy', () => {
    let service: Spy<DemoService>;

    beforeEach(() => {
      TestBed.configureTestingModule({ providers: [provideAutoSpy(DemoService)] });
      service = injectSpy(DemoService);
    });

    it('turns every prototype method into a mock', () => {
      service.getConfig.mockReturnValue('mocked');

      expect(service.getConfig('theme')).toBe('mocked');
      expect(service.getConfig).toHaveBeenCalledWith('theme');
    });

    it('dispatches return values by argument with calledWith', () => {
      service.getConfig.calledWith('theme').mockReturnValue('dark');
      service.getConfig.calledWith('lang').mockReturnValue('ru');

      expect(service.getConfig('theme')).toBe('dark');
      expect(service.getConfig('lang')).toBe('ru');
    });
  });

  describe('observable property spies', () => {
    let service: Spy<DemoService>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideAutoSpy(DemoService, { observablePropsToSpyOn: ['value$'] })],
      });
      service = injectSpy(DemoService);
    });

    it('emits through nextWith', async () => {
      service.value$.nextWith(42);

      expect(await firstValueFrom(service.value$)).toBe(42);
    });

    it('errors the stream with throwWith', async () => {
      service.value$.throwWith(new Error('connection lost'));

      await expect(firstValueFrom(service.value$)).rejects.toThrow('connection lost');
    });
  });

  describe('config and readonly property mocking', () => {
    it('limits spies to methodsToSpyOn', () => {
      const spy = createSpyFromClass(DemoService, { methodsToSpyOn: ['save'] });

      spy.save.mockReturnValue(true);

      expect(spy.save('x')).toBe(true);
    });

    it('overrides a readonly property with a static value via mockReadonlyProp', () => {
      const spy = createSpyFromClass(DemoService);
      mockReadonlyProp(spy, 'version', 2);

      expect(spy.version).toBe(2);
    });

    it('supports dynamic getters with mockReadonlyPropGetter', () => {
      const spy = createSpyFromClass(DemoService);
      let flag = true;
      mockReadonlyPropGetter(spy, 'label', () => (flag ? 'A' : 'B'));

      expect(spy.label).toBe('A');

      flag = false;

      expect(spy.label).toBe('B');
    });

    it('replaces a prop with spied accessors', () => {
      const spy = createSpyFromClass(DemoService);
      mockAccessorsProp(spy, 'label');

      spy.label = 'whatever';

      expect(spy.label).toBeUndefined();
    });
  });
});
