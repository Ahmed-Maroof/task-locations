# Locations Map Uploader 

## Description

This project is a full-stack application built with Node.js,
Express.js, Vue.js, and PostgreSQL.
It allows users to upload location data, including images,
and view them on a map interface.

## Backend Setup

### Requirements

- Node.js installed on your machine
- PostgreSQL installed and running locally

### Installation

1. Clone this repository to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the backend directory:

    ```bash
    cd backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Configure the database connection in the `config/db.js` file by providing your PostgreSQL connection details.

5. Initialize the PostgreSQL database:

    ```bash
    npm run db:init
    ```

6. Start the backend server:

    ```bash
    node app.js
    ```

## Frontend Setup

### Requirements

- Node.js installed on your machine

### Installation

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run serve
    ```

## Usage

1. Once the backend and frontend servers are running,
access the application in your browser at `http://localhost:8080`.


2. Use the application to upload location data and images,
view them on the map interface, and manage your location entries.

## Database Setup

The backend of this application uses PostgreSQL for data storage. 
Upon starting the backend server for the first time,
the necessary database schema will be automatically created.

## Additional Notes

- Ensure that your PostgreSQL server is running before starting the backend.
- Make sure to configure the `backend/db.js`
- file with your PostgreSQL connection details.
- Customize the frontend and backend configurations as needed for your specific requirements.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve this project.

