<template>
  <div class="mt-20 p-20 flex items-center justify-center animate__animated animate__fadeIn">
    <div
      class="relative h-auto bg-gray-600 rounded-md pt-24 pb-8 px-12 shadow-md hover:shadow-lg transition flex flex-col items-center"
    >
      <div
        class="absolute rounded-full bg-gray-100 w-28 h-28 p-2 z-10 -top-8 shadow-lg hover:shadow-xl transition"
      >
        <div class="rounded-full bg-black w-full h-full overflow-auto">
          <img
            src="https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper.png"
          />
        </div>
      </div>
      <label class="label"
        >Name: <span class="text-red-400">{{ user.email.split('@')[0] }}</span></label
      >
      <label class="label"
        >Email: <span class="text-red-400">{{ user.email }}</span></label
      >
      <label class="label"
        >Authenticated: <span class="text-red-400">{{ auth }}</span></label
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: ['user', 'auth'],
}
</script>
