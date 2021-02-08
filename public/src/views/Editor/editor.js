import { mapActions } from "vuex"

export default {
  name: 'Editor',
  components: {},
  data() {
    return {
      imagesToAdd: [],
      currentLink: '',
      currentCopyright: '',
      currentInfo: '',
      securityKey: ''
    }
  },
  computed: {
    formSubmitDisabled() {
      return !(this.securityKey && this.imagesToAdd.length !== 0)
    },
    addIsDisabled() {
      return !(this.currentLink && this.currentCopyright && this.currentInfo)
    }
  },
  methods: {
    ...mapActions([
      'addImages'
    ]),
    getImageSrc(linkId) {
      if (!linkId) return
      return `https://drive.google.com/uc?id=${linkId}`
    },
    async applyAddChanges() {
      const response = await this.addImages({imagesToAdd: this.imagesToAdd, securityKey: this.securityKey})
      const json = await response.json()

      this.imagesToAdd = []
      this.clearFields()
    },
    clearFields() {
      this.currentLink = ''
      this.currentInfo = ''
      this.currentCopyright = ''
    },
    getIdFromLink(link) {
      return link.split('/d/')[1].split('/view?usp=sharing')[0]
    },
    addImage() {
      this.imagesToAdd.push({
        link_id: this.getIdFromLink(this.currentLink),
        copyright: this.currentCopyright,
        info: this.currentInfo
      })
      this.clearFields()
    }
  }
}