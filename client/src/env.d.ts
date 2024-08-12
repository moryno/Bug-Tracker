// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BASE_URL: string;
    REACT_APP_API_VERSION: string;
    REACT_APP_ENV: string;
    NODE_ENV: string;
    REACT_APP_API_VERSION: string;
  }
}
