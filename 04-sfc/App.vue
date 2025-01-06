<script>
import {ref} from 'vue'
import UiContainer from './components/UiContainer.vue'
import UiButton from './components/UiButton.vue'
import UiButtonGroup from "./components/UiButtonGroup.vue";
import UiRadioGroup from "../05-ts/components/UiRadioGroup.vue";

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
    return {
      view
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
          <UiRadioGroup
            v-model="selected"
            :options="[{ label: 'One', value: '1' }, { label: 'Two', value: '2' }]" />
        </p>
      </UiContainer>
    </div>
  </div>
</template>

<style scoped >
</style>
