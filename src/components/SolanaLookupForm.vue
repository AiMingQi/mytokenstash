<template>
<v-card dark class="pa-3">
          <v-row justify="center" v-show="$store.state.ownerAddress == ''" >
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
            <h1 v-show="$store.state.ownerAddress == ''">OR</h1>
          </v-row>
          <v-row justify="center" class="mt-5 mb-3">
            <v-btn color="green" @click="getOwnerAddress" v-show="$store.state.ownerAddress == ''" dark>Connect Solana Wallet</v-btn>
            <p v-show="$store.state.ownerAddress !== ''">Connected <br> <strong>{{$store.state.ownerAddress}}</strong> <br> This is the current wallet address.</p>
          </v-row>
            <div v-show="$store.state.ownerAddress !== ''">
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