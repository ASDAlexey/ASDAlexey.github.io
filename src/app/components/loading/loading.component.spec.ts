import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isVisible should default to false', () => {
    expect(component.isVisible).toBe(false);
  });

  it('isAnimation should be true when type is not image', () => {
    expect(component.isAnimation).toBe(true);
  });

  it('link should be generated on creation', () => {
    expect(component.link).toContain('/assets/images/preloader.svg?cacheBuster');
  });

  it('should set link again when type is image and isVisible is changed', () => {
    component.type = 'image';
    const oldLink = component.link;
    component.ngOnChanges({ isVisible: { currentValue: true, firstChange: true, previousValue: false } as any });
    expect(component.link).not.toBe(oldLink);
  });
});
