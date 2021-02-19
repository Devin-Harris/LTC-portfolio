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
      bio: [],
      imagesToUpdate: [],
      imagesToDelete: []
    }
  },
  async created() {
    this.gallery = await this.fetchImages()
    this.bio = await this.fetchBio()
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
    },
    deleteSubmitDisabled() {
      return !(this.securityKey && this.imagesToDelete.length !== 0)
    },
    bioSubmitDisabled() {
      return !(this.securityKey && this.bio.length !== 0)
    }
  },
  methods: {
    ...mapActions([
      'addImages',
      'updateImages',
      'deleteImages',
      'fetchImages',
      'fetchImage',
      'fetchBio',
      'updateBio'
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
    async applyUpdateChanges() {
      this.status = await this.updateImages({ imagesToUpdate: this.imagesToUpdate, securityKey: this.securityKey })
      if (this.status.status === 200) this.$router.push({ name: this.$route.name, params: { type: this.$route.params.type, status: 'success' } })
      else if (this.status.status === 400) this.$router.push({ name: this.$route.name, params: { type: this.$route.params.type, status: 'fail' } })

      this.imagesToUpdate = []
    },
    async applyDeleteChanges() {
      this.status = await this.deleteImages({ imagesToDelete: this.imagesToDelete, securityKey: this.securityKey })
      if (this.status.status === 200) this.$router.push({ name: this.$route.name, params: { type: this.$route.params.type, status: 'success' } })
      else if (this.status.status === 400) this.$router.push({ name: this.$route.name, params: { type: this.$route.params.type, status: 'fail' } })

      this.imagesToDelete = []
    },
    async applyBioChanges() {
      this.status = await this.updateBio({ bio: this.bio, securityKey: this.securityKey })
      if (this.status.status === 200) this.$router.push({ name: this.$route.name, params: { type: this.$route.params.type, status: 'success' } })
      else if (this.status.status === 400) this.$router.push({ name: this.$route.name, params: { type: this.$route.params.type, status: 'fail' } })
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
    async handleStatusAction() {
      if (this.status.status === 200) {
        if (this.$route.params.type === 'Bio') this.$router.push('/bio')
        else this.$router.push('/gallery')
      } 
      else  {
        this.status = {}
        this.$router.push({name: this.$route.name, params: { type: this.$route.params.type } })
        if (this.$route.params.type === 'Update')
          this.gallery = await this.fetchImages()
        if (this.$route.params.type === 'Bio')
          this.bio = await this.fetchBio()
      }
    },
    updateImage(image) {
      this.imagesToUpdate.push(image)
      this.gallery = this.gallery.filter(img => img._id !== image._id)
    },
    toggleDeleteImage(image) {
      if (this.imagesToDelete.includes(image)) this.imagesToDelete = this.imagesToDelete.filter(img => img._id !== image._id)
      else this.imagesToDelete.push(image)
    },
    handleGoogleLinkChange(img, e) {
      this.imagesToUpdate.forEach(i => {
        if (i._id === img._id) i.link_id = e.target.value
      })
    },
    handleInfoChange(img, e) {
      this.imagesToUpdate.forEach(i => {
        if (i._id === img._id) i.info = e.target.value
      })
    },
    handleCopyrightChange(img, e) {
      this.imagesToUpdate.forEach(i => {
        if (i._id === img._id) i.copyright = e.target.value
      })
    },
    async revertChanges(img) {
      const [response] = await this.fetchImage(img)
      this.gallery.push(response)
      this.imagesToUpdate = this.imagesToUpdate.filter(i => i._id !== response._id)
    },
    addNewBlock() {
      this.bio.push({
        block_sequence: this.bio.length,
        block_text: ''
      })

      setTimeout(() => {
        this.$refs.bioEditorTextContainer.children[this.bio.length - 1].children[1].focus()
      }, 50)
    },
    removeBlock(block) {
      this.bio = this.bio.filter(b => b.block_text !== block.block_text)
    },
    moveBlock(block, dir) {
      if (dir === 'up' && block.block_sequence === 0) return
      if (dir === 'down' && block.block_sequence === this.bio.length - 1) return

      let blockToSwitch = {}
      if (dir === 'up') blockToSwitch = this.bio.find(b => b.block_sequence === block.block_sequence - 1)
      else if (dir === 'down') blockToSwitch = this.bio.find(b => b.block_sequence === block.block_sequence + 1)

      let newBio = []
      this.bio.forEach(b => {
        if (b === blockToSwitch) {
          newBio.push({ ...block, block_sequence: blockToSwitch.block_sequence})
        } else if (b === block) {
          newBio.push({ ...blockToSwitch, block_sequence: block.block_sequence })
        } else {
          newBio.push(b)
        }
      })
      this.bio = newBio
    }
  }
}