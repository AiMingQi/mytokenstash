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
    lookupAddresses: [],
    nftCollection: []
  },
  getters: {
    getAddressByNickname: (state) => (nickname) => {
      return state.lookupAddresses.find(address => address.nickname === nickname)
    }
  },
  mutations: {
    updateNetwork (state, network) {
      state.network = network
    },
    updateLookupAddresses (state, lookupAddress) {
      state.lookupAddresses.push(lookupAddress)
    },
    addNft (state, nft) {
      state.nftCollection.push(nft)
    },
    clearNftCollection (state) {
      state.nftCollection = []
    },
    clearAddresses (state) {
      state.lookupAddresses = []
    }
  },
  actions: {
  },
  modules: {
  }
})
