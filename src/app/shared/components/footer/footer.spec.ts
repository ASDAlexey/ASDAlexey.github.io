import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
  });

  it('renders the brand name and handle', () => {
    const brand = fixture.nativeElement.querySelector('.footer__brand').textContent;

    expect(brand).toContain('Alexey Popov');
    expect(brand).toContain('ASDAlexey');
  });

  it('renders all social links, with the résumé as a download', () => {
    const links = fixture.nativeElement.querySelectorAll('.footer__links a');

    expect(links.length).toBe(4);
    expect(links[0].textContent).toContain('GitHub');

    expect(links[3].hasAttribute('download')).toBe(true);
    expect(links[0].hasAttribute('download')).toBe(false);
  });
});
