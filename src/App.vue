<template>
  <div>
    <MainLayout />
    <router-view />
  </div>
</template>

<script>
import MainLayout from './components/MainLayout.vue'
export default {
  name: 'App',
  components: {
    MainLayout,
  },
}
</script>
