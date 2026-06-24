import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Icon } from './icon';
import { SocialIcon } from '@core/models/portfolio.interface';

function render(name: SocialIcon, size?: number): ComponentFixture<Icon> {
  const fixture = TestBed.createComponent(Icon);
  fixture.componentRef.setInput('name', name);

  if (size !== undefined) {
    fixture.componentRef.setInput('size', size);
  }

  fixture.detectChanges();

  return fixture;
}

describe('Icon', () => {
  it('renders the github icon with the default size', () => {
    const svg = render('github').nativeElement.querySelector('svg');

    expect(svg).toBeTruthy();
    expect(svg.getAttribute('width')).toBe('20');
  });

  it('renders the linkedin icon', () => {
    expect(render('linkedin').nativeElement.querySelector('svg')).toBeTruthy();
  });

  it('renders the email icon with a custom size', () => {
    const svg = render('email', 30).nativeElement.querySelector('svg');

    expect(svg).toBeTruthy();
    expect(svg.getAttribute('width')).toBe('30');
  });
});
