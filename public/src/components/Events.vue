<template>
  <div class="event">
    <div>
      <h1>{{ event.name }}</h1>
      <form>
        <fieldset class="uk-fieldset">
          <div class="uk-margin">
            <input id="startTime" class="uk-input" :class="{'uk-form-danger': startTime.length == 0}" type="text" placeholder="Start Date/Time" v-model="startTime">
          </div>
          <div class="uk-margin">
            <input id="endTime" class="uk-input" :class="{'uk-form-danger': endTime.length == 0}" type="text" placeholder="End Date/Time" v-model="endTime">
          </div>
          <button :disabled="!validUpdateForm" :class="{ 'uk-button-primary': validUpdateForm, 'uk-button-disabled': !validUpdateForm }" class="uk-button uk-button-primary" v-on:click="update()" v-if="!isLoading">Update info</button>
        </fieldset>
      </form>
      <ul class="uk-list">
        <li v-for="(reaction, index) in reactions" :key="index">
          {{ index }}: {{ reaction }}
        </li>
      </ul>
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
      endTime: '',
      startTime: '',
      urlBase: '/',
      logs: [],
      event: {
        name: ''
      },
      reactions: {
        'NONE': 0,
        'LIKE': 0,
        'LOVE': 0,
        'WOW': 0,
        'HAHA': 0,
        'SAD': 0,
        'ANGRY': 0,
        'THANKFUL': 0,
        'PRIDE': 0
      }
    }
  },
  mounted () {
    this.event.name = this.$route.params.name
    this.isLoading = false
  },
  computed: {
    validUpdateForm () {
      if(this.endTime.length > 0 && this.startTime.length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    update () {
      self = this
      self.isLoading = true
      axios.get(self.urlBase + 'events/' + self.$route.params.id + '/' + self.startTime + '/' + self.endTime)
        .then( response => {
          let maxIndex = response.data.logs.length - 1
          for(let reaction in self.reactions) {
            console.log(reaction, response.data.logs[maxIndex][reaction])
            self.reactions[reaction] = response.data.logs[maxIndex][reaction] - response.data.logs[0][reaction]
          }
          self.isLoading = false
        })
        .catch( error => {
          console.log(error)
          self.isLoading = false
        })
    }
  }
}
</script>

<style>
  #loading {
    font-size: 25px;
  }
</style>
