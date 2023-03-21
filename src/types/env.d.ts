export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      JWTSECRETWORD: string
      SECRET_KEY: string
      MYSQL_DATABASE: string
      MYSQL_HOST: string
      MYSQL_PASSWORD: string
      MYSQL_USER: string
      MYSQL_PORT: string
    }
  }
}