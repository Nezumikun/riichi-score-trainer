<script setup lang="ts">
const props = defineProps({
  tile : {
    type: Tile,
    default: new Tile('', '')
  },
  carelessly : {
    type: Boolean,
    default: false
  }
})

function getCssClasses() : string[] {
  const cssClasses = []
  if (props.carelessly) {
    if (Math.random() >= 0.5) {
      cssClasses.push('carelessly')
      console.log('carelessly')
    }
  }
  return cssClasses
}
</script>

<template>
  <span :class="getCssClasses()">
    <img :src="props.tile.getImageName()" :class="props.tile.getCssClasses()">
  </span>
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
  .winning-parameters img.tile {
    @media (width >= 64rem) {
      width: 50px;
    }
  } 
  img.tile-called {
    transform: rotate(90deg) translate(12%) scale(0.99);
    margin-left: 6px;
    margin-right: 6px;
    @media (width >= 64rem) {
      transform: rotate(90deg) translate(17%) scale(0.99);
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .carelessly img.tile {
    transform: rotate(180deg) scale(1);
  }
  .carelessly img.tile-called {
    transform: rotate(270deg) translate(-12%) scale(.99);
    @media (width >= 64rem) {
      transform: rotate(270deg) translate(-17%) scale(.99);
    }
  }
  img.tile-promoted {
    margin-top: -140px;
    margin-left: -80px;
  }
  .tile-winning img {
    border: medium solid red;
  }
  .dora-list img {
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
