/**
 * Created by Lee on 2016/12/22.
 */
import article from './article'
import image from './image'
import tag from './tag'
import auth from './auth'
import admin from './admin'
import { getUrl } from './url'

let request = {
  article: article,
  image: image,
  tag: tag,
  auth: auth,
  admin: admin
}

export { request, getUrl }
