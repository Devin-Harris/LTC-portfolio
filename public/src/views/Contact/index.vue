<template>
  <div class="Contact">
    <p>My work is on Etsy: LTCFineArtist</p>
    <h2>Feel free to reach out!</h2>

    <form class="form-container" @submit.prevent>
      <div class="name">
        <input type="text" name="fname" id="fname" placeholder="First Name" v-model="fname">
        <input type="text" name="lname" id="lname" placeholder="Last Name" v-model="lname">
      </div>
      <div class="email">
        <input type="email" name="email" id="email" placeholder="Email" v-model="email">
      </div>
      <div class="message">
        <textarea name="message" id="message" cols="30" rows="10" placeholder="Message" v-model="message"></textarea>
      </div>
      <div class="submit-button">
        <button type="submit" :class="formSubmitDisabled ? 'disabled' : 'enabled'">Submit</button>
      </div>
    </form>
  </div>
</template>

<script src="./contact.js"></script>
<style src="./contact.scss" lang="scss"></style>