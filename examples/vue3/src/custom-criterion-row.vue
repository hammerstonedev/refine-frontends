<template>
  <div>
    <slot name="errors"></slot>
    <div class="border border-red-900 p-1">
      <slot name="selector"></slot>
    </div>
    <div class="border border-blue-900 p-1">
      <slot name="remove"></slot>
    </div>
  </div>
</template>
