import { v4 as uuidv4 } from 'uuid';

/**
 * Генерирует GUID (Globally Unique Identifier) как строку.
 *
 * @returns {string} Сгенерированный UUIDv4 без дефисов и в верхнем регистре.
 */
export const generateGUID = (): string => {
  return uuidv4().replaceAll('-', '').toUpperCase();
};
