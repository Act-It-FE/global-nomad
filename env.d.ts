interface ImportMetaEnv {
  readonly NEXT_PUBLIC_API_BASE_URL: string;
  readonly NEXT_PUBLIC_OAUTH_APP_KEY: string;
  readonly NEXT_PUBLIC_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
