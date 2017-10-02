import Vue from 'vue'

export const types = {
  CREATE: 'Create',
  DISMISS: 'Dismiss',
  CLEAR: 'Clear',
}

function initialState () {
  return {
    entries: {},
    idList: [],
    counter: 0,
  }
}

export const state = initialState()

export const getters = {
  list: state => state.idList.map(i => state.entries[i]),
}

export const actions = {
  create ({ commit }, alert) {
    return commit(types.CREATE, { alert })
  },

  dismiss ({ commit }, id) {
    commit(types.DISMISS, { id })
  },

  clear ({ commit }) {
    commit(types.CLEAR)
  },
}

export const mutations = {
  [types.CREATE] (state, { alert }) {
    state.counter++
    alert.id = state.counter
    Vue.set(state.entries, alert.id, alert)
    state.idList.push(alert.id)
    return alert.id
  },

  [types.DISMISS] (state, { id }) {
    Vue.delete(state.entries, id)
    state.idList.splice(state.idList.indexOf(id), 1)
  },

  [types.CLEAR] (state) {
    Object.entries(initialState())
      // don't reset counter, maybe there are still old references around
      .filter(([prop, value]) => prop !== 'counter')
      .forEach(([prop, value]) => Vue.set(state, prop, value))
  },
}
