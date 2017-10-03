<template>
  <div class="home">
    <h2>Events</h2>
    <div class="uk-accordion-content">
      <ul class="uk-margin-left uk-margin-right uk-list uk-list-divider">
        <li class="clickable" v-for="(event, index) in events" :key="index"><!--  @click="flightClick(league.name)"> -->
          {{ event.name }}
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
  name: 'home',
  data () {
    return {
      isLoading: true,
      urlBase: 'http://localhost:7000/',
      events: []
    }
  },
  mounted () {
    this.isLoading = true
    this.fetchEvents()
  },
  methods: {
    fetchEvents() {
      let self = this
      axios.get(self.urlBase + 'events')
        .then(function (response) {
          self.events = response.data.events
          self.isLoading = false
        })
        .catch(function (error) {
          console.log(error)
          self.error = 'There was an error performing the requested search'
          UIKit.modal.alert('An error occured while attempting your search').then(function () {
            console.log('Alert closed.')
          })
          self.isLoading = false
        })
    }
  }
}
</script>


