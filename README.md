
---

## 🚀 Deployment Instructions

### 🔹 Backend (Render)

1. Go to [Render](https://video-library-app-jp.netlify.app/).
2. Click **New Web Service** → **Deploy from GitHub**.
3. Connect your GitHub repo (`video-library-app`).
4. Set the following:

   | Setting            | Value               |
   |--------------------|---------------------|
   | Root Directory     | `backend` ✅         |
   | Build Command      | `npm install`       |
   | Start Command      | `node server.js`    |
   | Environment        | Node                |

5. Add the following **Environment Variables** (optional but recommended):

   ```env
   MONGODB_URI=<your MongoDB Atlas URI>
   PORT=5000
