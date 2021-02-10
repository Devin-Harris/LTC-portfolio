<template>
  <div class="update-image-container">
    <div class="image-showcase" :style="{'background-image': `url(${getImageSrc}`}"></div>
    <div class="inputs-container">
      <textarea name="drive-link" id="drive-link" cols="30" :rows="Math.round(getGoogleLink.length / 30 - 1)" :value="getGoogleLink" @change="$emit('google-link-change', $event)"></textarea>
      <textarea name="info" id="info" cols="30" :rows="Math.round(info.length / 30 - 1)" :value="info" @change="$emit('info-change', $event)"></textarea>
      <textarea name="copyright" id="copyright" cols="30" :rows="Math.round(copyright.length / 30 - 1)" :value="copyright" @change="$emit('copyright-change', $event)"></textarea>
    </div>
  </div>
</template>

<script src="./update-image.js"></script>
<style src="./update-image.scss" lang="scss"></style>