import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async fetchImages() {
      let baseUrl = 'https://larissa-cullen-portfolio.herokuapp.com/images'
      if (window.location.hostname === 'localhost') baseUrl = 'http://localhost:3000/images'

      const response = await fetch(baseUrl, {
        method: 'GET'
      })

      return response
    },
    async addImages({}, {imagesToAdd, securityKey}) {
      let baseUrl = 'https://larissa-cullen-portfolio.herokuapp.com/add-images'
      if (window.location.hostname === 'localhost') baseUrl = 'http://localhost:3000/add-images'

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({imagesToAdd, securityKey})
      })

      return response
    }
  },
  modules: {
  }
})
