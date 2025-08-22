<template>
  <div class="flex flex-col h-screen justify-between">
    <YandexMetrika />
    <NavBar />
    <UContainer class="pb-20 pt-20 mb-auto">
      <slot />
    </UContainer>
    <PageFooter />
  </div>
</template>