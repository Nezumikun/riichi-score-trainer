<script setup lang="ts">
const props = defineProps({
  details: {
    type: WinningDetails,
    default: new WinningDetails()
  },
  showPoints: {
    type: Boolean,
    default: false
  },
  points: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="grid grid-cols-2 pt-8 w-fit min-w-1/2 gap-4 mx-auto">
    <div>{{ $t("Yaku") }}</div>
    <div>{{ $t("Fu") }}</div>
    <div>
      <div class="grid grid-cols-2">
        <template v-for="yaku in props.details.yaku" :key="yaku">
          <div>{{ $t(yaku.codeName) }}</div>
          <div class="flex justify-end items-end">{{ yaku.price }}</div>
        </template>
        <div class="winning-details-summary col-span-2 text-right">
          {{ props.details.han  }}
        </div>
      </div>
    </div>
    <div>
      <div class="grid grid-cols-5 align-text-bottom">
        <template v-for="fu in props.details.fuDetails" :key="fu">
          <div class="col-span-4">{{ $t('fu_' + fu.reason) }}</div>
          <div class="flex justify-end items-end">{{ fu.fu }}</div>
        </template>
        <div class="winning-details-summary col-span-5 text-right">
          <span v-if="props.details.exactFu !== props.details.fu">{{ props.details.exactFu }} <UIcon name="i-lucide-arrow-right" /></span>
          {{ props.details.fu  }}
        </div>
      </div>
    </div>
    <div v-if="props.details.limitHand !== false" class="col-span-2 text-center">
      {{ $t("limit_" + props.details.limitHand) }}
    </div>
    <div v-if="props.showPoints" class="col-span-2 text-center">
      {{ $t("Points") }}: {{ props.points }}
    </div>
  </div>
</template>

<style scoped>
div.winning-details-summary {
  border-top: 1px solid white;
}
</style>