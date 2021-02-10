import { mapActions } from 'vuex'

export default {
  name: 'Gallery',
  components: {},
  data() {
    return {
      images: [],
      mainImage: {},
      mainImageRatio: 0,
      loading: true,
      tilesShown: true
    }
  },
  async created() {
    this.images  = await this.fetchImages()
    this.mainImage = this.images[0]
    this.loading = false
  },
  computed: {
    getImageWidth() {
      const img = new Image();
      img.src = this.getImageSrc(this.mainImage.link_id);
      img.onload = () => { this.mainImageRatio = this.getRatio(img.width, img.height) } 
      return `calc(${this.mainImageRatio} * ${this.tilesShown ? 25 : 35}rem)`
    },
    colCount() {
      let maxCol = 8
      if (this.images.length >= maxCol) return maxCol
      else return this.images.length
    }
  },
  methods: {
    ...mapActions([
      'fetchImages'
    ]),
    getImageSrc(linkId) {
      if (!linkId) return
      return `https://drive.google.com/uc?id=${linkId}`
    },
    getRatio(width, height) {
      return width / height
    },
    getImageIndex() {
      return this.images.findIndex(img => img._id === this.mainImage._id)
    },
    prevImage() {
      let imgIdx = this.getImageIndex()
      if (imgIdx === 0) this.mainImage = this.images[this.images.length - 1]
      else this.mainImage = this.images[imgIdx - 1]
    },
    nextImage() {
      let imgIdx = this.getImageIndex()
      if (imgIdx === this.images.length - 1) this.mainImage = this.images[0]
      else this.mainImage = this.images[imgIdx + 1]
    },
    toggleTiles() {
      this.tilesShown = !this.tilesShown
    }
  }
}