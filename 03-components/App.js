import PageMeetups from "./components/PageMeetups.js";
import { defineComponent } from 'vue/dist/vue.esm-browser.js'

export default defineComponent({
  name: 'App',

  components: {
    PageMeetups,
  },

  template: `
  <PageMeetups />`
})
