import * as api from "../api";

const actions = {
  ADD_BOARD(_, {title}) {
    return api.board.create(title).then(data => data.item)
  },
  FETCH_BOARDS({commit}) {
    return api.board.fetch().then(data => {
      commit('SET_BOARDS', data.list)
    })
  },
  LOGIN({commit}, {email, password}) {
    console.info('email --- ', email, password)
    return api.auth.login(email, password).then(({accessToken}) => {
      commit('LOGIN', accessToken)
    })
  },
  FETCH_BOARD({commit}, {id}) {
    return api.board.fetch(id).then(data => {
      commit('SET_BOARD', data.item)
    })
  },
  ADD_CARD({dispatch, state}, {title, listId, pos}) {
    return api.card.create(title, listId, pos).then(() => {
      dispatch('FETCH_BOARD', {id: state.board.id})
    })
  },
  FETCH_CARD({commit}, {id}) {
    return api.card.fetch(id).then((data) => {
      commit('SET_CARD', data.item)
    })
  },
  UPDATE_CARD({dispatch, state}, {id, title, description, pos, listId}) {
    return api.card.update(id, {title, description, pos, listId}).then(() => {
      dispatch('FETCH_BOARD', {id: state.board.id})
    })
  },
  DELETE_CARD({dispatch, state}, {id}) {
    return api.card.delete(id).then(() => {
      dispatch('FETCH_BOARD', {id: state.board.id})
      })
  },
  DELETE_BOARD(_, {id}) {
    return api.board.delete(id)
  },
  UPDATE_BOARD({dispatch, state}, {id, title, bgColor}) {
    return api.board.update(id, {title, bgColor}).then(() => {
      dispatch('FETCH_BOARD', {id: state.board.id})
    })
  },
  ADD_LIST({dispatch, state}, {title, boardId, pos}) {
    return api.list.create(title, boardId, pos).then(() => {
      dispatch('FETCH_BOARD', {id: state.board.id})
    })
  },
  UPDATE_LIST({dispatch, state}, {id, pos, title}) {
    console.info(id, title)
    return api.list.update(id, {pos, title}).then(() => {
      dispatch('FETCH_BOARD', {id: state.board.id})
    })
  },
  DELETE_LIST({dispatch, state}, {id}) {
    return api.list.delete(id).then(() => {
      dispatch('FETCH_BOARD', {id: state.board.id})
    })
  },
  FETCH_UNSPLASH_PHOTOS({commit}) {
    return api.unsplash.fetch().then((result) => {
      commit('SET_UNSPLASH_PHOTOS', result)
    })
  }
}

export default actions
