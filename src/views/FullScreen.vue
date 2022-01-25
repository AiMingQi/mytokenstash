<template>
  <div>
    <!-- Component  -->
    <fullscreen v-model="fullscreen">
      content
    </fullscreen>
    <v-btn type="button" @click="toggle" >Fullscreen</v-btn>
    <!-- Api  -->
    <v-btn  type="button" @click="toggleApi" >FullscreenApi</v-btn >
    <!-- Directive  -->
    <v-btn  type="button" v-fullscreen >FullscreenDirective</v-btn >

  </div>
</template>
<script>

  import VueFullscreen from 'vue-fullscreen'
  import Vue from 'vue'
  Vue.use(VueFullscreen)
  export default {

    methods: {
      toggle () {
        this.fullscreen = !this.fullscreen
      },
      toggleApi () {
        this.$fullscreen.toggle()
      },
    },
    data() {
      return {
        fullscreen: false,
      }
    }
  }
</script>