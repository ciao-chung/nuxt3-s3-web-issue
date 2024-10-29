import type {ApiRequestInterface} from 'core/libs/api/apiRequest'
import applicationJson from './application.json'
import { appLodash } from 'core/core'
import qs from 'qs'

declare module 'core/libs/api/apiRequest' {
  interface ApiCollection {
    baseApi: { [key: string]: ((...args: any) => Promise<any>) }
    fileApi: { [key: string]: ((...args: any) => Promise<any>) }
  }
}

export default (apiRequest: ApiRequestInterface) => {
  apiRequest.collection.baseApi = {
    application: async () => {
      if (import.meta.env.VITE_STATIC_APPLICATION_API == 'true') {
        return new Promise(resolve => resolve(applicationJson))
      }

      return await apiRequest.request({
        url: '/api/application',
        method: 'GET',
      })
    },
    setOtpMail: async (feature: string, email: string) => {
      return await apiRequest.request({
        url: `/api/send-otp-mail/${feature}`,
        method: 'POST',
        params: {
          email,
        },
      })
    },
  }

  apiRequest.collection.fileApi = {
    download: (params: any) => apiRequest.request({
      url: `/api/file/download`,
      method: 'POST',
      responseType: 'blob',
      params,
    }),
    upload: (formData: FormData, onProgress = null, params: {[key:string]: any}) => {
      const uploadParams = {
        ...params,
      }
      const query = appLodash.isEmpty(uploadParams)
        ? ''
        : `?${qs.stringify(uploadParams, { arrayFormat: 'indices' })}`

      return apiRequest.request({
        url: `/api/file/upload${query}`,
        method: 'POST',
        fileFormData: formData,
        multipart: true,
        onUploadProgress: onProgress,
      })
    },
    createViaData: (params = {}) => apiRequest.request({
      url: `/api/file/create-via-data`,
      method: 'POST',
      params,
    }),
  }
}