<script>
import {ref} from 'vue'
import UiContainer from './components/UiContainer.vue'
import UiButton from './components/UiButton.vue'
import UiButtonGroup from "./components/UiButtonGroup.vue";
import UiRadioGroup from "../04-sfc/components/UiRadioGroup.vue";

export default {
  name: 'App',

  components: {
    UiRadioGroup,
    UiButtonGroup,
    UiButton,
    UiContainer,
  },

  setup () {
    const view = ref('list')
    const selected = ref('1')
    const options = ref([
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' }
    ])
    return {
      view,
      selected,
      options
    }
  },
}
</script>

<template>
  <div class="wrapper">
    <div class="main">
      <UiContainer>
        <h2>Buttons</h2>
        <p>
          <button class="button button--secondary">HTMLButton</button>
        </p>
        <p>
          <UiButton>UiButton</UiButton>
        </p>

        <h2>UiButtonGroup</h2>
        <p>
          <UiButtonGroup color="var(--red)" v-model:view="view"/>
        </p>

        <h2>UiRadioGroup</h2>
        <p>
          <UiRadioGroup :button-classes="$style['green-button']" v-model="selected" :options/>
        </p>
      </UiContainer>
    </div>
  </div>
</template>

<style module>
.green-button {
  color: var(--green);
}
</style>
