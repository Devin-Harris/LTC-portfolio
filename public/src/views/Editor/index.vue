<template>
  <div class="editor">

    <div v-if="$route.params.status" class="status-container">
      <h2>{{status.message}}</h2>
      <p @click="handleStatusAction">{{status.status === 200 ? 'View gallery' : 'Try again'}}</p>
    </div>

    <div class="cards" v-else-if="!$route.params.type">
      <div class="card" @click="$router.push({name: 'Editor', params: {type: 'Add'}})">
        <h4>Gallery Editor</h4>
        <i class="fas fa-file-image"></i>
      </div>
      <div class="card" @click="$router.push({name: 'Editor', params: {type: 'Bio'}})">
        <h4>Bio Editor</h4>
        <i class="fas fa-paragraph"></i>
      </div>
    </div>

    <div class="bio-container" v-else-if="$route.params.type === 'Bio'">
      <h2>Bio Editor</h2>
      <form class="form-container" @submit.prevent>
        <div class="inputs" ref="bioEditorTextContainer">
          <div class="text-chunk" v-for="text in bio" :key="text._id">
            <div class="buttons">
              <i class="fas fa-caret-up" @click="moveBlock(text, 'up')"></i>
              <i class="fas fa-caret-down" @click="moveBlock(text, 'down')"></i>
              <i class="fas fa-times" @click="removeBlock(text)"></i>
            </div>
            <textarea v-model="text.block_text" cols="30" :rows="text.block_text ? Math.floor(text.block_text.length / 60 - 1) : 1"></textarea>
          </div>
          <p class="new-block" @click="addNewBlock">Add a new block of text <span><i class="fas fa-paragraph"></i></span></p>
        </div>

        <div class="submit-button">
          <input type="password" placeholder="Security password..." v-model="securityKey">
          <button type="submit" :class="bioSubmitDisabled ? 'disabled' : 'enabled'" @click="applyBioChanges">Apply Changes...</button>
        </div>
      </form>
    </div>

    <div v-else-if="$route.params.type === 'Add'" class="add-container">
      <h2>Add Images</h2>
      <form class="form-container" @submit.prevent>
        <div class="inputs">
          <textarea name="drive-link" id="drive-link" cols="30" :rows="currentLink ? Math.round(currentLink.length / 30 - 1) : 1" placeholder="Google Drive Link..." v-model="currentLink"></textarea>
          <textarea name="info" id="info" cols="30" :rows="currentInfo ? Math.round(currentInfo.length / 30 - 1) : 1" placeholder="Image information..." v-model="currentInfo"></textarea>
          <div class="copyright-container">
            <span @click="autofillCopyright">&copy; Autofill copyright fill</span>
            <textarea name="copyright" id="copyright" cols="30" :rows="currentCopyright ? Math.round(currentCopyright.length / 30 - 1) : 1" placeholder="Copyright Text..." v-model="currentCopyright"></textarea>
          </div>
          <button :class="addIsDisabled ? 'disabled' : 'enabled'" @click="addImage">Add</button>
        </div>

        <div class="image-to-add-showcase" v-if="imagesToAdd.length > 0">
          <p>Images to add...</p>
          <div class="image-showcase-container">
            <div
              class="image-showcase"
              v-for="image in imagesToAdd"
              :key="image.link_id"
              :style="{'background-image': `url(${getImageSrc(image.link_id)}`}"
            >
              <div class="remove-image-button" @click="removeImage(image)">
                <i class="fa fa-times"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="submit-button">
          <input type="password" placeholder="Security password..." v-model="securityKey">
          <button type="submit" :class="addSubmitDisabled ? 'disabled' : 'enabled'" @click="applyAddChanges">Apply Changes...</button>
        </div>
      </form>

    </div>

    <div v-else-if="$route.params.type === 'Update'" class="update-container">
      <h2>Update Images</h2>
      <form class="form-container" @submit.prevent>
        <div div class="image-to-add-showcase" v-if="gallery.length > 0">
          <p>Select Images to update...</p>
          <div class="image-showcase-container">
            <div
              class="image-showcase"
              v-for="image in gallery"
              :key="image.link_id"
              :style="{'background-image': `url(${getImageSrc(image.link_id)}`}"
              @click="updateImage(image)"
            >
            </div>
          </div>
        </div>

        <div class="update-images">
          <update-image
            v-for="img in imagesToUpdate"
            :key="img._id"
            :imageId="img.link_id"
            :copyright="img.copyright"
            :info="img.info"
            @google-link-change="handleGoogleLinkChange(img, $event)"
            @info-change="handleInfoChange(img, $event)"
            @copyright-change="handleCopyrightChange(img, $event)"
            @revert-changes="revertChanges(img)"
          >
          </update-image>
        </div>

        <div class="submit-button">
          <input type="password" placeholder="Security password..." v-model="securityKey">
          <button type="submit" :class="updateSubmitDisabled ? 'disabled' : 'enabled'" @click="applyUpdateChanges">Apply Changes...</button>
        </div>
      </form>
    </div>

    <div v-else-if="$route.params.type === 'Delete'" class="delete-container">
      <h2>Delete Images</h2>
      <form class="form-container" @submit.prevent>
        <div div class="image-to-add-showcase" v-if="gallery.length > 0">
          <p>Select Images to delete...</p>
          <div class="image-showcase-container">
            <div
              class="image-showcase"
              :class="{'delete-image': imagesToDelete.includes(image)}"
              v-for="image in gallery"
              :key="image.link_id"
              :style="{'background-image': `url(${getImageSrc(image.link_id)}`}"
              @click="toggleDeleteImage(image)"
            >
              <div class="x-icon">x</div>
            </div>
          </div>
        </div>

        <div class="submit-button">
          <input type="password" placeholder="Security password..." v-model="securityKey">
          <button type="submit" :class="deleteSubmitDisabled ? 'disabled' : 'enabled'" @click="applyDeleteChanges">Apply Changes...</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script src="./editor.js"></script>
<style src="./editor.scss" lang="scss"></style>