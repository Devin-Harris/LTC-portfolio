<template>
  <div id="app">
    <navbar :links="links" :title="navTitle" />
    <router-view class="page-content"/>
    <footerbar />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html {
  overflow-x: hidden;
}

.page-content {
  margin-top: 10rem;
}
</style>

<script>
import Navbar from '@/components/navbar'
import Footerbar from '@/components/footerbar'

export default {
  name: 'App',
  components: {
    Navbar,
    Footerbar
  },
  computed: {
    links() {
      if (this.$route.name === 'Editor') {
        if (!this.$route.params.type || this.$route.params.type == 'Bio') return ['Home']
        else return ['Home', 'Add', 'Update', 'Delete']
      }
      else return ['Home', 'Gallery', 'Bio', 'Contact']
    },
    navTitle() {
      if (this.$route.name === 'Editor') return 'Editor'
      else return ''
    }
  }
}
</script>
