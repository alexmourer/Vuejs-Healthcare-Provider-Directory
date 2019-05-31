<template>
  <div
    :id = "mapName"
    class = "GoogleMap"
  />
</template>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBubPdO6hJrxaaMmVDT3ejPHZxu_icreYA" ></script>
<script>
export default {
  name: 'GoogleMap',
  props: {
    name: {
      type: String,
      default: ''
    },
    lat: {
      type: Number,
      default: ''
    },
    lon: {
      type: Number,
      default: ''
    }
  },
  data: function () {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [{
        latitude: this.lat,
        longitude: this.lon
      }]
    }
  },
  watch: {
    lat: function () {
      console.log(this.lat)
      const element = document.getElementById(this.mapName)
      const options = {
        zoom: 14,
        center: new google.maps.LatLng(this.lat, this.lon),
        mapTypeControl: false
      }
      const map = new google.maps.Map(element, options)
      const position = new google.maps.LatLng(this.lat, this.lon);
      const marker = new google.maps.Marker({
        position,
        map
      })
    }
  },
  mounted: function () {
    console.log(this.lat)
    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(this.lat, this.lon)
    }
    const map = new google.maps.Map(element, options)
    const position = new google.maps.LatLng(this.lat, this.lon);
    const marker = new google.maps.Marker({
      position,
      map
    })
  }
}
</script>
