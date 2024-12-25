import { defineComponent } from 'vue/dist/vue.esm-browser.js'
import MeetupCard from "./MeetupCard.js";

export default defineComponent({
  name: 'MeetupsList',

  components: {
    MeetupCard,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
},

  template: `
    <ul class="meetups-list">
      <li v-for="meetup in meetups" class="meetups-list__item">
        <MeetupCard :meetup />
      </li>
          </ul>`
})

