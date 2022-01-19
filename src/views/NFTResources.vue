<template>
    <v-container>
        <v-row>
            <v-col
                class="mb-5"
                cols="12"
            >
                <h2 class="headline font-weight-bold mb-6">
                Solana Resources:
                </h2>
                <v-row justify="center">
                    <v-btn
                        v-for="(next, i) in whatsNext"
                        :key="i"
                        :href="next.href"
                        class="subheading mx-3 mb-4 font-weight-white"
                        color="#c00000"
                        target="_blank"
                        dark
                    >
                        {{ next.text }}
                    </v-btn >
                
                </v-row>                
            </v-col>
            <v-card dark class="ma-3">
                <v-card-title>
                    Useful NFT Resources
                </v-card-title>
            </v-card>    
        </v-row>
        <v-row>
            <v-card dark class="ma-3">
                <v-card-title>
                    NFT Marketplaces
                </v-card-title>
            </v-card>    
        </v-row> 
        <v-row>
            <v-card dark class="ma-3">
                <v-card-title>
                    NFT Games
                </v-card-title>
            </v-card>    
        </v-row>  
    </v-container>
</template>

<script>
export default {
    data: () => ({
        whatsNext: [
        {
          text: 'Visit Solana',
          href: 'https://solana.com',
          target: '_blank'
        },
        {
          text: 'Setup a Browser-Based Wallet',
          href: 'https://phantom.app/',
          target: '_blank'
        },
        {
          text: 'Get an NFT on Solsea',
          href: 'https://solsea.io/collection/616eee186c530ec596bb1027',
          target: '_blank'
        },
      ],
    })
}
</script>