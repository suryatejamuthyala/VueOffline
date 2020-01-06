import Vue from 'vue';
import App from './App.vue';
import Menu from "./components/Menu.vue";
import VueRouter from 'vue-router';
import './registerServiceWorker';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter(
    {
        routes: [
            {
                name: "main",
                path: '/',
                component: Menu,
                query: {book: ''}
            }
        ]
    })

Vue.config.productionTip = false
new Vue({
    render: h => h(App),
    router: router,
}).$mount('#app');
