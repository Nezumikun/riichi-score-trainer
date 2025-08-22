<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { LocaleObject } from '@nuxtjs/i18n'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const nuxtApp = useNuxtApp()
const router = useRouter()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const languageMenuItems = ref<DropdownMenuItem[]>()

function updateLanguageList() : void {
  languageMenuItems.value = []
  for (const lang of locales.value) {
    if (lang.code === locale.value) continue
    const iconName = 'i-circle-flags-' + lang.code
    languageMenuItems.value.push({
      label: lang.name,
      icon: iconName,
      color: 'info',
      onSelect: () => { onSelecLanguage(lang)}
    })
  }
}

nuxtApp.hook('i18n:localeSwitched', () => {
  updateLanguageList()
})

function onSelecLanguage(lang : LocaleObject) : void {
  router.push(switchLocalePath(lang.code))
}

  updateLanguageList()
</script>

<template>
  <nav class="shadow-lg w-full fixed top-0 h-15">
    <div class="flex items-center justify-between max-w-6xl mx-auto">
      <div class="space-x-7">
        <NuxtLinkLocale to="/" class="flex items-center py-4 px-2">
          <span class="font-semibold text-lg">
            {{ $t('site_title') }}
          </span>
        </NuxtLinkLocale>
      </div>
      <div class="px-2">
        <UDropdownMenu
          arrow
          :items="languageMenuItems"
          :content="{
            align: 'end',
            side: 'bottom'
          }"
          :ui="{
            content: 'w-48'
          }"
        >
          <UButton icon="i-lucide-languages" class="bg-gray-700 hover:bg-gray-900"/>
        </UDropdownMenu>
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