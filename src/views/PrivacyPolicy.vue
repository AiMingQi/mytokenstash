<template>
  <div class="rules">
    <v-container>
      <v-row>
    <v-col
        class="mb-5"
        cols="12"
        sm="6"
      >
      <v-card dark>
      <v-card-title>
        <h2 class="headline font-weight-bold mb-6">
          Privacy Policy:
        </h2>
      </v-card-title>

      <v-card-text>
        <p>MyTokenStash.com protects your privacy by design. You are in complete control of every computing event that shares your data publicly. (Only when the user submits a valid transaction which changes the blockchain state.)</p>
        <p>MyTokenStash is deployed using IPFS and by design the creators of MyTokenStash have no record or knowledge of who, what, when, where or why users use the app. Users are fully responsible for the results of using the app.</p>
        <p><strong>MyTokenStash is a completely decentralized dApp.</strong> MyTokenStash.com DOES NOT use cookies, deploy trackers, secretly store data, share your user data, record history of activity, record IP addresses, record events, track users, store users, access a centralized database, store google analytics, store or share any analytics, have any record of page usage or any means of knowing who, what, when, where or why anyone uses the Javascript or Typescript libraries on their own device to interact with decentralized public blockchain ledger technologies to make read and write activities on those public ledgers. </p>
        <p>When a user connects their wallet or inputs a public key into the application, all processing logic happens locally on the user's device.  Only in the event that a user initiates a signed transaction utilizing JSON RPC calls to publicly available RPC channels is there a possibility that some form of universally recognized state change can occur. </p>
        <p>The requests for blockchain data are done using public JSON RPC calls to publicly available APIs.  Any tracking that those apis do is beyond the knowledge of scope of the developers of MyTokenStash.  Any privacy concerns would need to be addressed at the Layer 1 protocol level of the blockchain technology involved.  <p/>
        <p>All RPC urls are shared in the public github repository and can be audited by the user for privacy</p>
        <p>MyTokenStash is a tool for interacting with public blockchains, and security is determined by the blockchain technology itself.  This site can form Typescript and Javascript transaction requests, utilizing public RPC Channels and is transparent about all aspects of transaction construction, and all code is visible at https://github.com/aimingqi/mytokenstash  </p>
        <p>Due to the fact that all code is public and reproducable it is extremely likely that many different actors will reproduct the MyTokenStash.com website and may attempt nepharious actions.  Users are wise to always remain diligent and wary of anything suspicious and do their own code audits and domain checks to ensure they are fully knowledgable about their actions. </p>
        <p>MyTokenStash is not responsible for, and will not be able to assist users in any way with retriving funds, creating refunds, arbitrating disbutes, turning back transactions, solving any problems other than are strictly related to the functionality of MyTokenStash itself.  </p>
        <p>All issues can be submitted to <a href="https://github.com/aimingqi/mytokenstash" target="_blank">https://github/aimingqi/mytokenstash</a> as pull requests. </p>
        <p> </p>
        <p> </p>
        <p> </p>
      </v-card-text>
        
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="ma-3">
          <v-card-title>
            Important Resources:
          </v-card-title>
          <v-card-text>
            <h3><a class="text--red" href="https://github.com/aimingqi/mytokenstash" target="_blank"><v-icon x-large>mdi-github</v-icon></a> All code is found at our public github repo.</h3>
          </v-card-text>
        </v-card>
        <v-card class="ma-3">
          <v-card-title>
            Previous Site Versions:
          </v-card-title>
          <v-card-text>
            <h3 class="my-3" v-for="version in ipfsVersions" :key="version.number">Version:  <a :href="'https://gateway.pinata.cloud/ipfs/' + version.siteHash" target="_blank">{{version.number}}</a> CID: {{version.siteHash}} </h3>
          </v-card-text>
        </v-card>
      </v-col>
      </v-row>
  </v-container>
  </div>
</template>



<script>

import ipfsVersions from "../previousSiteVersions.json"
  export default {
    data: () => ({
        ipfsVersions: ipfsVersions,
    }),
    mounted () {
        console.log(this.ipfs)
    }
  }
</script>

