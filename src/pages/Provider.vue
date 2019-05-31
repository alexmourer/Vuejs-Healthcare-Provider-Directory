<template>
  <div class="provider">
    <router-link to="/" class="back">
      <svg
        class="icon icon-arrow_back"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        />
      </svg>
      Results
    </router-link>
    <GoogleMap
      :lat="provider.Facilities[0].Lat"
      :lon="provider.Facilities[0].Lon"
      name="MainProvider"
    />
    <div class="container">
      <span class="pType">{{ provider.ProviderTypesCombined }}</span>
      <h4>{{ provider.FullName }}</h4>
      <div
        v-for="(Location, index) in provider.Facilities"
        :item="index"
        :key="index"
        class="address"
      >
        <p>
          {{ Location.Address1 }} {{ Location.Address2 }} {{ Location.City }}
          {{ Location.State }} {{ Location.Zip }}
        </p>
        <p>{{ Location.Phone1 }}</p>
      </div>
      <div class="break" />
      <div v-if="provider.Specialties[0]" class="specialties">
        <p class="label">Specialties</p>
        <li
          v-for="(Specialty, index) in provider.Specialties"
          :item="index"
          :key="index"
          class="specialty"
        >
          {{ Specialty.Desc }}
        </li>
        <div class="break" />
      </div>
      <div v-if="provider.BoardCerts[0]" class="boardCerts">
        <p class="label">Board Certifications</p>
        <li
          v-for="(Certs, index) in provider.BoardCerts"
          :item="index"
          :key="index"
          class="certifications"
        >
          {{ Certs.Desc }}
        </li>
        <div class="break" />
      </div>
      <div
        v-if="provider.Degrees[0] && provider.Degrees[0] !== 'Not Reported'"
        class="boardCerts"
      >
        <p class="label">Education</p>
        <li
          v-for="(Degree, index) in provider.Degrees"
          :item="index"
          :key="index"
          class="Degrees"
        >
          <span v-if="Degree === 'MD'">Medical Degree</span>
          <span v-else-if="Degree === 'MD'">{{ Degree }}</span>
        </li>
        <div class="break" />
      </div>
      <p v-if="provider.Gender">
        <span class="label">Provider Gender:</span>
        <span v-if="provider.Gender === 'F'">Female</span
        ><span v-else-if="provider.Gender === 'M'">Male</span
        ><span v-else>{{ provider.Gender }}</span>
      </p>
      <p v-if="provider.StateLicenseNumber">
        <span class="label">State License Number:</span>
        {{ provider.StateLicenseNumber }}
      </p>
      <p v-if="provider.Facilities[0].AcceptingNewPatients">
        Accepting New Patients
      </p>
    </div>
  </div>
</template>
<script>
import GoogleMap from "../components/Map/Map";

export default {
  components: {
    GoogleMap
  },
  data: function() {
    return {
      provider: this.$route.params.record
    };
  },
  watch: {
    "$route.params.record": function() {
      this.provider = this.$route.params.record;
    }
  }
};
</script>
