<script setup lang="ts">
  const { data } = await $fetch('/api/getRandomHand')
  console.log(data)
  const handArray = Tile.parseString(data.hand);
  const melds: Tile[][] = [];
  for (const meld of data.melds) {
    melds.push(Tile.parseString(meld));
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