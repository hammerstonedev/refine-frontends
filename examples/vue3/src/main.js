import './index.css';
import { createApp } from 'vue';
import App from './App.vue';

import CustomCriterionRow from './custom-criterion-row';
import LinearCriterionRow from './linear-criterion-row';
import { RefinePlugin } from '@hammerstone/refine-vue/src/package';

const app = createApp(App);

app.use(RefinePlugin, {
  showLocators: false,
});

app.component('custom-criterion-row', CustomCriterionRow);
app.component('linear-criterion-row', LinearCriterionRow);

app.mount('#app');
