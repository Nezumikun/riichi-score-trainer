<script setup lang="ts">
import TileImage from './TileImage.vue';

const props = defineProps({
  parameters : {
    type: WinningParameters,
    default: new WinningParameters()
  },
  includeHonba : {
    type: Boolean,
    default: false
  }
})
</script>


<template>
  <div class="winning-parameters grid lg:grid-cols-4 grid-cols-3 lg:grid-flow-col pt-8 w-fit min-w-1/2 gap-4 mx-auto">
    <div>
      <div class="text-nowrap">{{ $t("wind_of_round") }}</div>
      <div>
        <TileImage :tile="props.parameters.roundWind" />
      </div>
    </div>
    <div>
      <div class="text-nowrap">{{ $t("wind_of_seat") }}</div>
      <div>
        <TileImage :tile="props.parameters.seatWind" />
      </div>
    </div>
    <div>
      <span class="hidden lg:inline-block">{{ $t("winning_parameters") }}</span>
      <div class="grid grid-cols-1">
        <div>{{ $t("riichi_option") }}: {{ props.parameters.isRiichi ? $t("yes") : $t("no") }}</div>
        <div>{{ $t("tsumo_option") }}: {{ props.parameters.isTsumo ? $t("yes") : $t("no") }}</div>
        <div v-if="props.includeHonba">
          {{ $t("honba_option") }}: {{ props.parameters.honbaSticks }}
        </div>
      </div>
    </div>
    <div class="col-span-3 lg:col-span-1">
      {{ $t("dora_indicator") }}
      <div class="dora-list">
        <template v-for="doraIndicator in props.parameters.doraIndicators" :key="doraIndicator">
          <TileImage :tile="doraIndicator" />
        </template>
      </div>
    </div>
    <div v-if="props.parameters.uraDoraIndicators.length > 0" class="col-span-3 lg:col-span-1">
      {{ $t("uradora_indicator") }}
      <div class="dora-list">
        <template v-if="props.parameters.uraDoraIndicators">
          <template v-for="uraDoraIndicator in props.parameters.uraDoraIndicators" :key="uraDoraIndicator">
            <TileImage :tile="uraDoraIndicator" />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.winning-parameters div {
  /* margin: 5px; */
  text-align: center;
}
</style>