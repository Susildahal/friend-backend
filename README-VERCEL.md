# Deploy Backend to Vercel

## Prerequisites
- A Vercel account (sign up at https://vercel.com)
- MongoDB Atlas database (or any cloud MongoDB service)

## Environment Variables
Before deploying, make sure to set these environment variables in Vercel:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=your_frontend_url
PORT=5000
NODE_ENV=production

# Email configuration (if using)
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password
```

## Deployment Steps

### Option 1: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to backend directory
cd backend

# Build the project first
npm run build

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 2: Deploy via GitHub (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Select the `backend` folder as the root directory
5. Vercel will auto-detect the configuration from `vercel.json`
6. Add your environment variables
7. Click "Deploy"

## Important Notes

1. **MongoDB Connection**: Make sure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges to the whitelist.

2. **CORS**: The backend is configured to accept requests from:
   - localhost:3000 (development)
   - Your CLIENT_URL environment variable
   - All Vercel subdomains (*.vercel.app)

3. **Build Output**: The TypeScript code is compiled to the `dist` folder during build.

4. **API Endpoint**: After deployment, your API will be available at:
   ```
   https://your-project-name.vercel.app/api/users/...
   https://your-project-name.vercel.app/api/contacts/...
   ```

## Testing the Deployment

After deployment, test your API:
```bash
curl https://your-project-name.vercel.app/
```

Expected response:
```json
{
  "status": "success",
  "message": "Friends United Backend is running"
}
```

## Troubleshooting

- **Build fails**: Check the build logs in Vercel dashboard
- **Database connection fails**: Verify MONGODB_URI and whitelist settings
- **CORS errors**: Update CLIENT_URL in environment variables
- **Routes not found**: Ensure the `dist` folder is being built correctly

## Local Testing Before Deploy

Test the production build locally:
```bash
npm run build
NODE_ENV=production node dist/index.js
```
