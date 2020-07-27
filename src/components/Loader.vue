<template>
<div v-if="visible" class="center-container">
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-progress-circular
            :size="48"
            :width="4"
            color="primary lighten-1"
            indeterminate
          ></v-progress-circular>
        </v-layout>
      </v-container>
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
 
  &--visible {
    opacity: 1;
    pointer-events: all;
  }
}
</style>