/**
 * Created by Lee on 2016/12/22.
 */

const root = 'http://localhost:8080/'

const urlMap = {
  articles: root+'admin/articles',
  article:  root+'admin/article',
  jumbotronImage: root+'admin/upload/jumbotronImage',
  postImage:  root+'admin/upload/postImage',
  deleteImage: root+'admin/upload/deleteImage',
  tags: root+'admin/tags',
  tag: root+'admin/tag',
  auth: root+'authorization/',
  admin: root+'admin/'
}

const getUrl = name => {
  let url = urlMap[name]

  return url
}

export { getUrl }
