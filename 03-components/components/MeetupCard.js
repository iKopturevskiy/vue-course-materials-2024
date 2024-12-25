import { defineComponent, computed, toRefs } from 'vue/dist/vue.esm-browser.js'

function formatAsIsoDate(timestamp) {
  return new Date(timestamp).toISOString()
}

function formatAsLocalDate(timestamp) {
  return new Date(timestamp).toLocaleString(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default defineComponent ({
  name: 'MeetupCard',

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { meetup } = toRefs(props)

    const isoDate = computed(() => formatAsIsoDate(meetup.value.date))
    const localDate = computed(() => formatAsLocalDate(meetup.value.date))

    return {
      meetup,
      isoDate,
      localDate,
    }
  },

  template: `
    <a :href="\`/meetups/\${meetup.id}\`" class="meetups-list__item-link" tabindex="0">
      <article class="meetup-card card">
        <div class="card__col">
          <div class="card__cover" :style="meetup.image && { '--bg-url': \`url('\${meetup.image}')\` }">
            <header>{{ meetup.title }}</header>
          </div>
        </div>
        <div class="card__col">
          <div class="card__content">
            <span v-if="meetup.organizing" class="meetup-card__badge badge badge--success">Организую</span>
            <span v-else-if="meetup.attending" class="meetup-card__badge badge badge--primary">Участвую</span>
            <span v-if="false">{{ meetup.notAFunction('Я никогда не буду вызыван') }}</span>
            <ul class="meetup-info">
              <li class="meetup-info__item">
                <img class="meetup-info__icon icon" src="../node_modules/@shgk/vue-course-ui/dist/meetups/assets/icons/icon-user.svg" alt=""/>
                {{ meetup.organizer }}
              </li>
              <li class="meetup-info__item">
                <img class="meetup-info__icon icon" src="../node_modules/@shgk/vue-course-ui/dist/meetups/assets/icons/icon-map.svg" alt=""/>
                {{ meetup.place }}
              </li>
              <li class="meetup-info__item">
                <img class="meetup-info__icon icon" src="../node_modules/@shgk/vue-course-ui/dist/meetups/assets/icons/icon-cal-lg.svg" alt=""/>
                <time :datetime="isoDate">{{ localDate }}</time>
              </li>
            </ul>
          </div>
        </div>
      </article>
        </a>`
})
