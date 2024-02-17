<template>
  <div class="container">
    <h1>Add Location</h1>
    <form @submit.prevent="submitForm" class="location-form">
      <div class="form-group">
        <label for="titleInput" class="form-label">Title</label>
        <input type="text" class="form-control" id="titleInput" v-model="title">
      </div>
      <div class="form-group">
        <label class="form-label">Select Location on Map</label>
        <div class="google-map-container">
          <google-map-picker @location-selected="updateCoordinates" />
        </div>
      </div>
      <button type="submit" class="btn btn-primary submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import GoogleMapPicker from './GoogleMapPicker.vue';

export default {
  components: {
    GoogleMapPicker
  },
  data() {
    return {
      title: '',
      latitude: '',
      longitude: ''
    };
  },
  methods: {
    updateCoordinates(coordinates) {
      this.latitude = coordinates.latitude;
      this.longitude = coordinates.longitude;
    },
    submitForm() {
      // Check if both title and coordinates are provided
      if (!this.title.trim() || !this.latitude || !this.longitude) {
        alert('Please provide a title and select a location on the map.');
        return;
      }

      // Create payload for POST request
      const payload = {
        title: this.title,
        latitude: this.latitude,
        longitude: this.longitude
      };

      // Make a POST request to your API endpoint
      axios.post('http://localhost:3000/api/create', payload)
          .then(response => {
            // Handle success response
            console.log('Location created:', response.data);
            // Clear form fields after successful submission
            this.title = '';
            this.latitude = '';
            this.longitude = '';
            // Optionally, you can redirect the user or show a success message
            alert('Location created successfully!');
            this.$router.push('/all-locations')
          })
          .catch(error => {
            // Handle error response
            console.error('Error creating location:', error);
            // Optionally, you can show an error message to the user
            alert('An error occurred while creating the location. Please try again later.');
          });
    }
  }
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.location-form {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: bold;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1rem;
}

.google-map-container {
  height: 300px; /* or any desired height */
  width: 100%;
}
.submit-button {
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
