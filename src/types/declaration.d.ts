declare module "*.svg" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_LINK_EXCEL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}