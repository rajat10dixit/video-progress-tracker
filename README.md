# Video Progress Tracker 🎬📈

A MERN stack application that accurately tracks unique video watch progress by only counting newly watched segments.

## 🚀 Features

- **Precise Progress Tracking** - Only counts never-before-seen content
- **Smart Resume** - Remembers exact last position
- **Skip Protection** - Fast-forwarded sections don't count
- **Real-time Updates** - Progress bar updates dynamically
- **Cross-Session Memory** - Saves data between viewing sessions

## 🛠 Tech Stack

**Frontend**  
- React.js (v18)
- Bootstrap 5
- Axios

**Backend**  
- Node.js (v16+)
- Express.js
- MongoDB/Mongoose

## 🏗 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git (optional)

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/video-progress-tracker.git
   cd video-progress-tracker

2. BACKEND SETUP
- cd backend
- npm install

3. FRONTEND SETUP
- cd ../frontend
- npm install

4. API REFERENCE

Endpoint	Method	Description
/api/progress/:userId/:videoId	GET 	Retrieve user progress
/api/progress 	POST	 Save watched intervals
/api/progress/lastPosition	PUT	Update playback position

5. PROJECT STRUCTURE
video-progress-tracker/
├── backend/
│   ├── models/            # Database models
│   ├── routes/            # API endpoints
│   ├── server.js          # Express server
│   └── .env               # Environment config
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   ├── App.js         # Root component
    │   └── index.js       # Entry point
    └── public/            # Static assets

6.Debugging Tips
Problem: Video not playing
✅ Verify CORS headers on video server
✅ Test video URL directly in browser

Problem: Progress stuck at 0%
✅ Check MongoDB connection
✅ Inspect network requests in DevTools

Problem: NaN progress value
✅ Ensure backend returns valid numbers
✅ Confirm video duration is loaded
