export interface ILogin {
  userName: string
  photo: string
  time: string
  roles: Array<string>
  authBtnList: Array<string>
  token: string
}

export interface ILoginParams {
  page: number
  pageSize: number
  [keys: string]: any
}

export interface UserInfosStates {
  userInfos: ILogin
  token: string
}
