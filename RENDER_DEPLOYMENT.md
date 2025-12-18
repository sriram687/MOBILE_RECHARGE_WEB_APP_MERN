# Render Deployment Guide

## Project Structure
- **Backend**: Node.js/Express API
- **Frontend**: React/Vite Static Site

---

## Option 1: Manual Deployment (Recommended for beginners)

### Step 1: Deploy Backend

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub/GitLab repository
4. Configure the service:
   - **Name**: `mobile-recharge-api`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | A strong random string (32+ chars) |
   | `FRONTEND_URL` | (Leave empty for now, add after frontend deploy) |
   | `NODE_ENV` | `production` |

6. Click **"Create Web Service"**
7. Copy the backend URL (e.g., `https://mobile-recharge-api.onrender.com`)

### Step 2: Deploy Frontend

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Connect the same repository
4. Configure the service:
   - **Name**: `mobile-recharge-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

5. Add Environment Variables:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | Your backend URL from Step 1 (e.g., `https://mobile-recharge-api.onrender.com`) |

6. Click **"Create Static Site"**

### Step 3: Update Backend CORS

1. Go back to your Backend service in Render
2. Add/Update Environment Variable:
   - `FRONTEND_URL` = Your frontend URL (e.g., `https://mobile-recharge-frontend.onrender.com`)
3. The service will auto-redeploy

---

## Option 2: Blueprint Deployment (One-Click)

1. Push this repository to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **"New +"** → **"Blueprint"**
4. Connect your repository (Render will detect `render.yaml`)
5. Fill in the required environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
6. Click **"Apply"**

---

## Environment Variables Reference

### Backend (.env)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/mobile_recharge
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
PORT=3000
FRONTEND_URL=https://your-frontend.onrender.com
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for 1 service 24/7)

### MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string from "Connect" → "Connect your application"

### After Deployment
1. Test backend health: `https://your-backend.onrender.com/health`
2. Test frontend: Visit your frontend URL
3. Seed plans (if needed): Run locally with production MONGO_URI

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/auth/register` | User registration |
| POST | `/auth/login` | User login |
| GET | `/plans` | Get all plans |
| POST | `/recharge` | Create recharge |
| GET | `/recharge/history` | User recharge history |
| GET | `/admin/dashboard` | Admin dashboard stats |

---

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly in backend
- Check browser console for specific error messages

### 502 Bad Gateway
- Check Render logs for errors
- Verify `MONGO_URI` is correct
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`

### Build Failures
- Check Node.js version compatibility
- Review build logs in Render dashboard

### Environment Variables Not Working
- Rebuild the service after changing env vars
- For frontend: vars must start with `VITE_`
