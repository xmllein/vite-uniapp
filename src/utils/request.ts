import { zalert, toast } from '@/utils/utils'
type RequestOptionsMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

interface baseConfig {
  url: string
  method: RequestOptionsMethod
  header?: any
  data?: Record<string, any>
  params?: Record<string, any>
  showLoading?: boolean
}

export interface CustomSuccessData<T = any> {
  code: number
  msg?: string
  message?: string
  data?: T
  [keys: string]: any
}

// 验证登录情况
function ajaxFilter(data) {
  let status = true
  if (data.code == 401) {
    status = false
    // cosn
    zalert('登录状态失效', () => {
      uni.removeStorageSync('token')
      uni.reLaunch({
        url: '/pages/login/index',
      })
    })
  }
  return status
}
/**
 * 发送请求
 */
const baseRequest = <T>(config: baseConfig) => {
  if (!config.showLoading) {
    uni.showLoading({
      title: '加载中...',
      mask: true,
    })
  }
  if (config.method === 'GET' && config.params) {
    let url = config.url + '?'
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName]
      const part = encodeURIComponent(propName) + '='
      if (value !== null && typeof value !== 'undefined') {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            const params = propName + '[' + key + ']'
            const subPart = encodeURIComponent(params) + '='
            url += subPart + encodeURIComponent(value[key]) + '&'
          }
        } else {
          url += part + encodeURIComponent(value) + '&'
        }
      }
    }
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }
  const Url = import.meta.env.VITE_API_URL as string
  console.log(Url)
  const token = uni.getStorageSync('token')
  if (config.header) {
    config.header.Authorization = 'Bearer ' + token
  } else {
    config.header = {
      Authorization: 'Bearer ' + token,
    }
  }

  return new Promise<CustomSuccessData<T>>((reslove, reject) => {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
    uni.request({
      url: Url + config.url,
      method: config.method || 'GET',
      header: config.header,
      data: config.data || {},
      success: (res: any) => {
        console.log('res', res)
        if (!config.showLoading) {
          uni.hideLoading()
        }
        if (ajaxFilter(res.data) && res.statusCode == 200) {
          reslove(res.data)
        } else if (res.data.code != 401) {
          toast(res.data.msg)
          reject(res)
        }
      },
      fail: (res: any) => {
        if (!config.showLoading) {
          uni.hideLoading()
        }
        if (res.msg && res.msg.indexOf('timeout') !== -1) {
          zalert('请求超时，请稍后再试')
        } else if (res.msg && res.msg.indexOf('request') !== -1) {
          zalert('服务器已关闭')
        } else {
          zalert('请求失败，请检查网络')
        }
        reject('请求失败')
      },
    })
  })
}

export default baseRequest
