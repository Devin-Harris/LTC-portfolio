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
      const json = await response.json()
      return json
    },
    async fetchImage({}, img) {
      let baseUrl = `https://larissa-cullen-portfolio.herokuapp.com/image?id=${img._id}`
      if (window.location.hostname === 'localhost') baseUrl = `http://localhost:3000/image?id=${img._id}`

      const response = await fetch(baseUrl, {
        method: 'GET'
      })
      const json = await response.json()
      return json
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

      const json = await response.json()
      return json
    },
    async updateImages({}, {imagesToUpdate, securityKey}) {
      let baseUrl = 'https://larissa-cullen-portfolio.herokuapp.com/update-images'
      if (window.location.hostname === 'localhost') baseUrl = 'http://localhost:3000/update-images'

      const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({imagesToUpdate, securityKey})
      })

      const json = await response.json()
      return json
    }
  },
  modules: {
  }
})
