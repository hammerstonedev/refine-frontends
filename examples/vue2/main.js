import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import App from './App.vue';
import { DatePickerPlugin } from '../../packages/refine-vue/dist/vue2/refine-vue.esm';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

Vue.use(DatePickerPlugin, { DatePicker });
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
