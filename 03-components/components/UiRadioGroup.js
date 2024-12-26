import { defineComponent } from 'vue/dist/vue.esm-browser.js'

export default defineComponent ({
  name: 'UiRadioGroup',

  props: {

    options: {
      type: Array,
      required: true,
    },

    modelValue: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  template: `
    <div class="radio-group">
      <div v-for="option in options" class="radio-group__button">
        <input
          :id="'radio-buttons_date_' + option.value"
          class="radio-group__input"
          type="radio"
          name="date"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', $event.target.value)"
        />
        <label :for="'radio-buttons_date_' + option.value" class="radio-group__label">{{ option.label }}</label>
      </div>
    </div>`
})
