import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  it('renders the brand name', () => {
    expect(fixture.nativeElement.querySelector('.footer__brand').textContent).toContain('Alexey Popov');
  });

  it('renders all social links', () => {
    const links = fixture.nativeElement.querySelectorAll('.footer__links a');

    expect(links.length).toBe(3);
    expect(links[0].textContent).toContain('GitHub');
  });
});
