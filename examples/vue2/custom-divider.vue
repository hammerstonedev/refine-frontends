<template>
  <div>
    {{  index }} of {{ total }}
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    total: Number,
  },
};
</script>
