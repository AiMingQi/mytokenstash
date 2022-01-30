<template>
  <v-app>
      <v-navigation-drawer
        app
        v-model="drawer"
      >
      <v-btn class="my-3" color="black" dark to="/" block><v-icon></v-icon>Home</v-btn>
      <v-btn class="my-3" color="black" dark to="/nft-list" block><v-icon></v-icon>NFT List</v-btn>
      <v-btn class="my-3" color="black" dark to="/nft-carousel" block><v-icon></v-icon>NFT Carousel</v-btn>
      <v-btn class="my-3" color="#c00000" dark @click="clearOwnerAddress" block>Clear Accounts</v-btn>
        <v-list
          dense
          rounded
        >
          <v-list-item
            v-for="account in this.$store.state.lookupAddresses"
            :key="account.address"
          >
            <v-list-item-content>
              <v-list-item-title><v-chip>{{ account.nickname }}</v-chip></v-list-item-title>
              <v-list-item-subtitle>{{ account.address }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card class="align-end">
          <v-card-text>
          <h3 class="mx-auto my-2">
          Donate Solana or NFTs
          </h3>
          <h5>86BGByDdDZfC9ZZAp1zkU3nQECKSw9H5R7wmw56FtzeZ</h5>
          <h3 class="mx-auto my-2">
          to the Developer
          </h3>
          </v-card-text>
        </v-card>
      </v-navigation-drawer>
    <v-app-bar
    app
    color="#c00000"
    dark
    hide-on-scroll
    dense
    >
      <div class="d-flex align-center" >
       <v-btn @click="drawer = !drawer" icon plain>
        <v-img
          alt="the-game logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo.png')"
          transition="scale-transition"
          width="40"
          
        />
        </v-btn>
      </div>
      
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer dark>
      <p>© 2022 MyTokenStash </p>
      <v-spacer></v-spacer>
      
      <v-spacer></v-spacer>
      <p>{{this.$store.state.network}} ~ version: <strong>0.10.0</strong></p>
      <v-spacer></v-spacer>
      <v-btn to="/privacy-policy">Privacy Policy</v-btn>
      <v-spacer></v-spacer>
      <v-btn
      color="#c00000"
        href="https://www.coinbase.com/join/crumb_8"
        target="_blank"
        text
      >
        <span class="mr-2">Get Solana</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>

  import * as solanaWeb3 from '@solana/web3.js';
  export default {
    data: () => ({
      drawer: null,
      ownerAddress: '',
       items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },
        ],
    }),
    mounted () {
      console.log(solanaWeb3);
      console.log(this.$store.state.ownerAddress);
    },
    methods: {
      async getOwnerAddress(){
        try {
          const resp = await window.solana.connect();
          this.$store.state.ownerAddress = resp.publicKey.toString()
          console.log(resp.publicKey.toString())
          // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
        } catch (err) {
          // { code: 4001, message: 'User rejected the request.' }
        }
        // true
      },
      clearOwnerAddress () {
        this.$store.commit('clearAddresses')
        console.log(this.$store.state.lookupAddresses)
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
.v-application a {
  color: #ffffff;
    font-weight: bold;
}

#nav {
  padding: 30px;

    a {
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}
</style>
