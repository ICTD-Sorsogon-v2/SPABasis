/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import 'es6-promise/auto'
import vuetify from './vuetify';
import router from './routes';
import store from './store';
import Vue from 'vue';
window.Vue = require('vue').default;
Vue.config.productionTip = false
Vue.component('main-container', require('./components/MainContainer.vue').default);

 const app = new Vue({
    el: '#app',
    vuetify,
    router,
    store
 });
