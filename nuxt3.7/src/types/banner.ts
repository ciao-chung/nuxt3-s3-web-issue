import {type PhotoObject} from '@/types/base'
import { VideoSource } from '@/components/videoPlayer/types/videoPlayer.type'

type BannerTextPosition = 'top' | 'center' | 'bottom'

export type BannerItemPhotoInstance = {
  blank: boolean
  title: string|null
  brief: string|null
  link: string|null
  text_position: BannerTextPosition
  photo: PhotoObject|null
  photo_mobile: PhotoObject|null
}

export type BannerItemPhotoType = {
  instance_type: 'photo'
  instance: BannerItemPhotoInstance
}

export type BannerItemVideoType = {
  instance_type: 'video'
  instance: VideoSource
}

export type BannerItemType = BannerItemPhotoType|BannerItemVideoType

export interface BannerInterface {
  name: any
  interval: number
  autoplay: boolean
  fullscreen: boolean
  items: BannerItemType[]
}