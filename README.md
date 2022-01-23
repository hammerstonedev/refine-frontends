# refine-vue2


## Usage with Laravel Mix

Install Refine and its peer dependencies.

```shell
yarn add @hamemrstone/refine-vue2 @vue/composition-api vue2-datepicker
```

Wherever you import Vue (usually app.js), you'll need to add the VueCompositionAPI.

```js
import Vue from 'vue';

// Add the following two lines.
import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI);
```

You'll need to include two stylesheets.  

There are many ways to include external stylesheets, depending on what your setup is. If you're using PostCSS, you can use the `postcss-import` plugin by first requiring `npm install -D postcss-import` it.

And then modifying your `webpack.mix.js` to reference it.

```js
mix.postCss('resources/css/app.css', 'public/css', [
  require('postcss-import'),
]);
```

If you're using Tailwind, you can include the Tailwind version of the CSS by referencing it explicitly: 

```css
@import "@hammerstone/refine-vue2/src/assets/styles/tailwind.css";
```

If you're not using Tailwind, you can use the vanilla version:
```css
@import "@hammerstone/refine-vue2/dist/refine-vue2.css";
```

Finally, you'll need to import the datepicker styles:

```css
@import "vue2-datepicker/index.css";
```

If you prefer to include the stylesheet in your layout instead of importing it through your build process, you may do so via the unpkg CDN.

```html
<link rel="stylesheet" href="https://unpkg.com/@hammerstone/refine-vue2/dist/refine-vue2.css" />
<link rel="stylesheet" href="https://unpkg.com/vue2-datepicker/index.css" />
```
