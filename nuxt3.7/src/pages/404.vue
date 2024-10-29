<template>
  <div>404</div>
</template>

<script setup lang="ts">
throw createError({
  statusCode: 404,
  message: 'Page not found',
  fatal: true,
})
</script>

<style scoped lang="sass"></style>