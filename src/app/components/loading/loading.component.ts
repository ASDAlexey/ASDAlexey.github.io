import { Attribute, ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from '@angular/core';

import { SimpleChangesTyped } from '../../types/simple-changes-typed.type';

/**
 * Представляет компонент загрузки, который отображает предварительный загрузчик.
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoadingComponent implements OnChanges {
  /**
   * Указывает, видим ли в прелоадер или нет
   *
   * @type {boolean}
   */
  @Input()
  @HostBinding('class.visible')
  isVisible = false;

  /**
   * Проверяет являться ли указанный объект анимацией.
   *
   * @param {Object} object - Объект для проверки.
   * @returns {boolean} - Возвращает истину, если объект является анимацией, иначе ложь.
   */
  @HostBinding('class.animation')
  isAnimation = this.type !== 'image';

  /**
   * Получает значение ссылки от соответствующего метода.
   * @returns {string} Значение ссылки, полученное от метода.
   */
  link = this.getLink();

  /**
   * Создает новый экземпляр конструктора.
   *
   * @param {string} type - Тип объекта. Это может быть 'animation' или 'image'.
   * @return {void}
   */
  constructor(@Attribute('type') public type: 'animation' | 'image' = 'animation') {}

  /**
   * Реагирует на изменения во входных свойствах компонента.
   *
   * @param {SimpleChangesTyped<this>} changes - Изменения во входных свойствах компонента.
   * @return {void} - Возвращает ничего.
   */
  ngOnChanges(changes: SimpleChangesTyped<this>): void {
    if (changes.isVisible?.currentValue && this.type === 'image') {
      this.link = this.getLink();
    }
  }

  /**
   * Возвращает ссылку на изображение предзагрузчика с параметром cache buster.
   *
   * @returns {string} Ссылка на изображение предзагрузки с параметром -ant, преодолевающим кеширование.
   */
  private getLink(): string {
    return `/assets/images/preloader.svg?cacheBuster=${new Date().getTime()}`;
  }
}
