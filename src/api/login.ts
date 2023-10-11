import request from '@/utils/requestMethod'
import type { ILogin, ILoginParams } from '@/types/user'

export const signIn = (form: ILoginParams) => request.post<ILogin>('/api/user/login', form)

export const signOut = () => request.post('/api/user/logout')

// 获取用户列表
export const getUserList = () => request.get('/api/user/list')
