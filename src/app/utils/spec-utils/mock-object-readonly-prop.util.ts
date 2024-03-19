/**
 * Устанавливает свойство "только для чтения" в объекте с заданным значением.
 *
 * @template T - Тип объекта.
 * @template K - Ключ свойства в объекте.
 * @param {T} object - Объект, в котором устанавливается свойство.
 * @param {K} property - Ключ свойства для установки.
 * @param {unknown} value - Значение для установки свойства.
 * @returns {void}
 */
export const mockObjectReadonlyProp = <T, K extends keyof T>(object: T, property: K, value: unknown): void => {
  Object.defineProperty(object, property, { get: () => value });
};

/**
 * Устанавливает макеты геттера и сеттера для заданного свойства объекта.
 *
 * @template T - Тип объекта.
 * @template K - Тип свойства.
 * @param {T} object - Объект, в котором устанавливаются макеты геттера и сеттера.
 * @param {K} property - Свойство, для которого устанавливаются макеты геттера и сеттера.
 * @returns {void}
 */
export const mockAccessorsObjectReadonlyProp = <T, K extends keyof T>(object: T, property: K): void => {
  Object.defineProperty(object, property, {
    get: jest.fn(),
    set: jest.fn(),
    configurable: true,
  });
};
