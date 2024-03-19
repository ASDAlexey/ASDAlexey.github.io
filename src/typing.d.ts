declare let $ENV: Env;

interface Env {
  ENVIRONMENT: string;
  SIGNALING_URL: string;
  API_URL: string;
  AUTH_TYPE: 'application' | 'keycloak';
}
