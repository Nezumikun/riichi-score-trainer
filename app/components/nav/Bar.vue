<script setup>
</script>

<template>
  <nav class="shadow-lg sticky top-0 h-15">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-7">
          <NuxtLinkLocale to="/" class="flex items-center py-4 px-2">
            <span class="font-semibold text-lg">
              Подсчёт руки в риичи
            </span>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background-color: teal;
  z-index: 1000;
}
</style>