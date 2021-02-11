import { mapActions } from "vuex"

export default {
  name: 'Contact',
  components: {},
  data() {
    return {
      fname: '',
      lname: '',
      email: '',
      message: '',
      subject: '',
      status: null
    }
  },
  computed: {
    formSubmitDisabled() {
      return !(this.fname && this.lname && this.email && this.message)
    }
  },
  methods: {
    ...mapActions([
      'formSubmission'
    ]),
    clearFields() {
      this.fname = ''
      this.lname = ''
      this.email= ''
      this.message = ''
      this.subject = ''
    },
    async submitForm() {
      if (this.formSubmitDisabled) return
      this.status = await this.formSubmission({
        firstName: this.fname,
        lastName: this.lname,
        email: this.email,
        message: this.message,
        subject: this.subject
      })
      this.clearFields()
    },
    async handleStatusAction() {
      if (this.status.status === 200) this.$router.push('/')
      else this.status = null
    },
    emailAutoFill(e) {
      this.email = e.target.value
    },
    fnameAutoFill(e) {
      this.fname = e.target.value
    },
    lnameAutoFill(e) {
      this.lname = e.target.value
    }
  }
}