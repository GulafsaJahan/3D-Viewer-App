# 3D Viewer Web Application

This is a full-stack 3D Viewer web application that allows users to upload and interact with 3D models in `.obj` or `.glb` format. The app supports user authentication and dynamic rendering of 3D objects using Three.js.

##  Features

-  User Registration & Login (JWT-based Authentication)
-  Upload and render `.obj` or `.glb` 3D files
-  OrbitControls for rotating, zooming, and panning
-  Stores uploaded files and 3D object state
- 🖥 Responsive UI built with Bootstrap

##  Tech Stack

Frontend:
- React.js
- Bootstrap
- Three.js (with OrbitControls)

Backend:
- Node.js
- Express.js
- MongoDB
- Multer (for file uploads)
- JWT (for auth)

---
2. Backend Setup
cd backend
npm install

Create a .env file in /backend:

MONGO_URI=mongodb://localhost:27017/3dviewer
JWT_SECRET=your_secret_key
PORT=5000


Start the backend:
nodemon index.js

3. Frontend Setup
cd ../frontend
npm install


Start the frontend:
npm start
