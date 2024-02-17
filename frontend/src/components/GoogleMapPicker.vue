<template>
  <div ref="map" class="google-map"></div>
</template>

<script>
export default {
  /* global google */


  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const map = new google.maps.Map(this.$refs.map, {
        center: { lat: 30.04141788125259, lng: 31.235875779491078 }, // Centered around Egypt
        zoom: 9 // Adjust the zoom level as needed
      });

      let marker = null;

      map.addListener('click', (event) => {
        if (marker) {
          marker.setPosition(event.latLng);
        } else {
          marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            draggable: true
          });
        }

        this.$emit('location-selected', {
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng()
        });
      });
    }
  }
};
</script>

<style scoped>
.google-map {
  height: 300px;
}
</style>
