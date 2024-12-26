import { defineComponent, ref, computed, onMounted } from 'vue/dist/vue.esm-browser.js'
import MeetupsList from "./MeetupsList.js";
import MeetupsCalendar from "./MeetupsCalendar.js";
import UiButtonGroup from "./UiButtonGroup.js"
import UiRadioGroup from "./UiRadioGroup.js";

async function fetchMeetups() {
  const response = await fetch('https://course-vue.javascript.ru/api/meetups')
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }
  return result
}

export default defineComponent({
  name: 'PageMeetups',
  components: {
    UiRadioGroup,
    UiButtonGroup,
    MeetupsCalendar,
    MeetupsList,
  },

  setup() {
    const dateFilterOptions = [
      {value: 'all', label: 'Все'},
      {value: 'past', label: 'Прошедшие'},
      {value: 'future', label: 'Ожидаемые'},
    ]

    const view = ref('list')
    const filters = ref({
      date: 'all',
      participation: 'all',
      query: '',
    })

    const meetups = ref(null)

    const filteredMeetups = computed(() => {
      const dateFilter = (meetup) =>
        filters.value.date === 'all' ||
        (filters.value.date === 'past' && new Date(meetup.date) <= new Date()) ||
        (filters.value.date === 'future' && new Date(meetup.date) > new Date())

      const participationFilter = (meetup) =>
        filters.value.participation === 'all' ||
        (filters.value.participation === 'organizing' && meetup.organizing) ||
        (filters.value.participation === 'attending' && meetup.attending)

      const searchFilter = (meetup) =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(' ')
          .toLowerCase()
          .includes(filters.value.query.toLowerCase())

      return meetups.value.filter((meetup) => dateFilter(meetup) && participationFilter(meetup) && searchFilter(meetup))
    })

    onMounted(async () => {
      try {
        meetups.value = await fetchMeetups()
      } catch (error) {
        console.error(error)
      }
    })

    return {
      view,
      filters,
      meetups,
      filteredMeetups,
      dateFilterOptions,
    }
  },

  template: `
    <div class="container">
      <div class="filters-panel">
        <div class="filters-panel__col">
          <UiRadioGroup
            :options="dateFilterOptions"
            v-model="filters.date"
          />
        </div>

        <div class="filters-panel__col">
          <div class="form-group form-group--inline">
            <div class="input-group input-group_icon input-group_icon-left">
              <div class="input-group__icon">
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="icon">
                  <g stroke="#8ca0cf" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="m11 19c4.4183 0 8-3.5817 8-8 0-4.41828-3.5817-8-8-8-4.41828 0-8 3.58172-8 8 0 4.4183 3.58172 8 8 8z"/>
                    <path d="m20.9999 21-4.35-4.35"/>
                  </g>
                </svg>
              </div>
              <input
                class="form-control form-control--rounded form-control--sm"
                aria-label="Поиск"
                placeholder="Поиск"
                type="search"
                v-model.trim="filters.query"
              />
            </div>
          </div>
          <div class="form-group form-group--inline">
            <UiButtonGroup :view @change="view = $event" />
          </div>
        </div>
      </div>

      <template v-if="meetups !== null">
        <template v-if="filteredMeetups.length">
          <MeetupsList v-if="view === 'list'" :meetups="filteredMeetups"/>
          <MeetupsCalendar :meetups="filteredMeetups" v-else-if="view === 'calendar'"/>
        </template>
        <div v-else class="alert">Митапов по заданным условиям не найдено...</div>
      </template>
      <div v-else class="alert">Загрузка...</div>

    </div>
  `,
})
