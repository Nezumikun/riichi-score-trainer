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
    <h1 class="h1">
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
    <div class="winning-parameters grid grid-cols-5 w-auto pt-8">
      <div>Ветер раунда</div>
      <div>Ветер места</div>
      <div>Индикатор доры</div>
      <div>Индикатор урадоры</div>
      <div>Параметры выигрыша</div>
      <div><img :src="hand.roundWind.getImageName()" :class="hand.roundWind.getCssClasses()"></div>
      <div><img :src="hand.seatWind.getImageName()" :class="hand.seatWind.getCssClasses()"></div>
      <div>
        <template v-for="doraIndicator in hand.doraIndicators" :key="doraIndicator">
          <img :src="doraIndicator.getImageName()" :class="doraIndicator.getCssClasses()">
        </template>
      </div>
      <div>
        <template v-if="hand.uraDoraIndicators" v-for="uraDoraIndicator in hand.uraDoraIndicators" :key="doraIndicator">
          <img :src="uraDoraIndicator.getImageName()" :class="uraDoraIndicator.getCssClasses()">
        </template>
        <template v-if="!hand.uraDoraIndicators.length">
          нет
        </template>
      </div>
      <div>
        <div class="grid grid-cols-1">
          <div>Риичи: {{ hand.isRiichi ? 'да' : 'нет' }}</div>
          <div>Цумо: {{ hand.isTsumo ? 'да' : 'нет' }}</div>
        </div>
      </div>
    </div>
    <div class="text-center w-full pt-4">
      <UButton loading-auto color="secondary" @click="getNextGameResult()">Следующий результат</UButton>
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
div.winning-parameters {
  border: this solid gray;
}
div.winning-parameters div {
  margin: 5px;
  text-align: center;
}
</style>