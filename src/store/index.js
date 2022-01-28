import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ownerAddress: '',
    network: 'mainnet-beta',
    networkChoices: [
      'devnet',
      'testnet',
      'mainnet-beta',
    ],
  },
  mutations: {
    updateNetwork (state, network) {
      state.network = network
    },
    updateOwnerAddress (state, ownerAddress) {
      state.ownerAddress = ownerAddress
    }
  },
  actions: {
  },
  modules: {
  }
})
