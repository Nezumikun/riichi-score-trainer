<script setup lang="ts">
const props = defineProps<{
  tile : Tile
}>()
</script>

<template>
  <img :src="props.tile.getImageName()" :class="props.tile.getCssClasses()">
</template>

<style scoped>
  img.tile {
    display: inline-block;
    padding: 2px;
    width: 45px;
    background-color: white;
    border-radius: 12px;
    border: thin solid grey;
    @media (width >= 64rem) {
      width: 70px;
    }
  } 
  img.tile-called {
    transform: rotate(90deg) translate(12%) scale(0.99);
    margin-left: 6px;
    margin-right: 6px;
    @media (width >= 64rem) {
      transform: rotate(90deg) translate(17%);
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  img.tile-promoted {
    margin-top: -140px;
    margin-left: -80px;
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
</style>
