import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/vueCookies';

Vue.config.productionTip = false;

async function handleDynamicImports() {
  return {};
}

handleDynamicImports().then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
  }).$mount('#app');
});
