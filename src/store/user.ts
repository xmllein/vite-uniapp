import { defineStore } from 'pinia'
import type { UserInfosStates, ILogin } from '@/types/user'

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
  state: (): UserInfosStates => ({
    userInfos: uni.getStorageSync('userInfo') || {
      userName: '',
      photo: '',
      time: '',
      token: '',
      roles: [],
      authBtnList: [],
    },
    token: uni.getStorageSync('token'),
  }),
  actions: {
    async setUserInfos(userInfos: ILogin) {
      // 存储用户信息到浏览器缓存
      uni.setStorageSync('userInfo', userInfos)
      this.userInfos = userInfos
      console.log(this.userInfos)
    },
    async setToken(token: string) {
      // 存储用户信息到浏览器缓存
      uni.setStorageSync('token', 'token')
      this.token = token
    },
    async reset() {
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('token')
      this.userInfos = {
        userName: '',
        photo: '',
        token: '',
        time: '',
        roles: [],
        authBtnList: [],
      }
      this.token = ''
    },
  },
})
