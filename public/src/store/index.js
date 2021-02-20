import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async fetchBio() {
      let baseUrl = "https://larissa-cullen-portfolio.herokuapp.com/bio"
      if (window.location.hostname === 'localhost') baseUrl = "http://localhost:3000/bio"

      const response = await fetch(baseUrl, {
        method: 'GET'
      })
      const json = await response.json()
      return json
    },
    async updateBio({ }, { bio, securityKey }) {
      let baseUrl = 'https://larissa-cullen-portfolio.herokuapp.com/update-bio'
      if (window.location.hostname === 'localhost') baseUrl = 'http://localhost:3000/update-bio'

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bio, securityKey })
      })

      const json = await response.json()
      return json
    },
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
    },
    async deleteImages({}, {imagesToDelete, securityKey}) {
      let baseUrl = 'https://larissa-cullen-portfolio.herokuapp.com/delete-images'
      if (window.location.hostname === 'localhost') baseUrl = 'http://localhost:3000/delete-images'

      const response = await fetch(baseUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({imagesToDelete, securityKey})
      })

      const json = await response.json()
      return json
    },
    async formSubmission({}, { firstName, lastName, email, message, subject }) {
      let baseUrl = 'https://larissa-cullen-portfolio.herokuapp.com/form-submission'
      if (window.location.hostname === 'localhost') baseUrl = 'http://localhost:3000/form-submission'
      
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, message, subject })
      })

      const json = await response.json()
      return json
    }
  },
  modules: {
  }
})
