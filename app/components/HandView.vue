<script setup lang="ts">
import TileImage from './TileImage.vue';

const props = defineProps<{
  hand : TilesInHand
}>()
</script>

<template>
  <div class="text-center w-full">
    <div class="hand">
      <template v-for="tile in props.hand.hand" :key="tile">
        <TileImage :tile="tile" />
      </template>
      <div class="tile-winning">
        <TileImage :tile="props.hand.winningTile" />
      </div>
      <div class="melds">
        <template v-for="meld in props.hand.melds">
          <template v-for="tile in meld" :key="tile">
            <TileImage :tile="tile" />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
  div.tile-winning {
    padding-left: 10px;
    display: inline-block;
  }
  div.melds {
    padding-left: 10px;
    display: inline-block;
  }
  div.hand {
    display: inline-block;
  }
</style>
