## How to Deploy to Render.com

### Backend Deployment

1. **Create a New Web Service on Render**:

   - Go to Render Dashboard → New → Web Service.
   - Connect your GitHub repository and Set root directory to `backend/` folder.
   - Set the build command then :
     ```plaintext
     npm install
     ```
   - Set the start command:
     ```plaintext
     node server.js
     ```

2. **Add Environment Variables**:

   - Add the following variables:

     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```

3. **Deploy**:

   - Click "Create Web Service" and wait for the deployment to complete.

4. **Note the Backend API URL**:
   - After deployment, note the backend API URL (e.g., `https://homeease-backend.onrender.com`). You’ll need to add this URL to the frontend’s `.env` file so the frontend can make requests to the correct backend API.

### Frontend Deployment

1. **Create a New Static Site on Render**:

   - Go to Render Dashboard → New → Static Site.
   - Connect your GitHub repository and Set root directory to `frontend/` folder.
   - Set the build command:

     ```plaintext
     npm install && npm run build
     ```

   - Set the publish directory to `dist/`.

2. **Add Environment Variables**:

   - Add the backend API URL (e.g., `https://homeease-backend.onrender.com`) as `VITE_API_BASE_URL` in the Render environment variables.

3. **Deploy**:
   - Click "Create Static Site" and wait for the deployment to complete.
