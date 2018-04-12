import '@/style/css/main.css'
import '@/style/css/normalize.css'
import Vue from 'vue';
import App from './App';
import router from './router';
import moment from 'moment';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import vHeader from "./components/common/Header.vue"
import vFooter from './components/common/Footer.vue';
import DatePicker from "./components/common/DatePicker"
import DateTimePicker from "./components/common/DateTimePicker"
import vSidebar from './components/common/Sidebar.vue';
import vPage from './components/common/Pagination.vue';
import vArea from './components/common/Area.vue';

Vue.component('v-header', vHeader);
Vue.component('v-footer', vFooter);
Vue.component('v-sidebar', vSidebar);
Vue.component('v-page', vPage);
Vue.component('v-area', vArea);
Vue.component('date-picker', DatePicker);
Vue.component('datetime-picker', DateTimePicker);

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;
Vue.prototype.$WEB_DOMAIN = '/';

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
});
