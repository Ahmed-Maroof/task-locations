<template>
  <div>
    <h1>All Locations</h1>
    <div ref="map" class="google-map"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  /* global google */

  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      const locations = await this.fetchLocations();
      this.renderLocationsOnMap(locations);
    },
    async fetchLocations() {
      try {
        const response = await axios.get('http://localhost:3000/api/all');
        return response.data;
      } catch (error) {
        console.error('Error fetching locations:', error);
        return [];
      }
    },
    renderLocationsOnMap(locations) {
      const map = new google.maps.Map(this.$refs.map, {
        center: { lat: 30.04141788125259, lng: 31.235875779491078 }, // Centered around Egypt
        zoom: 9 // Adjust the zoom level as needed
      });
      console.log( locations);
      locations.forEach(location => {
        const marker = new google.maps.Marker({
         position: {lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)},
          map: map,
          title: location.title
        });
        const infoWindow = new google.maps.InfoWindow();

        marker.addListener('click', () => {
          // Fetch the image URL from your endpoint
          console.log(location)
          axios.get(`http://localhost:3000/api/images/${location.image_path}`,{ responseType: 'arraybuffer' })
              .then(response => {
                const contentType = response.headers['content-type']; // Get the Content-Type header
                const arrayBuffer = response.data;
                const base64Image = arrayBufferToBase64(arrayBuffer);
                const imageContent = `data:${contentType};base64,${base64Image}`;

                 infoWindow.setContent(`
            <div>
              <h2>${location.title}</h2>
              <img src="${imageContent}" alt="${location.title}" style="max-width: 200px;">
            </div>
          `);
                infoWindow.open(map, marker);
              })
              .catch(error => {
                console.error('Error fetching image:', error);
              });
        });

      });

      // Function to convert ArrayBuffer to Base64-encoded string
      function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
    }
  }
};
</script>

<style scoped>
.google-map {
  height: 500px;
}
</style>
