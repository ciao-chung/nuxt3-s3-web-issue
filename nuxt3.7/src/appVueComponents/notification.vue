<template>
  <notifications
    position="bottom right"
    :duration="5000"
    :speed="500"
    :width="300"
  >
    <template #body="props">
      <div
        class="vue-notification"
        @click="props.close"
        :class="props.item.type"
      >
        <div class="notify-title">
          {{ props.item.title }}
        </div>
        <div style="word-break: break-all;">
          {{ props.item.text }}
        </div>
      </div>
    </template>
  </notifications>
</template>

<script setup lang="ts"></script>

<style lang="sass">
*[eagle="app-root"]
  .vue-notification
    // styling
    margin: 0 5px 5px
    padding: 10px
    font-size: 14px
    color: #ffffff

    // default (blue)
    background: #44a4fc
    border-left: 5px solid #187fe7

    // types (green, amber, red)
    &.success
      background: #68cd86
      border-left-color: #42a85f

    &.warn
      background: #ffb648
      border-left-color: #f48a06

    &.error
      background: #e54d42
      border-left-color: #b82e24

  .notify-title
    font-size: 20px
</style>