<template>
  <div class="rules">
    <v-container>
    <v-col
        class="mb-5"
        cols="12"
      >
      <div v-show="hasTokens">
        <v-btn color="blue" dark @click="reveal = true" v-show="!reveal">See More Details</v-btn>  
        <v-btn color="blue" dark @click="reveal = false" v-show="reveal">See Less Details</v-btn> 
      </div>
        <v-row class="text-left">
          <v-card dark class="mx-auto my-12" max-width="420" v-show="!hasTokens">
            <v-card-title>Loading the Stash...</v-card-title>
            <v-card-text>Either you don't have any NFTs in this account, or they are still loading... Decentralized storage can take a moment, so please be patient if you know there are actually NFTs in this account.</v-card-text>
          </v-card>
         <v-card v-for="nft in solanaNftMetadata" :key="nft.index" class="mx-auto my-12" max-width="420" dark>
            <v-card-title>{{nft.nft.data.name}}</v-card-title>
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
            <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn color="purple" dark @click="overlay = !overlay">Transfer NFT</v-btn>  
            
            </v-card-actions>
            <v-expand-transition>
            <v-card
              v-if="reveal"
              class="transition-fast-in-fast-out v-card--reveal"
            >
              <v-card-text class="pb-0">
                <span class="green--text">Symbol:</span> {{nft.res.data.symbol}}<br>
                <span class="green--text">Copyright:</span> {{nft.res.data.copyright}} <br>
                <br>
                <span class="purple--text">Description:</span> {{nft.res.data.description}} <br>
              </v-card-text>
              <v-card-text class="pb-0" :key="attribute.index" v-for="attribute in nft.res.data.attributes">
                <span class="red--text">Trait Type:</span> {{attribute.trait_type}}<br>
                <span class="red--text">Value:</span> {{attribute.value}}<br>
              </v-card-text>
              <v-card-text class="pb-0">
                <span class="blue--text">Token Address:</span> {{nft.nft.mint}} <br>
                <span class="blue--text">Contract Address:</span> {{nft.nft.updateAuthority}} <br>
              </v-card-text>
              <v-card-actions class="pt-0">
              </v-card-actions>
            </v-card>
          </v-expand-transition>    
         </v-card>
         <v-overlay
          :z-index="zIndex"
          :value="overlay"
            >
            <v-card width="100%">
              <v-card-title>Transfer Token</v-card-title>
              <v-card-text>
                  <transfer-token></transfer-token>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="white--text"
                  color="teal"
                  @click="overlay = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          
        </v-overlay>
        </v-row>
      </v-col>
     
  </v-container>
  </div>
</template>

<script>

  import { clusterApiUrl, solanaWeb3 } from "@solana/web3.js";
//   import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
  import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
  import axios from "axios";
  import TransferToken from '../components/TransferToken.vue';

  export default {
    hasTokens: false,
    components: {
    TransferToken
    },
    data: () => ({
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
