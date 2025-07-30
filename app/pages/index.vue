<script setup lang="ts">
  const handArray = ref<Tile[]>([]);
  const melds = ref<Tile[][]>([]);
  const winningTile = ref<Tile>(new Tile("", ""));
  const GUID = ref("");
  await getNextGameResult();
  
  async function getNextGameResult() {
    const fetchData = await $fetch<GameResultRequest>('/api/getRandomGameResult')
    console.log(fetchData)
    if (fetchData.data !== null) {
      const gameResult : GameResult = fetchData.data
      GUID.value = fetchData.fileName.replace('.json', '');
      const _winingTile : Tile = Tile.parseString(gameResult.winningTile)[0]!;
      const hand : Tile[] = Tile.parseString(gameResult.hand)
      const winingIndex = hand.findLastIndex(item => ((item.suit === _winingTile.suit) && (item.nominal === _winingTile.nominal)))
      if (winingIndex > -1) {
        hand.splice(winingIndex, 1);
      }
      handArray.value = hand;
      melds.value = []
      for (const meld of gameResult.melds) {
        melds.value.push(Tile.parseString(meld));
      }
      winningTile.value = _winingTile
    }
  }
</script>

<template>
  <div class="main">
    <h1>
      Index {{ GUID }}
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
        <template v-for="tile in handArray">
          <img :src="tile.getImageName()" :class="tile.getCssClasses()" />
        </template>
      </div>
      <div class="tile-winning">
        <img :src="winningTile.getImageName()" class="tile tile-winning" />
      </div>
      <div class="melds">
        <template v-for="meld in melds">
          <template v-for="tile in meld">
            <img :src="tile.getImageName()" :class="tile.getCssClasses()" />
          </template>
        </template>
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
  margin-left: 11px;
  margin-right: 11px;
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
div.main {
  /* background-color: gainsboro; */
}
</style>