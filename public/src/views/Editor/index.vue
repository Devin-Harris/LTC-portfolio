<template>
  <div class="editor">

    <button class="home-button" @click="$router.push('/')"><i class="fas fa-home"></i></button>

    <div v-if="$route.params.type === 'Add'" class="add-container">
      <h2>Add Images</h2>
      <form class="form-container" @submit.prevent>
        <div class="inputs">
          <textarea name="drive-link" id="drive-link" cols="30" rows="1" placeholder="Google Drive Link..." v-model="currentLink"></textarea>
          <textarea name="info" id="info" cols="30" rows="1" placeholder="Image information..." v-model="currentInfo"></textarea>
          <textarea name="copyright" id="copyright" cols="30" rows="1" placeholder="Copyright Text..." v-model="currentCopyright"></textarea>
          <button :class="addIsDisabled ? 'disabled' : 'enabled'" @click="addImage">Add</button>
        </div>

        <div class="image-to-add-showcase" v-if="imagesToAdd.length > 0">
          <p>Images to add...</p>
          <div class="image-showcase-container">
            <div
              class="image-showcase"
              v-for="image in imagesToAdd"
              :key="image.linkId"
              :style="{'background-image': `url(${getImageSrc(image.link_id)}`}"
            >
            </div>
          </div>
        </div>

        <div class="submit-button">
          <input type="password" placeholder="Security password..." v-model="securityKey">
          <button type="submit" :class="formSubmitDisabled ? 'disabled' : 'enabled'" @click="applyAddChanges">Apply Changes...</button>
        </div>
      </form>

    </div>

    <div v-else-if="$route.params.type === 'Update'" class="update-container"></div>

  </div>
</template>

<script src="./editor.js"></script>
<style src="./editor.scss" lang="scss"></style>