import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt'

const secretWord = (process.env.JWTSECRETWORD !== undefined) ? process.env.JWTSECRETWORD : 'secret'

const opts: StrategyOptions = {
  secretOrKey: secretWord,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

export default new Strategy(opts, (payload: any, done: VerifiedCallback) => {
  const user = payload
  if (user !== undefined) return done(null, user)
  return done(null, false)
}
)