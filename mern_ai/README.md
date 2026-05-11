# Smart Resume Screening (Frontend + Firebase Auth)

A modern React-based web application that allows users to upload resumes and compare them with job descriptions using an AI-style interface. The project includes Google authentication, protected routes, and a clean dashboard UI.

---

## Features

- Google Login using Firebase Authentication  
- Resume upload UI (PDF support ready)  
- Job description input for analysis  
- AI-style resume match score (frontend simulation)  
- History page (mock data UI)  
- Admin dashboard UI  
- Protected routes using Auth HOC  
- Clean and responsive light UI design  

---

## Tech Stack

- React.js  
- React Router DOM  
- Firebase Authentication  
- Material UI (Icons + Skeleton Loader)  
- CSS Modules  

---

## Project Structure

src/
├── component/
│   ├── Dashboard/
│   ├── History/
│   ├── Admin/
│   ├── Login/
│   ├── SideBar/
│
├── utils/
│   ├── firebase.js
│   ├── AuthContext.jsx
│   ├── HOC/
│
├── App.jsx
├── main.jsx

---

## Getting Started

### 1. Clone the repository

git clone https://github.com/M-Sami27/Web_Project.git

---

### 2. Install dependencies

npm install

---

### 3. Run the project

npm run dev

---

## Firebase Setup

- Create a Firebase project  
- Enable Google Authentication  
- Add Firebase config in:

src/utils/firebase.js

---

## Future Improvements

- Backend integration (Node.js + Express)  
- Real AI-based resume scoring  
- MongoDB / Firestore for storing history  
- File upload processing  
- Deployment (Vercel / Firebase Hosting)  

---

## Author

Student Developer  

Project: Smart Resume Screening System  

---