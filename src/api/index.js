import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
  router.push('/login')
}
const request = (method, url, data) => {
  return axios({
    method, url: DOMAIN + url, data
  }).then((result) => {
    return result.data
  }).catch(err => {
    const {status} = err.response
    if (status === UNAUTHORIZED) return onUnauthorized()
    throw Error(err)
  })
}

export const board = {
  fetch() {
    return request('get', '/boards')
  }
}

