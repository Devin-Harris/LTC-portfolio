export default {
  name: 'update-image',
  props: ['imageId', 'copyright', 'info'],
  computed: {
    getImageSrc() {
      if (!this.imageId) return
      return `https://drive.google.com/uc?id=${this.imageId}`
    },
    getGoogleLink() {
      return `https://drive.google.com/file/d/${this.imageId}/view?usp=sharing`
    }
  },
  created() {},
  methods: {
    
  }
}