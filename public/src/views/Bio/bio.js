import { mapActions } from 'vuex'

export default {
  name: 'Bio',
  components: {},
  data() {
    return {
      bio: []
    }
  },
  async created() {
    this.bio = await this.fetchBio()
  },
  methods: {
    ...mapActions([
      'fetchBio'
    ]),
    getProfilePicture() {
      return require('@/assets/images/waterColorCrop.jpg')
    }
  }
}