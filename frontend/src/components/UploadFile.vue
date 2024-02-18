<template>
  <div class="container">
    <h1>Upload Image Form</h1>
    <div class="form-wrapper">
      <form @submit.prevent="uploadFile" class="upload-form">
        <div class="form-group">
          <label for="fileInput" class="form-label">Choose File</label>
          <input type="file" accept="image/*"  class="form-control" id="fileInput" @change="handleFileChange">
        </div>
        <button type="submit" class="btn btn-primary submit-button" :class="{ 'btn-disabled': !file }">Upload</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import Axios

export default {
  data() {
    return {
      file: null,
      errorMessage: ''
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
      this.errorMessage = '';
    },
    uploadFile() {
      if (!this.file) {
        // Don't proceed with upload if no file is selected
        this.errorMessage = 'you need to select a file to upload'
        return;
      }
      // Create FormData object to send the file
      let formData = new FormData();
      formData.append('file', this.file);

      // Send file to backend endpoint using Axios
      axios.post('http://localhost:3000/api/images/upload', formData)
          .then(response => {
            // Handle success
            console.log('File uploaded successfully:', response.data);
            // Redirect to another component upon successful upload
            this.$router.push('/details'); // Redirect to a success component
          })
          .catch(error => {
            // Handle failure
            console.error('Error uploading file:', error.response.data);

            // Set error message to display in the form
            this.errorMessage = error.response.data.message;
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

.form-wrapper {
  max-width: 400px;
  width: 100%;
}

.upload-form {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px; /* Add margin-bottom for spacing */
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  display: block;
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-disabled {
  opacity: 0.6; /* Dim the button */
  cursor: not-allowed; /* Disable cursor */
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

.error-message {
  color: red; /* Set error message color to red */
  margin-top: 5px; /* Add some spacing */
}
</style>
