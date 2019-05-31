<template>
  <div>
    <div
      :class="{modal:popup}"
      class="whiteOut"
      @click="popup = !popup"
    />
    <h3>
      What can we help you find?
    </h3>
    <!-- Provider Type -->
    <div class="filterGroup">
      <button
        v-for="(type, index) in singlePT"
        :item="type"
        :key="index"
        :class="{active:type == selected}"
        @click="selected = type; filterHelp(filkey, type); showSpecialty = !showSpecialty"
      >
        {{ type }}
      </button>
      <button @click="selected = 'blank'; subSelected = 'blank'; filterHelp('All', '')">All</button>
    </div>
    <!-- Sub Filter Section -->
    <div class="subFilter">
      <div
        v-if="ptFilter"
        class="filterSecondary">
        <div class="subFilter_controls">
          <!-- Loop Through `includedFilters` Array -->
          <li
            v-for="(subFilter, index) in filterLabels"
            :item="subFilter"
            :key="index"
            :class="{active:subFilter == showSpecialty }"
            @click="showSpecialty = subFilter; popup = !popup"
          >
            {{ subFilter }}
            <div
              v-if="popup"
              class="specialtyMenu"
            >
              <!-- Display Possible Filtering Options -->
              <li
                v-for="(specialty, index) in singleSpec"
                :item="specialty"
                :key="index"
                :class="{active:specialty == subSelected }"
                @click="subSelected = specialty; filterHelp(showSpecialty, specialty)"
              >
                <span v-if="specialty === subSelected">
                  <svg
                    class="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                  >
                    <path
                      class="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                </span>
                <span
                  v-else
                  class="emptyCheck"
                />
                <span class="specialtyItem">{{ specialty }}</span>
              </li>
            </div>
          </li>
          <li class="subLabel">Name</li>
          <li class="subLabel">More Filters</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    provdata: {
      type: Array,
      default: function () { return [] }
    },
    filterKey: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      ptFilter: '',
      selected: null,
      subSelected: null,
      subFilter: null,
      showSpecialty: null,
      popup: false,
      fkey: '',
      filterGroup: [],
      filkey: 'ProviderTypesCombined',
      includedFilters: ['SpecialtiesCombined', 'LanguagesCombined', 'Gender', 'ServicesCombined']
    }
  },
  computed: {
    singlePT: function () {
      var filteredArray = []
      var dataKey = this.filkey
      for (var i = 0; i < this.provdata.length; i++) {
        var filterSpec = this.provdata[i][dataKey]
        if (filteredArray.indexOf(filterSpec) === -1) {
          filteredArray.push(filterSpec)
        }
      }
      return filteredArray
    },
    filterLabels: function () {
      var includedArray = []
      for (let i = 0; i < this.includedFilters.length; i++) {
        let thisFilter = this.includedFilters[i]
        for (let n = 0; n < this.provdata.length; n++) {
          if (this.provdata[n].ProviderTypesCombined === this.ptFilter) {
            if (this.provdata[n][thisFilter].length >= 1) {
              if (includedArray.indexOf(thisFilter) === -1) {
                if (thisFilter === 'SpecialtiesCombined') {
                  includedArray.push(thisFilter)
                } else {
                  includedArray.push(thisFilter)
                }
              }
            }
          }
        }
      }
      return includedArray
    },
    singleSpec: function () {
      var filteredArray = []
      var dataKey = this.showSpecialty
      for (var i = 0; i < this.provdata.length; i++) {
        if (this.provdata[i].ProviderTypesCombined === this.ptFilter) {
          if (this.provdata[i][dataKey] !== '') {
            if (filteredArray.indexOf(this.provdata[i][dataKey]) === -1) {
              filteredArray.push(this.provdata[i][dataKey])
            }
          }
        }
      }
      return filteredArray
    }
  },
  methods: {
    filterHelp: function (type, value) {
      if (type === this.filkey) {
        this.ptFilter = value
        this.filterGroup = []
        this.$set(this.filterGroup, type, value)
        this.$emit('filterkey', this.filterGroup)
      } else if (type === 'All') {
        this.ptFilter = value
        this.filterGroup = []
        this.$set(this.filterGroup, type, value)
        this.$emit('filterkey', this.filterGroup)
      } else {
        this.$set(this.filterGroup, type, value)
        this.$emit('filterkey', this.filterGroup)
      }
    }
  }
}
</script>
