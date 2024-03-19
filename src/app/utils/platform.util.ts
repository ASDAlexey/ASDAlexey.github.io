/**
 * Извлекает текущую платформу пользователя.
 *
 * @returns {string} Платформа пользователя. Возможные значения - 'mac', 'win', 'linux'.
 */
export const getPlatform = (): string => {
  const platform = navigator.platform;

  if (platform.includes('Mac')) {
    return 'mac';
  }

  if (platform.includes('Win')) {
    return 'win';
  }

  if (platform.includes('Linux')) {
    return 'linux';
  }

  return '';
};
