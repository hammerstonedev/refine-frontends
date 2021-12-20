# refine-vue2

## Project setup

1. Install peer dependencies
    ```
	yarn add @vue/composition-api vue2-datepicker
    ```

	(Also tailwind and tailwind/forms are required, see the tailwind docs to install https://tailwindcss.com/docs/installation)
2. Wherever you import Vue, do this right after:
    ```
	import VueCompositionAPI from '@vue/composition-api';
	Vue.use(VueCompositionAPI);
    ```
3. Include the stylesheet in your html:
    ```
	<link rel="stylesheet" href="https://unpkg.com/@hammerstone/vue2-query-builder@0.1.14/dist/vue2-query-builder.css" />
    ```
4. Include the date picker stylesheet wherever that makes sense in your app
    ```
    import "vue2-datepicker/index.css";
    ```
