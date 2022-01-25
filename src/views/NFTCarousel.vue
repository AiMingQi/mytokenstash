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
                :interval="slideIntervalSeconds*1000"
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
                    class="ma-5 align-start"
                    ></v-img>
                    <v-overlay
                      :absolute="absolute"
                      :value="overlay"
                      opacity="0"
                    class="ma-5 align-start"
                    >
                    <v-row dense>
                    <v-chip class="align-start pa-5 blue--text" x-large><h2>{{nft.res.data.name}}</h2></v-chip>
                   
                    <v-chip-group
                    column
                    class="align-end mt-auto ml-5"
                    >
                      <v-chip class="d-flex-inline align-end pa-5" :key="attribute.index" v-for="attribute in nft.res.data.attributes"><strong>{{attribute.trait_type}}</strong> : {{attribute.value}}</v-chip>
                    </v-chip-group>
                    </v-row >
                    </v-overlay>
                    
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
        <v-card class="mx-auto mt-5" width="80%">
        <v-row>
        <!-- Directive  -->
        <v-card-text>
        <v-btn color="purple" class="ma-5 d-flex-inline" v-fullscreen dark>fullscreen</v-btn >
        <v-btn class="ma-5" to="/nft-list" dark x-large>List Mode</v-btn>

        <v-btn
          color="success"
          class="ma-5"
          @click="overlay = !overlay"
          v-show="!overlay"
        >
          Show Overlay
        </v-btn>
        <v-btn
          class="ma-5"
          color="success"
          @click="overlay = false"
          v-show="overlay"
        >
          Hide Overlay
        </v-btn>
        <p>Image Height: {{imageHeight}} px</p>
         <v-slider
          v-model="imageHeight"
          hint="By adjusting the height of the image you can lock in the size you want for Fullscreen"
          max="2160"
          min="240"
          step="20"
          color="green"
        ></v-slider>
        <p>Background: {{color}}</p>
        <v-btn class="ma-5 d-flex-inline" color="black" @click="color = 'black'" v-show="!cycle" dark>Black BG</v-btn>
        <v-btn class="ma-5 d-flex-inline" color="white" @click="color = 'white'" v-show="!cycle">White BG</v-btn>
        <p>Slide Duration: {{slideIntervalSeconds}} seconds</p>
         <v-slider
          v-model="slideInterval"
          hint="Set the time for slide transitions"
          max="600000"
          min="1000"
          step="1000"
          color="purple"
          v-show="!cycle"
        ></v-slider>
        <v-btn class="ma-5 d-flex-inline" @click="cycle = true" v-show="!cycle" dark>Start Carousel Cycle</v-btn>
        <v-btn class="ma-5 d-flex-inline" @click="cycle = false" v-show="cycle" dark>Stop Cycle</v-btn>
        </v-card-text>
        </v-row>
        </v-card>
      </v-col>
      <v-col cols="2">
        
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
      absolute: true,
      slideInterval: 5000,
      hasTokens: false,
      cycle: false,
      imageHeight: 900,
      color: "white",
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
        
    },
    computed: {
      slideIntervalSeconds () {
        return this.slideInterval / 1000
      }
    }
  }
</script>
