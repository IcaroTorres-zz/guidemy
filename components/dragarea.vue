<template>
<div>
  <v-icon
    :color="color"
    v-for="n in (length || 6)"
    :key="n" 
    :style="`width: ${size || 12}px; height: ${size || 24}px; line-height: 24px; cursor: grab; display: inline-flex`">
    drag_indicator
  </v-icon>
</div>
</template>
<script>
export default {
  props: {
    color: String,
    length: Number,
    size: Number
  }
}
</script>

