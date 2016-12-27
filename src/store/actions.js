
import * as types from './mutation-types'

export default {
  setStatus({commit},status){
    commit(types.SET_STATUS,status)
  }
}
