export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      JWTSECRETWORD: string
      SECRET_KEY: string 
    }
  }
}