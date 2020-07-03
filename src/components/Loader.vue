<template>
 <div >
    <v-overlay class="loader" :class="{ 'loader--visible': visible }">
        <v-progress-circular :size="50"
      color="primary"
      indeterminate></v-progress-circular>
    </v-overlay>
    </div>
</template>
<script>
export default {
  name: "loader",
  props: ["visible"]
};
</script>
<style lang="scss">
.loader {
  transition: 0.15s ease-in opacity;
  pointer-events: none;
  opacity: 0;
  &--visible {
    opacity: 1;
    pointer-events: all;
  }
}
</style>