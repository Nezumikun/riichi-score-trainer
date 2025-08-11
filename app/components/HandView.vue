<script setup lang="ts">
const props = defineProps<{
  hand : TilesInHand
}>()
</script>

<template>
  <div class="text-center w-full">
    <div class="hand">
      <template v-for="tile in props.hand.hand" :key="tile">
        <img :src="tile.getImageName()" :class="tile.getCssClasses()">
      </template>
    </div>
    <div class="tile-winning">
      <img :src="props.hand.winningTile.getImageName()" class="tile tile-winning">
    </div>
    <div class="melds">
      <template v-for="meld in props.hand.melds">
        <template v-for="tile in meld" :key="tile">
          <img :src="tile.getImageName()" :class="tile.getCssClasses()">
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/shared/tile.css';
</style>