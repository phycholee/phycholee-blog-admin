/**
 * Created by Lee on 2016/12/22.
 */
import article from './article'
import image from './image'
import tag from './tag'
import { getUrl } from './url'

let request = {
  article: article,
  image: image,
  tag: tag
}

export { request, getUrl }
