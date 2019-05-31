<template>
  <div class="results">
    <span
      v-if="counter"
      class="resultsCount"
    >
      {{ counter }} Providers
    </span>
    <ul id="pdDisplay">
      <li
        v-for="(record, index) in provdata"
        v-if="resultsFilter(record, filter)"
        :item="record.FullName + [index]"
        :key="index"
      >
        <div class="card">
          <router-link :to="{ name: 'Provider', params: { record } }">
            <img :src="record.Facilities[0].MapImageURL">
            <div class="cardInfo">
              <span class="pType">{{ record.ProviderTypesCombined }}</span>
              <h4>{{ record.FullName }}</h4>
              <div
                v-for="(Location, index) in record.Facilities"
                :item="index"
                :key="index"
              >
                <p class="address">{{ Location.Address1 }} {{ Location.Address2 }} {{ Location.City }} {{ Location.State }} {{ Location.Zip }}</p>
                <p class="phone">{{ Location.Phone1 }}</p>
              </div>
              <p class="label">Specialties:</p>
              <p class="subText">{{ record.SpecialtiesCombined }}</p>
              <div v-if="record.Gender">
                <p class="label">Gender:</p>
                <p
                  v-if="record.Gender === 'F'"
                  class="subText"
                >
                  Female
                </p>
                <p
                  v-else-if="record.Gender === 'M'"
                  class="subText"
                >
                  Male
                </p>
              </div>
              <p v-if="record.Facilities[0].AcceptingNewPatients">Accepting New Patients</p>
              <p
                v-if="Number((record.Distance).toFixed(2)) > 1"
                class="distance"
              >
                {{ Number((record.Distance).toFixed(2)) }} Miles Away
              </p>
              <p
                v-else-if="Number((record.Distance).toFixed(2)) < 1"
                class="distance"
              >
                Less than a mile away
              </p>
            </div>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    provdata: {
      type: Array,
      default: function () { return [] }
    },
    filter: {
      type: Array,
      default: function () { return [] }
    }
  },
  data: function () {
    return {
      filterGroup: {},
      counter: 0
    }
  },
  watch: {
    filterGroup: function () {
      var items = document.getElementsByClassName("card")
      var i = 1
      var num
      for (i = 1; i <= items.length; i++) {
        num = i
      }
      this.counter = num
    }
  },
  methods: {
    resultsFilter (record, filter) {
      this.filterGroup = []
      let filterGroup
      filter = this.filter
      if (filter) {
        var filterLoop = Object.keys(filter)
        filterLoop.forEach(filterLoop => {
          if (filterLoop === 'All') {
            filterGroup = (record.ProviderTypesCombined)
          } else {
            var filterKey = record[filterLoop]
            filterGroup = (filterKey === filter[filterLoop])
          }
        })
      } else {
        filterGroup = (record.ProviderTypesCombined)
      }
      return filterGroup
    }
  }
}
</script>
