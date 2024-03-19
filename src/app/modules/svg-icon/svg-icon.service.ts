import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import icons, { IconType } from './generated-svg/svg-icons';
import { SvgIcon, SvgIconType } from './svg-icon.interface';
import { SVG_REGISTRY_TOKEN } from './svg-icon.token';

/**
 * Преобразует массив с именем и данными в объект.
 * @param {Array} name - Строка с именем.
 * @param {Array} data - Строка с данными.
 * @returns {Object} - Объект с собственностями имени и данных.
 */
const objConverting = ([name, data]: [string, string]): { name: string; data: string } => ({ name, data });

/**
 * Преобразует объект иконок в массив объектов иконок.
 *
 * @param {Object} obj - Объект, содержащий иконки.
 * @returns {Array} Массив объектов иконок, где каждый объект имеет свойства имени и данных.
 */
const iconsToArray = (obj: { [key: string]: string }): { name: string; data: string }[] => Object.entries(obj).map(objConverting);

/**
 * Служба для управления иконками SVG.
 */
@Injectable({ providedIn: 'root' })
export class SvgIconService {
  /**
   * Класс представляющий карту SVG.
   * @class
   */
  private readonly svgMap = new Map<string, SvgIcon>();
  /**
   * Конструктор для класса.
   *
   * @constructor
   * @param {Document} document - Документ для манипулирования DOM.
   * @param {Record<string, string>} iconsRegistry - Реестр, содержащий иконки SVG.
   * @param {DomSanitizer} sanitizer - Объект-санитайзер для очистки HTML контента.
   * @returns {void}
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(SVG_REGISTRY_TOKEN) private iconsRegistry: Record<string, string>,
    private sanitizer: DomSanitizer,
  ) {
    const inMemoryIcons = this.iconsRegistry ?? icons;
    if (inMemoryIcons) {
      this.register(iconsToArray(inMemoryIcons));
    }
  }

  /**
   * Извлекает содержимое SVG для заданного ключа иконки.
   *
   * @param {IconType} key - Ключ, представляющий иконку для извлечения.
   * @return {string | undefined} - Содержимое SVG иконки или undefined, если иконка не найдена.
   */
  getIcon(key: IconType): string | undefined {
    const icon = key && this.svgMap.get(key);
    if (!icon) {
      return undefined;
    }
    if (!icon.isInitialized) {
      const svg = this.toElement(icon.content);
      icon.content = svg.outerHTML;
      icon.isInitialized = true;
    }
    return icon.content;
  }

  /**
   * Регистрирует одну или несколько иконок SvgIcon.
   *
   * @param {SvgIconType|SvgIconType[]} icons - Иконка SvgIcon для регистрации.
   * @returns {void}
   */
  register(icons: SvgIconType | SvgIconType[]): void {
    for (const { name, data } of Array.isArray(icons) ? icons : [icons]) {
      if (!this.svgMap.has(name)) {
        this.svgMap.set(name, new SvgIcon(data));
      }
    }
  }

  /**
   * Преобразует заданную строку содержимого в SVGElement.
   *
   * @param {string} content - Строка содержимого для преобразования в SVGElement.
   * @returns {SVGElement} - Преобразованный SVGElement.
   */
  private toElement(content: string): SVGElement {
    const div = this.document.createElement('div');
    div.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(content)) ?? '';
    return div.querySelector('svg') as SVGElement;
  }
}
