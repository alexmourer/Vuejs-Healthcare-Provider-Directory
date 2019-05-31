<template>
  <div class="dashboard">
    <div id="searchWrap">
      <h3>Where would you like to search?</h3>
      <div class="inner-addon">
        <svg
          class="search-svg"
          viewBox="0 0 320 70"
          data-init="M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M197,67 181.21,51.21"
          data-mid="M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M179.5,49.5 179.5,49.5"
          data-active="M27,3 L293,3 a27,27 0 0,1 0,54 L27,57 a27,27 0 0,1 0,-54 M179.5,49.5 179.5,49.5"
        >
          <path
            class="search-svg__path"
            d="M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M197,67 181.21,51.21"
          ></path>
        </svg>
        <input
          ref="autocomplete"
          v-model="location"
          class="search"
          placeholder="Try 'Miami, FL'"
          type="text"
          @keyup.enter="locSearch();"
        >
      </div>
    </div>
    <div v-if="loading">
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle
            class="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="3"
            stroke-miterlimit="10"
          ></circle>
        </svg>
      </div>
    </div>
    <dashboard v-if="searched && !loading" :provdata="provdata" @filterkey="updateFilter"/>
    <Results v-if="!loading" :provdata="provdata" :filter="childFilter"/>
  </div>
</template>
<script
  type="text/javascript"
  src="//maps.googleapis.com/maps/api/js?key=AIzaSyBubPdO6hJrxaaMmVDT3ejPHZxu_icreYA&libraries=places"
></script>
<script>
import Dashboard from "../components/Search/Dashboard";
import Results from "../components/Search/Results";

export default {
  components: {
    Dashboard,
    Results
  },
  data: function() {
    return {
      provdata: [],
      fkey: "",
      childFilter: null,
      location: null,
      lat: null,
      long: null,
      searched: false,
      loading: false
    };
  },
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", () => {
      let place = this.autocomplete.getPlace();
      let address = place.formatted_address;
      this.location = address;
    });
  },
  methods: {
    dataFetch: function() {},
    locSearch: function() {
      this.loading = true;
      var address = this.location;
      // Initialize the Geocoder
      var geoCoderURL =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        ",&key=AIzaSyBubPdO6hJrxaaMmVDT3ejPHZxu_icreYA";
      fetch(geoCoderURL, {
        method: "POST"
      })
        .then(res => res.json())
        // Changed for demo purposes
        .then(res => {
          let currentPosition = res.results[0].geometry.location;
          var lat = currentPosition.lat;
          var long = currentPosition.lng;
          // var serviceID = "103e9352-0535-453d-861d-b278cfdf00d7";
          // var siteID = "34d790f3-4f8b-449d-ae98-6667fe78c9ea";
          var apiURL =
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1585086/pd.json";
          fetch(apiURL)
            .then(res => res.json())
            .then(res => {
              console.log(res);
              this.provdata = res.Records;
              this.loading = false;
              this.searched = true;
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },
    updateFilter(variable) {
      this.childFilter = variable;
    }
  }
};
</script>
