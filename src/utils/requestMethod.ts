import service from './request'
import type { CustomSuccessData } from './request'
interface IAxiosGet {
  <T = any>(url: string, params?: Record<string, any>): Promise<CustomSuccessData<T>>
}
interface IAxiosPostOrPutOrDelete {
  <T = any>(url: string, data?: Record<string, any>): Promise<CustomSuccessData<T>>
}
// get
const get: IAxiosGet = (url, params) => {
  return service({ url: url, method: 'GET', params: params })
}

//post
const post: IAxiosPostOrPutOrDelete = (url, data) => {
  return service({ url: url, method: 'POST', data: data })
}

// put
const put: IAxiosPostOrPutOrDelete = (url, data) => {
  return service({ url: url, method: 'PUT', data: data })
}
// delete
const deleteRequest: IAxiosPostOrPutOrDelete = (url, data) => {
  return service({ url: url, method: 'DELETE', data: data })
}
export default {
  get,
  post,
  put,
  delete: deleteRequest,
}
