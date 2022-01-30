<template>
  <v-container fluid>
    <v-row class="text-center">
    
      <v-col cols="12" lg="5" sm="12" class="mb-2">
        <v-card class="d-flex">
          <v-row justify="center">
            <v-col cols="12" sm="3">
            <div>
              <v-img class="ma-5" src="../assets/MyTokenStash-Logo.svg" max-width="420px" color="black" alt="logo"/>
            </div>
            </v-col>
            <v-col cols="12" sm="9">
                <h1 class="display-2 font-weight-bold mb-3">
                  Welcome to </h1>
                  <h1 class="display-2 font-weight-bold mb-3">MyTokenStash</h1>
                  <h4 class="display-1 font-weight-bold mb-3">Solana Edition</h4>
                <p class="mt-4 subheading font-weight-regular">
                  A place to enjoy NFT Token Stashes
                </p>
            </v-col>
          </v-row>
          <br>
          </v-card>
          <lookup-form></lookup-form>
      </v-col>

        <v-col cols="12" lg="7" sm="12">
      <v-row>
      <v-col cols="12" lg="4" md="4" sm="12" v-for="feature in features" :key="feature.priority">
      <v-card :dark="feature.cardTheme">
        <v-card-title><h3>{{feature.hype}}</h3> </v-card-title>
        <v-card-subtitle><h4>{{feature.type}}</h4></v-card-subtitle>
        <v-card-text>
          <a :href="feature.linkUrl" target="_blank">
            <v-img :src="feature.imageUrl" aspect-ratio="1"/>
          </a>
        </v-card-text>
      </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="4" sm="12">
      <v-card >
        <v-card-title><h3>Security</h3> </v-card-title>
        <v-card-subtitle><h4> Must Have Useful Product</h4></v-card-subtitle>
        <v-card-text>
          <a href="https://www.amazon.com/Ledger-Nano-Cryptocurrency-Hardware-Ethereum/dp/B07FY5R77T?crid=ZUY71KI8Z7OO&keywords=ledger&qid=1643070472&sprefix=ledger%2Caps%2C105&sr=8-4&th=1&linkCode=li3&tag=unitegrity-20&linkId=f9dd23b2e341703fa65b6e211a6ce5bc&language=en_US&ref_=as_li_ss_il" target="_blank">
          <img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07FY5R77T&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=unitegrity-20&language=en_US" ></a>
          <img src="https://ir-na.amazon-adsystem.com/e/ir?t=unitegrity-20&language=en_US&l=li3&o=1&a=B07FY5R77T" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
        </v-card-text>
      </v-card>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12">
      <v-card >
        <v-card-title><h3>Security Combo</h3> </v-card-title>
        <v-card-subtitle><h4> Must Have Useful Package</h4></v-card-subtitle>
        <v-card-text>
          <a href="https://www.amazon.com/Billfodl-Hardware-Compatible-Wallets-Ethereum/dp/B08QH6Z4SV?crid=ZUY71KI8Z7OO&keywords=ledger&qid=1643071333&sprefix=ledger%2Caps%2C105&sr=8-1-spons&psc=1&smid=A22SCTTPKFDO1S&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyMFRYSEFJUlZSMzlUJmVuY3J5cHRlZElkPUEwODIxODc1MVlBR0lGWVVTUEtRTiZlbmNyeXB0ZWRBZElkPUEwNDAwOTc2MzExUUdWODJCV0ZKUyZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU%3D&linkCode=li3&tag=unitegrity-20&linkId=722b905e0ba4d247f79f14ebfcc00d08&language=en_US&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08QH6Z4SV&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=unitegrity-20&language=en_US" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=unitegrity-20&language=en_US&l=li3&o=1&a=B08QH6Z4SV" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
        </v-card-text>
      </v-card>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12">
      <v-card >
        <v-card-title><h3>Square</h3> </v-card-title>
        <v-card-subtitle><h4> NFT Display</h4></v-card-subtitle>
        <v-card-text>
          <a href="https://www.amazon.com/Pix-Star-Digital-Picture-resolution-display/dp/B07P2JCMWH?crid=13VQFN7977FLW&keywords=nfl%2Bdigital%2Bdisplay&qid=1643071491&sprefix=nft%2Bdigital%2Bdisplay%2Caps%2C114&sr=8-4&th=1&linkCode=li3&tag=unitegrity-20&linkId=c550777fe3b069641435950f169647eb&language=en_US&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07P2JCMWH&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=unitegrity-20&language=en_US" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=unitegrity-20&language=en_US&l=li3&o=1&a=B07P2JCMWH" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
        </v-card-text>
      </v-card>
      </v-col>

       </v-row>
       </v-col>

    </v-row>
  </v-container>
