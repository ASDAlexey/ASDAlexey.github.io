import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnChanges, Renderer2, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { SimpleChangesTyped } from '../../types/simple-changes-typed.type';
import type { IconType } from './generated-svg/svg-icons';
import { SvgIconService } from './svg-icon.service';

/**
 * Класс SvgIconComponent представляет компонент иконки SVG.
 * Данный компонент позволяет отображать иконки SVG с настраиваемыми свойствами, такими как цвет и вращение.
 * Он использует SvgIconService для получения иконок SVG и применения их к элементу-хосту компонента.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg-icon',
  template: '',
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent implements OnChanges {
  /**
   * Представляет тип иконки.
   *
   * @typedef {string} IconType
   *
   * @description
   * Тип `IconType` - это строка, описывающая категорию или стиль иконки. Она используется
   * для идентификации различных типов иконок и применения соответствующего стиля или поведения.
   *
   * @example
   * ```
   * // Валидные значения типа иконки
   * const type1 = 'outline';
   * const type2 = 'solid';
   * const type3 = 'filled';
   * ```
   */
  @Input({ required: true }) name?: IconType;
  /**
   * Переменная color представляет цвет объекта или элемента.
   *
   * @type {string}
   */
  @Input() color = '';
  /**
   * Количество вращения в градусах.
   *
   * @type {number}
   */
  @Input() rotateDeg = 0;
  /**
   * Представляет коллекцию названий CSS-классов.
   * @class
   */
  @HostBinding('class') classes = 'svg-icon';
  /**
   * Представляет последнее значение ключа.
   *
   * @type {string}
   */
  private lastKey = '';
  /**
   * Представляет сырой нативный элемент текущего компонента.
   *
   * @type {ElementRef}
   * @readonly
   */
  private readonly element = this.host.nativeElement;
  /**
   * Создает новый экземпляр конструктора.
   *
   * @param {ElementRef} host - Объект ElementRef, представляющий хост-элемент.
   * @param {SvgIconService} registry - Объект SvgIconService используется для регистрации иконок SVG.
   * @param {DomSanitizer} sanitizer - Объект DomSanitizer используется для санитарной обработки HTML-контента.
   * @param {Renderer2} renderer - Объект Renderer2 используется для манипуляции с DOM-элементами.
   */
  constructor(
    private host: ElementRef,
    private registry: SvgIconService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
  ) {}

  /**
   * Выполнить необходимые действия, когда входные свойства изменились.
   *
   * @param {SimpleChangesTyped<this>} changes - Массив изменений.
   *
   * @return {void}
   */
  ngOnChanges(changes: SimpleChangesTyped<this>): void {
    if (changes?.name && this.name) {
      this.setIcon(this.name);
    }
    changes?.color && this.setInputColor(changes?.color.currentValue);
  }

  /**
   * Устанавливает входной цвет для элемента.
   *
   * @param {string} color - Цвет, который нужно установить для элемента.
   * @return {void}
   */
  private setInputColor(color?: string): void {
    color && (this.element.style.fill = this.color);
  }

  /**
   * Устанавливает иконку для компонента.
   *
   * @param {IconType} name - Название иконки.
   * @returns {void}
   */
  private setIcon(name: IconType): void {
    const icon = this.registry.getIcon(name);
    if (!icon) {
      console.error('Иконка не найдена ' + name);
      return;
    }
    this.renderer.removeClass(this.element, SvgIconComponent.getIconClassName(this.lastKey));
    this.lastKey = name;
    this.renderer.addClass(this.element, SvgIconComponent.getIconClassName(name));
    if (this.rotateDeg) {
      this.renderer.setStyle(this.element, 'transform', `rotate(${this.rotateDeg}deg)`);
    }
    this.name && this.renderer.setAttribute(this.element, 'data-svg-icon', this.name);
    const sanitizedHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(icon));
    this.renderer.setProperty(this.element, 'innerHTML', sanitizedHtml);
  }

  /**
   * Возвращает имя класса для SVG иконки на основе указанного имени.
   *
   * @param {string} name - Имя SVG иконки.
   *
   * @return {string} Имя класса для SVG иконки.
   */
  private static getIconClassName(name: string): string {
    return `svg-icon-${name}`;
  }
}
