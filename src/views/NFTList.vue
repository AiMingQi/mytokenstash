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
            <v-card >
              
            </v-card>



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
                <v-spacer></v-spacer>
                <v-btn class="ma-2 float-right" color="green" dark :href="nft.res.data.image" target="_blank">Image Source</v-btn>  
                <v-spacer></v-spacer>
                
                <v-btn light>
                  <s-facebook
                    class="base-social"
                    :windowFeatures='{"width":685,"height":600}'
                    :shareOptions='{"url": nft.res.data.image,"quote":"Shared from MyTokenStash.com - NFT Owner Address: " + nft.address.address,"hashtag":"#MyTokenStash"}'
                    :useNativeBehavior="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                      />
                    </svg>
                  </s-facebook>
                </v-btn>

                <v-btn light>
                  <s-telegram
                    class="base-social"
                    :windowFeatures='{"width":600,"height":540}'
                    :shareOptions='{"url": nft.res.data.image, "text":"MyTokenStash.com - NFT Owner Address: " + nft.address.address}'
                    :useNativeBehavior="false"
                  >
                    <svg
                      width="24px"
                      height="24px"
                      xmlns="http://www.w3.org/2000/svg"
                      xml:space="preserve"
                      xmlns:serif="http://www.serif.com/"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        id="telegram-1"
                        d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"
                      />
                    </svg>
                  </s-telegram>
                </v-btn>

                <v-btn light>
                  <s-pinterest
                    class="base-social"
                    :windowFeatures='{"width":700,"height":700}'
                    :shareOptions='{"url": nft.res.data.image,"media": nft.res.data.image,"description":"MyTokenStash - NFT Owner Address:" + nft.address.address}'
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </s-pinterest>
                </v-btn>
                
                <v-btn light>
                  <s-twitter
                    class="base-social"
                    :windowFeatures='{"width":600,"height":540}'
                    :shareOptions='{"url": nft.res.data.image,"text": "Shared from MyTokenStash - NFT Owner Address: " + nft.address.address,"hashtags":["MyTokenStash"],"via":""}'
                    :useNativeBehavior="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                      />
                    </svg>
                  </s-twitter>
                </v-btn>



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

  import { SFacebook, STelegram, STwitter,  SPinterest   } from 'vue-socials'



  export default {
    components: {
      SFacebook,
      STelegram,
      STwitter,
      SPinterest  
    },
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
