export interface Environment {
  production: boolean;
  environment: 'development' | 'production';
  API_URL: string;
  CURRENCY_FREAKS_API_KEY: string;
}
