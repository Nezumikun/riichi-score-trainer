<script setup lang="ts">
  const version : string = process.env.NUXT_ENV_CURRENT_GIT_SHA || ''
</script>

<template>
  <div class="bg-gray-700 fixed bottom-0 right-0 left-0">
    <div class="flex mx-auto items-center justify-between flex-wrap p-4 md:px-6 max-w-7xl">
              <span>
                  <NuxtLinkLocale :prefetch="false" to="/about" class="text-gray-200 hover:text-white mr-2" >
                    {{ $t("page_about") }}
                  </NuxtLinkLocale>
              </span>
              <span class="flex items-center flex-no-shrink">
                <ULink to="https://github.com/Nezumikun/riichi-scoring-trainer">
                  <UAvatar icon="i-lucide-github" size="xl" />
                </ULink>
                <span class="mr-1 ml-4"> v.{{version}}</span>
              </span>
    </div>
  </div>
</template>