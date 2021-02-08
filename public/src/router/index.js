import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Gallery from '../views/Gallery'
import Bio from '../views/Bio'
import Contact from '../views/Contact'
import Editor from '../views/Editor'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/bio',
    name: 'Bio',
    component: Bio
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/editor',
    redirect: '/editor/Add'
  },
  {
    path: '/editor/:type?',
    name: 'Editor',
    component: Editor
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
