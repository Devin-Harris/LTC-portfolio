<template>
  <div class="navbar-container">
    <h2 class="title" v-if="title">{{title}}</h2>
    <div class="navbar">
      <div class="link" v-for="link in links" :key="link">
        <p v-if="($route.name === 'Editor' && link !== 'Home') || $route.name !== 'Editor'" :class="{'active': link == $route.name || ($route.name === 'Editor' && link === $route.params.type)}" @click="navigateToLink(link)">{{link}}</p>
        <button v-else-if="$route.name === 'Editor' && link === 'Home'" class="home-button" @click="$router.push('/')"><i class="fas fa-home"></i></button>
      </div>
    </div>
  </div>
</template>

<script src="./navbar.js"></script>
<style src="./navbar.scss" lang="scss"></style>