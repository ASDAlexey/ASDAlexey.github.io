import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero } from './hero';

describe('Hero', () => {
  let fixture: ComponentFixture<Hero>;
  let el: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('renders the name and role', () => {
    expect(el.querySelector('.hero__title')?.textContent).toContain('Alexey Popov');
    expect(el.querySelector('.hero__role')?.textContent).toContain('Senior Frontend Developer');
  });

  it('renders all platform pills', () => {
    expect(el.querySelectorAll('.platforms li').length).toBe(4);
  });

  it('renders the four stat cards', () => {
    expect(el.querySelectorAll('app-stat-card').length).toBe(4);
  });

  it('renders GitHub, LinkedIn, Telegram and Résumé actions', () => {
    const actions = [...el.querySelectorAll('.hero__actions a')];

    expect(actions.length).toBe(4);
    expect(actions[3].getAttribute('href')).toContain('Alexey-Popov-Resume.pdf');
  });
});