</template>

<script>
import LookupForm from '../components/SolanaLookupForm.vue'
  import * as solanaWeb3 from '@solana/web3.js';
  export default {
    name: 'WelcomePage',
    components: {
      LookupForm
    },
    data: () => ({
      ownerAddress: '',
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length == 44 || 'Must be a Valid Solana Address',
        },
      network: '',
      LookupAccount: '',
      features: [
        { 
          hype: "Special",
          cardTheme: true,
          priority: "1",
          type: 'NFT',
          linkUrl: 'https://solsea.io/nft/2qTT2PRutEcG2LFC282KnerS91fsbit2QFETp99UxhCn',
          imageUrl: 'https://www.arweave.net/rUGUiAU19hqoW6Rdt_VvPrMzTrTqW--MzIi9pt0jG_k?ext=PNG',
        },
        { 
          hype: "Mysterious",
          cardTheme: false,
          priority: "2",
          type: 'NFT Game',
          linkUrl: 'https://the-game.fun',
          imageUrl: 'https://gateway.pinata.cloud/ipfs/Qmer8dA6z1ooMiJ86dNCZQJvypkseGKBrpSEuSMSm9FZEz',
        },
        { 
          hype: "Affordable",
          cardTheme: true,
          priority: "5",
          type: 'NFT',
          linkUrl: 'https://solsea.io/nft/4bxMtwcirjnyLeMwJy4REMmrSHPG779R5woCy8qELVT7',
          imageUrl: 'https://www.arweave.net/6-EzR99DYcj5iwweCi9GJZhaIv1ueSNFfCl_LJUrIPM?ext=PNG',
        },
        { 
          hype: "High Art",
          cardTheme: true,
          priority: "3",
          type: 'NFT Collection',
          linkUrl: 'https://solsea.io/collection/616eee186c530ec596bb1027',
          imageUrl: 'https://gateway.pinata.cloud/ipfs/QmcXQ5TbQS2acHoGZkAUNVxN5nshXuSzcVQghdwyjAp2RU',
        },
        { 
          hype: "Game Changer",
          cardTheme: false,
          priority: "4",
          type: 'NFT',
          linkUrl: 'https://solsea.io/nft/8gXneZeFoKbKrSsbZCdD4SW6upn7e6EHoJTiM6cF3jd8',
          imageUrl: 'https://www.arweave.net/b9rL4huLrx5KrBtooLPkIG5TAzrH1YA7WY9N92oO-Ps?ext=PNG',
        },
        { 
          hype: "Life Changing",
          cardTheme: false,
          priority: "6",
          type: 'NFT Event',
          linkUrl: 'https://ethdenver.com',
          imageUrl: 'https://gateway.pinata.cloud/ipfs/QmeVrGCJT11y4zJHZddAbKN2cfejs5a5wzubihtt81f2p3?preview=1',
        },
      ]
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
      setOwnerAddress () {
        if (this.LookupAccount.length == 44) {
        this.$store.commit('updateOwnerAddress', this.LookupAccount)
        } else {
          console.log('not the right size')
        }
      },
      setNetwork () {
        this.$store.commit('updateNetwork', this.network)
      }
    }
  }
</script>
