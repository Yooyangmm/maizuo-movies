// 对于数据请求的封装
import axios from 'axios'
import { Toast } from 'vant'

const http = axios.create({
  baseURL: 'https://m.maizuo.com/',
  timeout: 10000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16596508932340220305408001","bc":"310100"}'
  }
})
// 在发请求之前拦截 --- showLoading
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 在成功后拦截 --- hideLoading
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  Toast.clear()
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  Toast.clear()
  return Promise.reject(error)
})

export default http
