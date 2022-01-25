<template>
    <v-container fluid>
        <v-row dense class="fill-height" align="center" justify="center">
         <v-col cols="12">
          <v-card dark class="mx-auto my-12" max-width="420" v-show="!hasTokens">
            <v-card-title>Loading the Stash...</v-card-title>
            <v-card-text>Either you don't have any NFTs in this account, or they are still loading... Decentralized storage can take a moment, so please be patient if you know there are actually NFTs in this account.</v-card-text>
          </v-card>
            <v-carousel
                :cycle="cycle"
                :interval="slideInterval"
                height="100%"
                hide-delimiter-background
                show-arrows-on-hover
                >
            <template v-slot:prev="{ on, attrs }">
            <v-btn
                color="#c00000"
                v-bind="attrs"
                v-on="on"
            >Previous slide</v-btn>
            </template>
            <template v-slot:next="{ on, attrs }">
            <v-btn
                color="#c00000"
                v-bind="attrs"
                v-on="on"
            >Next slide</v-btn>
            </template>
            <v-carousel-item
            v-for="nft in solanaNftMetadata" :key="nft.index"
            >
                <v-sheet
                    :color="color"
                    class="py-5 mb-10"
                >
                    <v-img
                    lazy-src="src/assets/game-baby.png"
                    :src="nft.res.data.image"
                    :height="imageHeight"
                    aspect-ratio="1"
                    contain
                    class="ma-5"
                    ></v-img>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
        <v-card class="mx-auto mt-5" width="80%">
        <v-row>
        <v-col cols="12" sm="4">
        <v-btn class="ma-5" to="/nft-list" dark>List Mode</v-btn>
        <!-- Directive  -->
        <v-btn class="ma-5" v-fullscreen dark>fullscreen</v-btn >
        <v-btn class="ma-5" @click="cycle = true" v-show="!cycle" dark>Start Cycle</v-btn>
        <v-btn class="ma-5" @click="cycle = false" v-show="cycle" dark>Stop Cycle</v-btn>
        <v-btn class="ma-5" color="black" @click="color = 'black'" v-show="!cycle" dark>Black BG</v-btn>
        <v-btn class="ma-5" color="white" @click="color = 'white'" v-show="!cycle">White BG</v-btn>
        </v-col>
        <v-col cols="12" sm="3">
        Image Height: {{imageHeight}} px
         <v-slider
          v-model="imageHeight"
          hint="Im a hint"
          max="1920"
          min="240"
          color="green"
        ></v-slider>
        </v-col>
        <v-col cols="12" sm="3">
        {{slideInterval / 1000}} seconds
         <v-slider
          v-model="slideInterval"
          hint="Im a hint"
          max="100000"
          min="100"
          color="purple"
        ></v-slider>
        </v-col>
        </v-row>
        </v-card>
      </v-col>
      </v-row>
    </v-container>   
</template>

<script>
import VueFullscreen from 'vue-fullscreen'
  import Vue from 'vue'
  Vue.use(VueFullscreen)
  import { clusterApiUrl, solanaWeb3 } from "@solana/web3.js";
//   import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
  import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
  import axios from "axios";

  export default {
    components: {
    },
    data: () => ({
        slideInterval: 5000,
    hasTokens: false,
      cycle: false,
      imageHeight: 960,
        color: "white",
        model: 0,
      cardWidth: 500,
      validTransferAddress: false,
      overlay: false,
      zIndex: 0,
      reveal: false,
      transferDestinationAccount: '',
      ownerAddress: '',
      nfts: {},
      solanaNftMetadata: [],
      arUrl: '',
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length == 44 || 'Must be a Valid Solana Address',
        },
    }),
    mounted () {
        console.log(solanaWeb3);
        console.log(this.$store.state.ownerAddress);
        this.getAllNftData();
    },
    created (){
      //  this.getAllNftData();
    },
    methods: {
        async getAllNftData () {
            try {
                const connect =    createConnectionConfig(clusterApiUrl(this.$store.state.network));
                let ownerToken = this.$store.state.ownerAddress;
                const result = isValidSolanaAddress(ownerToken);
                console.log("result", result);
                const nfts = await getParsedNftAccountsByOwner({
                publicAddress: ownerToken,
                connection: connect,
                serialization: true,
                });
                // console.log('nfts',nfts)
                this.nfts = nfts;
                this.getArweaveMeta();
            } catch (error) {
            console.log(error);
            }
        },
        async getArweaveMeta () {
        try {
            this.nfts.forEach(nft => axios.get(nft.data.uri).then(res => { this.solanaNftMetadata.push({nft,res}); } ));
            console.log("metacapture",this.solanaNftMetadata)
            this.hasTokens = true;
        } catch (err) {
            this.nfts = err
        }
        },
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
        async getProvider () {
            if ("solana" in window) {
            const provider = window.solana;
            if (provider.isPhantom) {
                return provider;
                }
            }
        },
        async checkTransferAddress () {
          console.log('checkTransferAddress')
        },
        
    }
  }
</script>
