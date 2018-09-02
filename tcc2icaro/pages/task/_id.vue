<template>
  
</template>
<script>
export default {
  validate ({ params }) {
    // must be a true project id
    return !!this.$store.getters.projects[params.id]
  }
}
</script>
