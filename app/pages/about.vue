<script setup lang="ts">
  const { locale } = useI18n()
</script>

<template>
  <div class="lg:p-10">
    <div class="text-lg font-semibold">{{ $t('page_about') }}</div>
    <div v-if="locale === 'ru'">
      <div>
        Основано но тренажёре <NuxtLink to="https://github.com/Varantha/Mahjong-ScoringTrainer/">Riichi Mahjong Score Trainer</NuxtLink>
      </div>
      <div>
        Использованы изображения тайлов <NuxtLink to="https://github.com/FluffyStuff/riichi-mahjong-tiles">https://github.com/FluffyStuff/riichi-mahjong-tiles</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>