export type TokenType = 'admin'|'member'
export type TokenStorageKey = 'admin_token'|'member_token'
export type TokenDataInterface = {
  id: string
  email: string
  name: string
}

export interface TokenPayloadInterface {
  id: string,
  type: string,
  exp: number,
  expired_at: string,
  data: TokenDataInterface,
}

export interface HasRoleInterface {
  (requiredRoles: string[]) : boolean
}