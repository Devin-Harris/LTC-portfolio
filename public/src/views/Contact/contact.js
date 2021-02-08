export default {
  name: 'Contact',
  components: {},
  data() {
    return {
      fname: '',
      lname: '',
      email: '',
      message: ''
    }
  },
  computed: {
    formSubmitDisabled() {
      return !(this.fname && this.lname && this.email && this.message)
    }
  }
}