export type OauthProvider = 'google'|'facebook'|'line'
export type OauthInterface = {
  google: string|null
  facebook: string|null
  line: string|null
}

export type RecaptchaSettings = {
  status: boolean
  client: string|null
}

declare interface ApplicationInterface {
  fileBaseUrl: string
  webHost: string
  recaptcha: RecaptchaSettings,
  oauthClient: OauthInterface,
}

export type {
  ApplicationInterface
}