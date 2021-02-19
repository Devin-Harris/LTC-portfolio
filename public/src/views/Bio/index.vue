<template>
  <div class="Bio">
    <div class="profile-picture-container" :style="{'background-image': `url(${getProfilePicture()})` }"></div>
    <p v-for="txt in bio" :key="txt._id">
      {{txt.block_text}}
    </p>
  </div>
</template>

<script src="./bio.js"></script>
<style src="./bio.scss" lang="scss"></style>