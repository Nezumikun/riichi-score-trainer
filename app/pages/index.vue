<script setup lang="ts">
  import { useTemplateRef, onMounted } from 'vue'

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
    inputDisabled : boolean = false
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
  const trainingSettings = ref<TrainingSettings>(new TrainingSettings)
  const inputHan = useTemplateRef("inputHan")
  const inputFu = useTemplateRef("inputFu")
  const inputPoints = useTemplateRef("inputPoints")

  onMounted(async () => {
    const settings = localStorage.getItem('training_settings')
    if (settings !== null) {
      trainingSettings.value = JSON.parse(settings)
    }
    await getNextGameResult()
  })
  
  async function getNextGameResult() : Promise<void> {
    const fetchData = await $fetch<TenhouHandRequest>('/api/getRandomTehnouHand')
    tenhouHandRequest.value = fetchData
    if (fetchData.tenhouHand !== null) {
      hand.value.parseTehnouHandRequest(fetchData)
      const sp = showParameters.value;
      sp.tip = false
      sp.checkButton = true
      sp.tipButton = false
      sp.inputDisabled = false
      sp.answers = new ShowParametersAnswers()
      inputAnswer.value = new InputAnswer()
      nextTick(() => {
        inputHan.value?.inputRef?.focus()
      })
    }
  }

  function checkAnswer() : void {
    const points : HandPoints = hand.value.winningDetails.getHandPoints();
    const hv = hand.value.winningDetails;
    const sp = showParameters.value;
    sp.answers.han = hv.han.toString()
    sp.answers.hanIsRight = (hv.han === parseInt(inputAnswer.value.han))
    sp.answers.fu = hv.fu.toString()
    sp.answers.fuIsRight = (hv.fu === parseInt(inputAnswer.value.fu))
    sp.answers.points = ((!hv.isDealer && hv.isTsumo) ? (points.fromDealer.toString() + "/") : "") +  points.fromNonDealer.toString();
    sp.answers.pointsIsRight = ((sp.answers.points === inputAnswer.value.points) || trainingSettings.value.checkOnlyHanAndFu)
    sp.tipButton = !trainingSettings.value.autoShowYakuAndFu
    sp.tip = trainingSettings.value.autoShowYakuAndFu
    sp.checkButton = false
    sp.inputDisabled = true
  }

  function showTip() : void {
    showParameters.value.tip = true
    showParameters.value.tipButton = false
  }

  function jumpToInputFu() {
    inputFu.value?.inputRef?.focus()    
  }

  function jumpToInputPoints() {
    if (trainingSettings.value.checkOnlyHanAndFu) {
      checkAnswer()
    } else {
      inputPoints.value?.inputRef?.focus()    
    }
  }

  function saveTrainingSettings() {
    localStorage.setItem('training_settings', JSON.stringify(trainingSettings.value))
  }
</script>

<template>
  <div class="lg:p-10">
    <template v-if="hand.tiles.hand.length">
      <HandView :hand="hand.tiles" :carelessly="trainingSettings.carelessly"/>
      <WinningParameters :parameters="hand.winningParameters" />
      <div class="grid grid-cols-2 lg:grid-flow-col pt-8 w-fit min-w-1/2 gap-4 mx-auto">
        <div>
          <div>{{ $t("Han") }}</div>
          <UInput ref="inputHan" v-model="inputAnswer.han" :disabled="showParameters.inputDisabled" @keyup.enter="jumpToInputFu">
            <template #trailing>
              <div :class="showParameters.answers.hanCssClass" role="status">{{ showParameters.answers.han }}</div>
            </template>
          </UInput>
        </div>
        <div>
          <div>{{ $t("Fu") }}</div>
          <UInput ref="inputFu" v-model="inputAnswer.fu" :disabled="showParameters.inputDisabled" @keyup.enter="jumpToInputPoints">
            <template #trailing>
              <div :class="showParameters.answers.fuCssClass" role="status">{{ showParameters.answers.fu }}</div>
            </template>
          </UInput>
        </div>
        <div v-if="!trainingSettings.checkOnlyHanAndFu" class="col-span-2 md:col-span-1">
          <div>{{ $t("Points") }}
            <UTooltip :text="$t('tooltip_points')">
              <UIcon name="i-lucide-circle-help" />
            </UTooltip>
          </div>
          <UInput ref="inputPoints" v-model="inputAnswer.points" class="w-full" :disabled="showParameters.inputDisabled" @keyup.enter="checkAnswer">
            <template #trailing>
              <div :class="showParameters.answers.pointsCssClass" role="status">{{ showParameters.answers.points }}</div>
            </template>
          </UInput>
        </div>
      </div>
      <div class="text-center w-full">
        <UButton v-if="showParameters.checkButton" class="mx-4 mt-4" color="secondary" @click="checkAnswer">{{ $t('check_answer') }}</UButton>
        <UButton v-if="showParameters.tipButton" class="mx-4 mt-4" color="secondary" @click="showTip">{{ $t('show_tip') }}</UButton>
        <UButton class="mx-4 mt-4" loading-auto color="secondary" @click="getNextGameResult">{{ $t('next_hand') }}</UButton>
      </div>
      <WinningDetails v-if="showParameters.tip" :details="hand.winningDetails" :show-points="trainingSettings.showPoints" :points="showParameters.answers.points" />
      <div class="pt-4 mx-auto w-fit">
        <div>
          <span class="font-semibold"><UIcon name="i-lucide-settings" /> {{ $t('settings') }}</span>
        </div>
        <div>
          <UCheckbox v-model="trainingSettings.autoShowYakuAndFu" :label="$t('settings_autoyaku')" @update:model-value="saveTrainingSettings" />
        </div>
        <div>
          <UCheckbox v-model="trainingSettings.showPoints" :label="$t('settings_show_points')" @update:model-value="saveTrainingSettings" />
        </div>
        <div>
          <UCheckbox v-model="trainingSettings.checkOnlyHanAndFu" :label="$t('settings_check_only_han_and_fu')" @update:model-value="saveTrainingSettings" />
        </div>
        <div>
          <UCheckbox v-model="trainingSettings.carelessly" :label="$t('settings_carelessly')" @update:model-value="saveTrainingSettings" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.answer-right {
  color: darkgreen;
}
.answer-wrong {
  color: red;
}
</style>