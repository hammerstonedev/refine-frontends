import './index.css';
import 'vue-datepicker-next/index.css';
import { createApp } from 'vue';
import { DatePickerPlugin } from '../../../packages/refine-vue/src/package';
import DatePicker from 'vue-datepicker-next';
import App from './App.vue';
import CustomCriterionRow from './custom-criterion-row';
import LinearCriterionRow from './linear-criterion-row';

const app = createApp(App);

app.component('custom-criterion-row', CustomCriterionRow);
app.component('linear-criterion-row', LinearCriterionRow);

app.use(DatePickerPlugin, { DatePicker });
app.mount('#app');
