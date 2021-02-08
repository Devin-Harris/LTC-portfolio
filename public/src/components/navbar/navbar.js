export default {
  name: 'navbar',
  components: {},
  props: ['links', 'title'],
  data() {
    return {}
  },
  methods: {
    navigateToLink(link) {
      if (this.$route.name === 'Editor') this.$router.push(`/editor/${link}`)
      else this.$router.push({name: link})
    }
  }
}