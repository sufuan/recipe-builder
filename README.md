# Blog Site

Welcome to the Blog Site repository! This project is a simple blog platform where users can read various articles on different topics. Below you will find information on how to set up and run the project.

## Features

- View blog posts on various topics
- Organized and easy-to-read articles
- Responsive design for optimal viewing on all devices

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. **Clone the repository:**

   ```bash
   git clone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB:**

   - Ensure MongoDB is running on your local machine or set up a MongoDB Atlas cluster.
   - Create a `.env` file in the root directory and add your MongoDB connection string:

     ```plaintext
     MONGODB_URI=mongodb://localhost:27017/yourDatabaseName
     ```

     - Run the script to insert data:

     ```bash
     node insertPosts.js
     ```

4. **Start the server:**
   ```bash
   npm start
   ```
