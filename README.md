# FriendCircle – Social Media Mobile App

A legacy mobile social networking application built about 10 years ago.  
The repository contains both the **mobile frontend** and the **backend API service**.

---

## Repository Structure

- **`FriendCircle/`** — Mobile app (React Native)  
- **`FriendCircleBackend/`** — Backend service (Node.js/Express)  
- **`README.md`** — Project documentation

---

## Architecture Overview

- **Frontend:** Mobile app for user interactions  
- **Backend:** Node.js/Express REST APIs for authentication, posts, friends, comments, and media  
- **Database:** Stores user accounts, friendships, posts, likes, and comments  

---

## Features

- User registration and authentication  
- Profile creation and editing  
- Friend requests and connections  
- Posts with text and images  
- Likes and comments  
- Timeline/feed aggregation  
- Notifications  

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)  
- npm or yarn  
- A running database instance (MongoDB or SQL depending on backend config)  

### Clone Repository
```bash
git clone https://github.com/me-Sushil/FriendCircle-Social-Media-Mobile-App.git
cd FriendCircle-Social-Media-Mobile-App

```
### Backend Setup
```
cd FriendCircleBackend
npm install
# Create a .env file (see Environment Variables section)
npm run dev   # or: node server.js
```
### Mobile App Setup

```
cd FriendCircle
npm install
npm run android   # Run on Android emulator or device
npm run ios       # Run on iOS (Mac only)
```

### Environment Variables
```
PORT=4000
DATABASE_URL=mongodb://localhost:27017/friendcircle
JWT_SECRET=replace_with_strong_secret
CLOUD_STORAGE_KEY=your_cloud_storage_key

Do not commit real secrets to Git. Add .env to .gitignore.
```
