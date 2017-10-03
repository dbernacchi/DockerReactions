<template>
  <div class="event">
    <div>
      <h1>{{ event.name }}</h1>
      <form>
        <fieldset class="uk-fieldset">
          <button :disabled="!validUpdateForm" :class="{ 'uk-button-primary': validUpdateForm, 'uk-button-disabled': !validUpdateForm }" class="uk-button uk-button-primary" v-on:click="update()" v-if="!isLoading">Update info</button>
        </fieldset>
      </form>
    </div>
    <div id="loading" v-if="isLoading" class="uk-position-cover uk-overlay-primary">
      <div class="uk-position-center">
        loading <span uk-icon="icon: clock; ratio: 1.5"></span>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import UIKit from 'uikit'

export default {
  name: 'events',
  data () {
    return {
      isLoading: true,
      urlBase: 'http://localhost:7000/',
      logs: [],
      event: {
        name: ''
      }
    }
  },
  mounted () {
    this.event.name = this.$route.params.name
    this.isLoading = false
  },
  computed: {
    validUpdateForm () {
      return true
    }
  }
}
</script>

<style>
  #loading {
    font-size: 25px;
  }
</style>
