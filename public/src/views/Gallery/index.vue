<template>
  <div class="gallery">
    <div class="loading" v-if="loading">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <div class="images-container" v-else>
      <div class="main-image" :class="{'main-image-tall': !tilesShown}" :style="{'background-image': `url(${getImageSrc(mainImage.link_id)}`}">
        <div class="arrows">
          <i class="fas fa-chevron-left" @click="prevImage"></i>
          <i class="fas fa-chevron-right" @click="nextImage"></i>
        </div>
        <div class="info" :style="{'width': getImageWidth}">
          <p>{{mainImage.info}}</p>
          <p>{{mainImage.copyright}}</p>
        </div>
      </div>
      <div class="show-hide-tiles">
        <p @click="toggleTiles">{{tilesShown ? 'Hide Tiles' : 'Show Tiles'}}</p>
      </div>
      <div v-if="tilesShown" class="bottom-images" :style="{'grid-template-columns': `repeat(${colCount}, 5rem)`}">
        <div
          class="bottom-image"
          v-for="image in images"
          :key="image._id"
          :style="{'background-image': `url(${getImageSrc(image.link_id)}`}"
          @click="mainImage = image"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./gallery.js"></script>
<style src="./gallery.scss" lang="scss"></style>