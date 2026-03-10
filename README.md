# React + TypeScript + Vite
# CollabDraw – Collaborative Whiteboard Application
#### This web page is hosted [here!](https://collabdraw-whiteboard-production-b8c8.up.railway.app/login)

### *Project Overview*:
CollabDraw is a collaborative whiteboard web application that allows users to create projects, manage whiteboards, and share projects with other users.
The application enables real-time drawing and visual collaboration using an interactive canvas powered by tldraw.
Users can:
* Create and manage projects.
* Create multiple whiteboards inside a project.
* Share projects with other users.
* Draw and save whiteboard content.

<br/>
<br/>

# *Technology Choices:*

* ##### Frontend:Typescript + React 19 + Vite (for speed and modern hooks).
* ##### Styling: Tailwind CSS v4 (utility-first, responsive design).
* ##### Whiteboarding: TLDraw (professional-grade canvas engine).
* ##### Backend: Node.js + Express (REST API for data management).
* ##### Database: SQLite via better-sqlite3 (fast, file-based persistence).
* ##### Animations: Motion (smooth UI transitions).
* ##### Icons: Lucide React.

<br/>
<br/>

# *Database Schema:*
The application uses a relational SQLite database with the following structure:
### *Tables*:
### 1 users: Stores user profiles.
* id (PK), username (Unique, Case-insensitive).

### 2 projects: Stores project metadata.
* id (PK), name, description, owner_id (FK -> users.id), created_at.

### 3 project_shares: Manages many-to-many relationships for collaboration.
* project_id (FK -> projects.id), user_id (FK -> users.id).

### 4 whiteboards: Stores the drawing data.
* id (PK), project_id (FK -> projects.id), name, state (Long Text/JSON snapshot), created_at, updated_at.

<br/>

### *Relationships:*
* One-to-Many: A User can own many Projects.
* One-to-Many: A Project can contain many Whiteboards.
* Many-to-Many: Users and Projects are linked via project_shares for collaborative access.

<br/>
<br/>


# *Setup Instructions:*
### *To run this project locally on your machine*:

#### 1 Prerequisites: Ensure you have Node.js installed (v18+ recommended).
#### 2 Clone/Create Folder: Create a folder and navigate into it.
#### 3 Install Dependencies:
```
npm install
```
#### 4 Start the Server:
```
 npm run dev
```
#### Access the App: Open your browser and navigate to http://localhost:3000.
#### Database: The collabdraw.db file will be automatically created in your root directory on the first run.

<br/>
<br/>

# *Deployment:*


### Live Demo
https://collabdraw-whiteboard-production-b8c8.up.railway.app

### Deployment Platform

The application is deployed using a modern cloud deployment setup to ensure accessibility and scalability.
<br/>
### Backend Deployment

The backend server is deployed on Railway. Railway hosts the Node.js Express API and manages the application runtime environment.

Steps used for backend deployment:

* Push the project repository to GitHub.
* Connect the repository to Railway.
* Railway automatically installs dependencies and runs the start script.
* The backend API becomes publicly accessible via the Railway-generated domain.
<br/>

### Frontend Deployment

The frontend application is deployed using Vercel. Vercel builds the React/Vite project and serves the static files through a global CDN for fast performance.

Deployment steps:

* Connect the GitHub repository to Vercel.
* Configure build settings.
* Build command:
```
npm run build
```
* Output directory:
```
dist
```
After deployment, Vercel provides a public URL for accessing the application.
<br/>
### Database

The application uses SQLite as the database, managed through the better-sqlite3 library. The database file is automatically created when the server starts if it does not already exist.

### Deployment Architecture

Frontend (React + Vite) → Vercel
Backend (Node.js + Express) → Railway
Database → SQLite

This architecture allows the frontend and backend to scale independently while keeping deployment simple and efficient.
<br/>
<br/>

# *Testing Guide:*

### *Follow these steps to verify all functional requirements*:

#### Authentication Test:
* Enter a unique username (e.g., tester1).
* Verify you are redirected to the Dashboard.
* Refresh the page; verify you remain logged in.
  
#### Project CRUD Test:
* Click "New Project", fill in details, and save.
* Verify the new project card appears.
* Click the trash icon (if owner) to delete and verify it disappears.
  
#### Whiteboard Integration Test:
* Open a project and create a "New Whiteboard".
* Click "Open Editor". Draw several shapes and text.
* Crucial: Click "Save to Database".
* Exit the editor and reopen it; verify your drawing is exactly as you left it.
  
#### Collaboration/Sharing Test:
* In Project Details, click "Share".
* Enter a second username (e.g., collab_user).
* Logout and log back in as collab_user.
* Verify "Project Alpha" appears in your dashboard.
* Open the whiteboard, make a change, and save.
* Log back in as the original owner and verify the changes are visible.

<br/>
<br/>

# *Project Structure:*



```
collabdraw-app
│
├── src
│   ├── components
│   │   ├── Dashboard.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── WhiteboardEditor.tsx
│   │   └── Login.tsx
│   │
│   ├── db.ts
│   └── types.ts
│
├── server.ts
├── package.json
├── .env.example
├── .gitignore
└── README.md
```


<br/>
<br/>

# *Future Improvements:*

* #### Real-time collaboration with WebSockets
* #### User authentication with JWT
* #### Cloud database support
* #### Export whiteboards as images or PDFs

<br/>
<br/>

# *Author*

* Jitendra Singh Chouhan (jitendra, jsinghchouhan971@gmail.com)
  - [LinkedIn](https://www.linkedin.com/in/jitendra-singh-chouhan-309560316/)

