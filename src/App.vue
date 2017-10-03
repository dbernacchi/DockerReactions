<template>
  <div id="app">
    <nav class="uk-navbar-container uk-position-fixed uk-position-top uk-position-z-index" uk-navbar id="navbar">
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <router-link to="/" tag="li" exact><a>Docker Reactions</a></router-link>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
  #app > div {
    margin: 100px 20px 170px;
  }
</style>
