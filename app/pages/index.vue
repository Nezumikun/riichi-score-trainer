<script setup lang="ts">
  const hand = ref<Hand>(new Hand())
  const tenhouHandRequest = ref<TenhouHandRequest>()
  await getNextGameResult();
  
  async function getNextGameResult() {
    const fetchData = await $fetch<TenhouHandRequest>('/api/getRandomTehnouHand')
    tenhouHandRequest.value = fetchData
    console.log(fetchData)
    if (fetchData.tenhouHand !== null) {
      hand.value.parseTehnouHandRequest(fetchData)
    }
  }
</script>

<template>
  <div class="p-10">
    <h1 class="text-3xl text-center">
      {{ hand.GUID }}
    </h1>
    <!--
    <div>
    handArray {{ JSON.stringify(handArray) }}
    </div>
    <div>
    melds {{ JSON.stringify(melds) }}
    </div>
    <div>
    winningTile {{ JSON.stringify(winningTile) }}
    </div>
    -->
    <div class="text-center w-full">
      <div class="hand">
        <template v-for="tile in hand.hand" :key="tile">
          <img :src="tile.getImageName()" :class="tile.getCssClasses()">
        </template>
      </div>
      <div class="tile-winning">
        <img :src="hand.winningTile.getImageName()" class="tile tile-winning">
      </div>
      <div class="melds">
        <template v-for="meld in hand.melds">
          <template v-for="tile in meld" :key="tile">
            <img :src="tile.getImageName()" :class="tile.getCssClasses()">
          </template>
        </template>
      </div>
    </div>
    <div class="winning-parameters grid grid-cols-5 pt-8 w-fit min-w-1/2 gap-4 mx-auto">
      <div>{{ $t("wind_of_round") }}</div>
      <div>{{ $t("wind_of_seat") }}</div>
      <div>{{ $t("dora_indicator") }}</div>
      <div>{{ $t("uradora_indicator") }}</div>
      <div>{{ $t("winning_parameters") }}</div>
      <div><img :src="hand.roundWind.getImageName()" :class="hand.roundWind.getCssClasses()"></div>
      <div><img :src="hand.seatWind.getImageName()" :class="hand.seatWind.getCssClasses()"></div>
      <div>
        <template v-for="doraIndicator in hand.doraIndicators" :key="doraIndicator">
          <img :src="doraIndicator.getImageName()" :class="doraIndicator.getCssClasses()">
        </template>
      </div>
      <div>
        <template v-if="hand.uraDoraIndicators">
          <template v-for="uraDoraIndicator in hand.uraDoraIndicators" :key="uraDoraIndicator">
            <img :src="uraDoraIndicator.getImageName()" :class="uraDoraIndicator.getCssClasses()">
          </template>
        </template>
        <template v-if="!hand.uraDoraIndicators.length">
          {{ $t("no") }}
        </template>
      </div>
      <div>
        <div class="grid grid-cols-1">
          <div>{{ $t("riichi_option") }}: {{ hand.isRiichi ? $t("yes") : $t("no") }}</div>
          <div>{{ $t("tsumo_option") }}: {{ hand.isTsumo ? $t("yes") : $t("no") }}</div>
        </div>
      </div>
    </div>
    <div class="winning-details grid grid-cols-2 pt-8 w-fit min-w-1/2 gap-4 mx-auto">
      <div>{{ $t("Yaku") }}</div>
      <div>{{ $t("Fu") }}</div>
      <div>
        <div class="grid grid-cols-2">
          <template v-for="yaku in hand.yaku" :key="yaku">
            <div>{{ $t(yaku.codeName) }}</div>
            <div class=" text-right">{{ yaku.price }}</div>
          </template>
          <div class="winning-details-summary col-span-2 text-right">
            {{ hand.han  }}
          </div>
        </div>
      </div>
      <div>
        <div class="grid grid-cols-5">
          <template v-for="fu in hand.fuDetails" :key="fu">
            <div class="col-span-4">{{ $t('fu_' + fu.reason) }}</div>
            <div class=" text-right">{{ fu.fu }}</div>
          </template>
          <div class="winning-details-summary col-span-5 text-right">
            {{ hand.fu  }}
          </div>
        </div>
      </div>
    </div>
    <div class="text-center w-full pt-4">
      <UButton loading-auto color="secondary" @click="getNextGameResult()">{{ $t('next_hand') }}</UButton>
    </div>
  </div>
</template>

<style scoped>
img.tile {
  display: inline-block;
  padding: 2px;
  width: 70px;
  background-color: white;
  border-radius: 12px;
  border: thin solid grey;
} 
img.tile-called {
  transform: rotate(90deg) translate(17%);
  margin-left: 10px;
  margin-right: 10px;
}
img.tile-winning {
  border: medium solid red;
}
div.melds {
  padding-left: 10px;
  display: inline-block;
}
div.tile-winning {
  padding-left: 10px;
  display: inline-block;
}
div.hand {
  display: inline-block;
}
div.winning-parameters div {
  margin: 5px;
  text-align: center;
}
div.winning-details-summary {
  border-top: 1px solid white;
}
</style>