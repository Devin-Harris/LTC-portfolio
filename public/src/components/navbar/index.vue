<template>
  <div class="navbar-container">
    <h2 class="title" v-if="title">{{title}}</h2>
    <div class="navbar">
      <p v-for="link in links" :key="link" :class="{'active': link == $route.name || ($route.name == 'Editor' && link == $route.params.type)}" @click="navigateToLink(link)">{{link}}</p>
    </div>
  </div>
</template>

<script src="./navbar.js"></script>
<style src="./navbar.scss" lang="scss"></style>