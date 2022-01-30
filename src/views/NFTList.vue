<template>
  <v-container>
    <v-col
        class="mb-5"
        cols="12"
      >
      <div v-show="hasTokens">
        <v-btn color="blue" dark @click="reveal = true" v-show="!reveal">See More Details</v-btn>  
        <v-btn color="blue" dark @click="reveal = false" v-show="reveal">See Less Details</v-btn> 
        <v-btn class="mx-5" to="/nft-carousel" dark>Carousel Mode</v-btn>

        <v-slider
          v-model="cardWidth"
          hint="Im a hint"
          max="1920"
          min="156"
          color="#c00000"
        ></v-slider>
      </div>
        <v-row class="text-left">
          <v-card dark class="mx-auto my-12" max-width="420" v-show="!hasTokens">
            <v-card-title>Loading the Stash...</v-card-title>
            <v-card-text>Either you don't have any NFTs in this account, or they are still loading... Decentralized storage can take a moment, so please be patient if you know there are actually NFTs in this account.</v-card-text>
          </v-card>
         <v-card v-for="nft in solanaNftMetadata" :key="nft.index" class="mx-auto my-12" :width="cardWidth" dark>
            <v-card-title>
              <div class="ml-2">{{nft.nft.data.name}}</div>
              <v-spacer></v-spacer>
              <v-chip>{{nft.address.nickname}}</v-chip>
            </v-card-title>
            <v-card-text>
            <v-img 
            lazy-src="src/assets/game-baby.png"
            :src="nft.res.data.image"
            >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
                <br>
                <div class="ml-3">
                <p>Getting images <br>
                from Arweave or IPFS<br> 
                can take some time.<br>
                Heck they might not <br>
                even show up at all...</p>
                </div>

              </v-row>
            </template>
            </v-img>
                </v-card-text>
            <v-expand-transition>
            <v-card
              v-if="reveal"
              class="transition-fast-in-fast-out v-card--reveal"
            >
              <v-card-text>
                <v-chip-group
                  column
                  class="align-end mt-auto ml-5"
                  >
                  <v-chip class="d-flex-inline align-end pa-5" :key="attribute.index" v-for="attribute in nft.res.data.attributes"><strong class="orange--text">{{attribute.trait_type}}</strong> : {{attribute.value}}</v-chip>
                </v-chip-group>
                
              </v-card-text>
              <v-card-text class="pb-0">
                <span class="green--text"><strong>Symbol:</strong></span> {{nft.res.data.symbol}}<br>
                <br>
                <span class="purple--text"><strong>Description:</strong></span> {{nft.res.data.description}} <br>
                <br>
                <span class="yellow--text"><strong>Copyright:</strong></span> {{nft.res.data.copyright}} <br>
              </v-card-text>
                

              <v-card-text class="pb-0">
                <span class="blue--text">Token Address:</span> {{nft.nft.mint}} <br>
                <span class="blue--text">Contract Address:</span> {{nft.nft.updateAuthority}} <br>
              </v-card-text>
              <v-card-actions>
                <v-btn class="ma-2 float-right" color="green" dark :href="nft.res.data.image" target="_blank">Image Source</v-btn>  
              </v-card-actions>
            </v-card>
          </v-expand-transition>    
         </v-card>
        </v-row>
    </v-col>
  </v-container>
</template>

<script>

  import { clusterApiUrl} from "@solana/web3.js";
//   import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
  import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
  import axios from "axios";

  export default {
    data: () => ({
    hasTokens: false,
      cardWidth: 500,
      validTransferAddress: false,
      overlay: false,
      zIndex: 0,
      reveal: false,
      transferDestinationAccount: '',
      ownerAddress: '',
      nfts: {},
      solanaNftMetadata: [],
      lookupAddresses: [
        {
          nickname: '',
          address: ''
        }
      ],
      arUrl: '',
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length == 44 || 'Must be a Valid Solana Address',
        },
    }),
    mounted () {
        this.lookupAddresses = this.$store.state.lookupAddresses
        console.log("localaddys",this.lookupAddresses);
        
        this.lookupAddresses.forEach(address => this.getAllNftData(address));
    },
    created (){
      //  this.getAllNftData();
    },
    methods: {
        async getAllNftData (address) {
            try {
                const connect =    createConnectionConfig(clusterApiUrl(this.$store.state.network));
                let ownerToken = address.address;
                const result = isValidSolanaAddress(ownerToken);
                console.log("result", result);
                const nfts = await getParsedNftAccountsByOwner({
                publicAddress: ownerToken,
                connection: connect,
                serialization: true,
                });
                // console.log('nfts',nfts)
                this.nfts = nfts;
                this.getArweaveMeta(address);
            } catch (error) {
            console.log(error);
            }
        },
        async getArweaveMeta (address) {
        try {
            this.nfts.forEach(nft => axios.get(nft.data.uri).then(res => { this.solanaNftMetadata.push({nft,res,address}); } ));
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

    }
  }
</script>
