<script setup lang="ts">
  import { useTemplateRef } from 'vue'
  class ShowParametersWinning {
    showUradora : boolean = false
    get winningCssClass() : string[] {
      return [
        'winning-parameters', 'grid', (this.showUradora) ? 'grid-cols-5' : 'grid-cols-4', 'pt-8', 'w-fit', 'min-w-1/2', 'gap-4', 'mx-auto'
      ]
    }
  }

  class ShowParametersAnswers {
    han : string = "";
    hanIsRight : boolean = false;
    fu : string = "";
    fuIsRight : boolean = false;
    points : string = "";
    pointsIsRight : boolean = false;

    private baseCssClass() : string[] {
      return ['text-sm', 'tabular-nums']
    }

    get hanCssClass() : string[] {
      return this.baseCssClass().concat([this.hanIsRight ? 'answer-right' : 'answer-wrong'])
    }
    get fuCssClass() {
      return this.baseCssClass().concat([this.fuIsRight ? 'answer-right' : 'answer-wrong'])
    }
    get pointsCssClass() {
      return this.baseCssClass().concat([this.pointsIsRight ? 'answer-right' : 'answer-wrong'])
    }
  }

  class ShowParameters {
    tip : boolean = false
    tipButton : boolean = false
    checkButton : boolean = false
    winning : ShowParametersWinning = new ShowParametersWinning()
    answers : ShowParametersAnswers = new ShowParametersAnswers()
  }

  class InputAnswer {
    han : string = ""
    fu : string = ""
    points : string = ""
    pointsFromDealer : string = ""
  }

  const hand = ref<Hand>(new Hand())
  const tenhouHandRequest = ref<TenhouHandRequest>()
  const showParameters = ref<ShowParameters>(new ShowParameters())
  const inputAnswer = ref<InputAnswer>(new InputAnswer())
  const inputHan = useTemplateRef("inputHan")
  
  async function getNextGameResult() : Promise<void> {
    const fetchData = await $fetch<TenhouHandRequest>('/api/getRandomTehnouHand')
    tenhouHandRequest.value = fetchData
    if (fetchData.tenhouHand !== null) {
      hand.value.parseTehnouHandRequest(fetchData)
      const sp = showParameters.value;
      sp.winning.showUradora = hand.value.uraDoraIndicators.length > 0
      sp.tip = false
      sp.checkButton = true
      sp.tipButton = false
      sp.answers = new ShowParametersAnswers()
      inputAnswer.value = new InputAnswer()
      nextTick(() => {
        inputHan.value?.inputRef?.focus()
      })
      console.log('points', hand.value.getHandPoints())
    }
  }

  function checkAnswer() : void {
    const points : HandPoints = hand.value.getHandPoints();
    const hv = hand.value;
    const sp = showParameters.value;
    sp.answers.han = hv.han.toString()
    sp.answers.hanIsRight = (hv.han === parseInt(inputAnswer.value.han))
    sp.answers.fu = hv.fu.toString()
    sp.answers.fuIsRight = (hv.fu === parseInt(inputAnswer.value.fu))
    sp.answers.points = ((!hv.isDealer && hv.isTsumo) ? (points.fromDealer.toString() + "/") : "") +  points.fromNonDealer.toString();
    sp.answers.pointsIsRight = (sp.answers.points === inputAnswer.value.points)
    sp.tipButton = true
    sp.checkButton = false
  }

  function showTip() : void {
    showParameters.value.tip = true
    showParameters.value.tipButton = false
  }
</script>

<template>
  <div class="p-10">
    <template v-if="hand.hand.length">
      <h1 class="text-3xl text-center">
        {{ hand.GUID }}
      </h1>
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
      <div :class="showParameters.winning.winningCssClass">
        <div>{{ $t("wind_of_round") }}</div>
        <div>{{ $t("wind_of_seat") }}</div>
        <div>{{ $t("dora_indicator") }}</div>
        <div v-if="showParameters.winning.showUradora">{{ $t("uradora_indicator") }}</div>
        <div>{{ $t("winning_parameters") }}</div>
        <div><img :src="hand.roundWind.getImageName()" :class="hand.roundWind.getCssClasses()"></div>
        <div><img :src="hand.seatWind.getImageName()" :class="hand.seatWind.getCssClasses()"></div>
        <div>
          <template v-for="doraIndicator in hand.doraIndicators" :key="doraIndicator">
            <img :src="doraIndicator.getImageName()" :class="doraIndicator.getCssClasses()">
          </template>
        </div>
        <div v-if="showParameters.winning.showUradora">
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
      <div class="grid grid-cols-3 pt-8 w-fit min-w-1/2 gap-4 mx-auto">
        <div>{{ $t("Han") }}</div>
        <div>{{ $t("Fu") }}</div>
        <div>{{ $t("Points") }}</div>
        <div>
          <UInput ref="inputHan" v-model="inputAnswer.han">
            <template #trailing>
              <div :class="showParameters.answers.hanCssClass" role="status">{{ showParameters.answers.han }}</div>
            </template>
          </UInput>
        </div>
        <div>
          <UInput v-model="inputAnswer.fu">
            <template #trailing>
              <div :class="showParameters.answers.fuCssClass" role="status">{{ showParameters.answers.fu }}</div>
            </template>
          </UInput>
        </div>
        <div>
          <UInput v-model="inputAnswer.points">
            <template #trailing>
              <div :class="showParameters.answers.pointsCssClass" role="status">{{ showParameters.answers.points }}</div>
            </template>
          </UInput>
        </div>
      </div>
    </template>
    <div class="text-center w-full pt-4">
      <UButton v-if="showParameters.checkButton" class="mx-4" color="secondary" @click="checkAnswer">{{ $t('check_answer') }}</UButton>
      <UButton v-if="showParameters.tipButton" class="mx-4" color="secondary" @click="showTip">{{ $t('show_tip') }}</UButton>
      <UButton class="mx-4" loading-auto color="secondary" @click="getNextGameResult">{{ $t('next_hand') }}</UButton>
    </div>
    <div v-if="showParameters.tip" class="winning-details grid grid-cols-2 pt-8 w-fit min-w-1/2 gap-4 mx-auto">
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
div.winning-parameters div {
  margin: 5px;
  text-align: center;
}
div.winning-details-summary {
  border-top: 1px solid white;
}
.answer-right {
  color: darkgreen;
}
.answer-wrong {
  color: red;
}
</style>