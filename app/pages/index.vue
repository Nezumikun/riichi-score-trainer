<script setup lang="ts">
import { UButton } from '#components';

  let handArray = ref<Tile[]>([]);
  let melds = ref<Tile[][]>([]);
  await getNextGameResult();
  
  async function getNextGameResult() {
    const fetchData = await $fetch<GameResultRequest>('/api/getRandomGameResult')
    console.log(fetchData)
    if (fetchData.data !== null) {
      const gameResult : GameResult = fetchData.data
      handArray.value = Tile.parseString(gameResult.hand);
      melds.value = []
      for (const meld of gameResult.melds) {
        melds.value.push(Tile.parseString(meld));
      }
    }
  }
</script>

<template>
  <div class="main">
    <h1>
      Index
    </h1>
    <div>
    {{ JSON.stringify(handArray) }} {{ JSON.stringify(melds) }}
    </div>
    <div>
      <div class="hand">
        <template v-for="tile in handArray">
          <img :src="tile.getImageName()" :class="tile.getCssClasses()" />
        </template>
      </div>
      <template v-for="meld in melds">
        <div class="meld">
          <template v-for="tile in meld">
            <img :src="tile.getImageName()" :class="tile.getCssClasses()" />
          </template>
        </div>
      </template>
    </div>
    <div>
      <UButton loading-auto color="secondary" @click="getNextGameResult()">Следующий результат</UButton>
    </div>
  </div>
</template>

<style scoped>
img.tile {
  display: inline-block;
  padding: 2px;
  width: 80px;
  background-color: white;
  border-radius: 10px;
  border-color: Gray;
  border: thin solid grey;
} 
img.tile-called {
  transform: rotate(90deg) translate(17%);
  margin-left: 11px;
  margin-right: 11px;
}
div.meld {
  padding-left: 10px;
  display: inline-block;
}
div.hand {
  display: inline-block;
}
div.main {
  background-color: gainsboro;
}
</style>