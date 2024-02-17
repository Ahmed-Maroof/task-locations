<template>
  <div class="container">
    <form @submit.prevent="uploadFile" class="upload-form">
      <div class="form-group">
        <label for="fileInput" class="form-label">Choose File</label>
        <input type="file" class="form-control" id="fileInput" @change="handleFileChange">
      </div>
      <button type="submit" class="btn btn-primary">Upload</button>
    </form>
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
    },
    uploadFile() {
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.upload-form {
  max-width: 400px;
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
  margin-bottom: 5px; /* Add margin-bottom for spacing */
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
