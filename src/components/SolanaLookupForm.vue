<template>
<v-card dark class="pa-3">
          <v-row justify="center" >
            <v-col cols="4">
              <v-text-field 
                v-model="lookupAddress.nickname" 
                width="100%"
                auto-grow
                rows="2"
                row-height="20"
                label="Account Nickname"
              ></v-text-field>
        </v-col>
            <v-col cols="7">
              <v-text-field 
                v-model="lookupAddress.address" 
                :rules="[rules.required, rules.counter]"
                width="100%"
                auto-grow
                rows="2"
                row-height="20"
                label="Enter a Valid Solana Address"
              ></v-text-field>
        </v-col>


            <v-col cols="12" md="6" sm="4">
              <v-btn color="light-blue" dark @click="setOwnerAddress"> Add Account </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <h1 >OR</h1>
          </v-row>
          <v-row justify="center" class="mt-5 mb-3">
            <v-btn color="green" @click="getOwnerAddress" dark>Connect Solana Wallet</v-btn>
          </v-row>
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

  export default {
    name: 'WelcomePage',

    data: () => ({
      lookupAddress: {
        nickname: '',
        address: ''
      },
      ownerAddress: '',
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length == 44 || 'Must be a Valid Solana Address',
        },
      network: '',
    }),
    mounted () {
      console.log(this.$store.state.ownerAddress);
    },
    methods: {
      async getOwnerAddress(){
        try {
          const resp = await window.solana.connect();
          let walletAddress = resp.publicKey.toString()
          let newWallet = { nickname: "Browser Wallet", address: walletAddress}
          this.$store.commit('updateLookupAddresses', newWallet)
          console.log(resp.publicKey.toString())
          // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
        } catch (err) {
          // { code: 4001, message: 'User rejected the request.' }
        }
        // true
      },
      setOwnerAddress () {
        if (this.lookupAddress.address.length == 44) {
        this.$store.commit('updateLookupAddresses', this.lookupAddress)
        console.log("addresslookup",this.$store.state.lookupAddresses)
        this.lookupAddress = [{nickname: '', address: ''}]
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