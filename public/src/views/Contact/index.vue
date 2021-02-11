<template>
  <div class="Contact">
    <div v-if="status" class="status-container">
      <h2>{{status.message.title}}</h2>
      <h4>{{status.message.subTitle}}</h4>
      <p @click="handleStatusAction">{{status.status === 200 ? 'Go to home page...' : 'Try again...'}}</p>
    </div>

    <template v-else>
      <p>My work is on Etsy: LTCFineArtist</p>
      <h2>Feel free to reach out!</h2>

      <form  class="form-container" @submit.prevent>
        <div class="name">
          <span class="required"></span>
          <input type="text" name="fname" id="fname" placeholder="First Name" @change="fnameAutoFill" v-model="fname">
          <span class="required"></span>
          <input type="text" name="lname" id="lname" placeholder="Last Name" @change="lnameAutoFill" v-model="lname">
        </div>
        <div class="email">
          <span class="required"></span>
          <input class="required" type="email" name="email" id="email" placeholder="Email" @change="emailAutoFill" v-model="email">
        </div>
        <div class="subject">
          <input type="text" name="subject" id="subject" placeholder="Subject" v-model="subject">
        </div>
        <div class="message">
          <span class="required"></span>
          <textarea name="message" id="message" cols="30" rows="10" placeholder="Message" v-model="message"></textarea>
        </div>
        <div class="submit-button">
          <button type="submit" @click="submitForm" :class="formSubmitDisabled ? 'disabled' : 'enabled'">Submit</button>
        </div>
      </form>
    </template>

  </div>
</template>

<script src="./contact.js"></script>
<style src="./contact.scss" lang="scss"></style>