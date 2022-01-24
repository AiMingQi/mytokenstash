<template>
  <v-container fluid>
    <v-row class="text-center">
    
      <v-col cols="12" lg="5" sm="12" class="mb-2">
        <v-card class="d-flex">
          <v-row justify="center">
            <v-col cols="12" sm="3">
            <div>
              <v-img class="ma-5" src="https://gateway.pinata.cloud/ipfs/QmNk52WAqD6FmebfiXepvoLM7JQC6NPgSDEhx6re4mHEtj" max-width="240px" color="black" alt="logo"/>
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
          <v-card dark class="pa-3">
          <v-row justify="center" v-show="$store.state.ownerAddress == 'no current user'" >
            <v-col cols="10">
              <v-text-field 
                v-model="LookupAccount" 
                :rules="[rules.required, rules.counter]"
                width="100%"
                auto-grow
                rows="2"
                row-height="20"
                label="Enter a Valid Solana Address"
              ></v-text-field>
        </v-col>


            <v-col cols="12" md="6" sm="4">
              <v-btn color="light-blue" dark @click="setOwnerAddress"> Lookup Account </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <h1 v-show="$store.state.ownerAddress == 'no current user'">OR</h1>
          </v-row>
          <v-row justify="center" class="mt-5 mb-3">
            <v-btn color="green" @click="getOwnerAddress" v-show="$store.state.ownerAddress == 'no current user'" dark>Connect Solana Wallet</v-btn>
            <p v-show="$store.state.ownerAddress !== 'no current user'">Connected <br> <strong>{{$store.state.ownerAddress}}</strong> <br> This is the current wallet address.</p>
          </v-row>
            <div v-show="$store.state.ownerAddress !== 'no current user'">
            <v-btn class="mx-3 mt-5 font-weight-bold" color="purple" to="/nft-list" dark>View Token Stash</v-btn>
            </div>
          <v-row justify="center">

          <v-col cols="12" sm="6">
          <v-select
            :items="this.$store.state.networkChoices"
            label="Change network"
            @change="setNetwork"
            v-model="network"
            max-width="200px"
          ></v-select>
          </v-col>
          </v-row>
        </v-card>
      </v-col>

        <v-col cols="12" lg="7" sm="12">
      <v-row>
      <v-col cols="12" lg="4" md="6" sm="12" v-for="feature in features" :key="feature.priority">
      <v-card :dark="feature.cardTheme">
        <v-card-title><h3>Featured</h3> </v-card-title>
        <v-card-subtitle><h4>{{feature.type}}</h4></v-card-subtitle>
        <v-card-text>
          <a :href="feature.linkUrl" target="_blank">
            <v-img :src="feature.imageUrl"/>
          </a>
        </v-card-text>
      </v-card>
      </v-col>

       </v-row>
       </v-col>

    </v-row>
  </v-container>
</template>

<script>

  import * as solanaWeb3 from '@solana/web3.js';
  export default {
    name: 'WelcomePage',

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
          cardTheme: true,
          priority: "1",
          type: 'NFT',
          linkUrl: 'https://solsea.io/nft/Ez8ETsDyoS3PB31rNMCsxKE5RjyJKALN95J44APGfs2c',
          imageUrl: 'https://www.arweave.net/grpozyPCME2j5kLdHqBEMdf-uh0Sqxvi-zpazOh6MPg?ext=PNG',
        },
        { 
          cardTheme: false,
          priority: "2",
          type: 'NFT Game',
          linkUrl: 'https://the-game.fun',
          imageUrl: 'https://gateway.pinata.cloud/ipfs/Qmer8dA6z1ooMiJ86dNCZQJvypkseGKBrpSEuSMSm9FZEz',
        },
        { 
          cardTheme: true,
          priority: "3",
          type: 'NFT Collection',
          linkUrl: 'https://solsea.io/collection/616eee186c530ec596bb1027',
          imageUrl: 'https://gateway.pinata.cloud/ipfs/QmcXQ5TbQS2acHoGZkAUNVxN5nshXuSzcVQghdwyjAp2RU',
        },
        { 
          cardTheme: false,
          priority: "4",
          type: 'NFT',
          linkUrl: 'https://solsea.io/nft/8gXneZeFoKbKrSsbZCdD4SW6upn7e6EHoJTiM6cF3jd8',
          imageUrl: 'https://www.arweave.net/b9rL4huLrx5KrBtooLPkIG5TAzrH1YA7WY9N92oO-Ps?ext=PNG',
        },
        { 
          cardTheme: true,
          priority: "5",
          type: 'NFT',
          linkUrl: 'https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/60768586216831178033855531481083396667282735752358900668981410474861422182401',
          imageUrl: 'https://lh3.googleusercontent.com/AT-7vl8VH_TjgQG-zRMDPirf6gm0ZwuPYx9D8MzFJZHxKbGPAjd_yG7grVSPKgjB6uiw412TG5Psmo_6DMKb8ANbTzgvnCtfnK-xjw=s0',
        },
        { 
          cardTheme: false,
          priority: "6",
          type: 'NFT',
          linkUrl: 'https://solsea.io/nft/2qTT2PRutEcG2LFC282KnerS91fsbit2QFETp99UxhCn',
          imageUrl: 'https://www.arweave.net/rUGUiAU19hqoW6Rdt_VvPrMzTrTqW--MzIi9pt0jG_k?ext=PNG',
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
