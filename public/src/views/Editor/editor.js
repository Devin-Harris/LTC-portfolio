import { mapActions } from "vuex"
import UpdateImage from '@/components/update-image'

export default {
  name: 'Editor',
  components: {
    UpdateImage
  },
  data() {
    return {
      imagesToAdd: [],
      currentLink: '',
      currentCopyright: '',
      currentInfo: '',
      securityKey: '',
      status: {},
      gallery: [],
      imagesToUpdate: []
    }
  },
  async created() {
    this.gallery = await this.fetchImages()
  },
  computed: {
    addSubmitDisabled() {
      return !(this.securityKey && this.imagesToAdd.length !== 0)
    },
    updateSubmitDisabled() {
      return !(this.securityKey && this.imagesToUpdate.length !== 0)
    },
    addIsDisabled() {
      return !(this.getIdFromLink(this.currentLink) && this.currentCopyright && this.currentInfo)
    }
  },
  methods: {
    ...mapActions([
      'addImages',
      'fetchImages'
    ]),
    getImageSrc(linkId) {
      if (!linkId) return
      return `https://drive.google.com/uc?id=${linkId}`
    },
    async applyAddChanges() {
      this.status = await this.addImages({imagesToAdd: this.imagesToAdd, securityKey: this.securityKey})
      if (this.status.status === 200) this.$router.push({ name: this.$route.name, params: { type: this.$route.params.type, status: 'success' } }) 
      else if (this.status.status === 400) this.$router.push({ name: this.$route.name, params: { type: this.$route.params.type, status: 'fail' } }) 

      this.imagesToAdd = []
      this.clearAddFields()
    },
    clearAddFields() {
      this.currentLink = ''
      this.currentInfo = ''
      this.currentCopyright = ''
    },
    getIdFromLink(link) {
      return link && link.includes('/d/') && link.includes('/view?usp=sharing') ? link.split('/d/')[1].split('/view?usp=sharing')[0] : null
    },
    addImage() {
      this.imagesToAdd.push({
        link_id: this.getIdFromLink(this.currentLink),
        copyright: this.currentCopyright,
        info: this.currentInfo
      })
      this.clearAddFields()
    },
    removeImage(image) {
      this.imagesToAdd = this.imagesToAdd.filter(img => img._id !== image._id)
    },
    autofillCopyright() {
      const date = new Date(Date.now())
      this.currentCopyright = `Copyright © ${date.getFullYear()} Larissa Thayer Cullen. All rights reserved.`
    },
    handleStatusAction() {
      if (this.status.status === 200) this.$router.push('/gallery')
      else  {
        this.status = {}
        this.$router.push({name: this.$route.name, params: { type: this.$route.params.type } })
      }
    },
    updateImage(image) {
      this.imagesToUpdate.push(image)
      this.gallery = this.gallery.filter(img => img._id !== image._id)
    },
    handleGoogleLinkChange(img, e) {
      console.log(e.target.value)
      this.imagesToUpdate.forEach(i => {
        if (i._id === img._id) i.link_id = e.target.value
      })
    },
    handleInfoChange(img, e) {

    },
    handleCopyrightChange(img, e) {

    }
  }
}