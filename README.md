# Plus1 MVP

A Next.js-based education platform for music production and creative skills.

## Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment on Digital Ocean

### Prerequisites

1. A GitHub account with this repository pushed to it
2. A Digital Ocean account
3. Digital Ocean CLI (doctl) installed and authenticated

### Deployment Steps

1. **Prepare Your Repository**
   - Ensure all changes are committed and pushed to your GitHub repository
   - Make sure your `.env` variables are properly set in Digital Ocean's dashboard

2. **Deploy via Digital Ocean App Platform**

   Option 1: Via Digital Ocean Dashboard
   - Go to [Digital Ocean Apps](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Select your GitHub repository
   - Select the branch you want to deploy (usually `main`)
   - Configure your environment variables
   - Click "Deploy"

   Option 2: Via Command Line
   ```bash
   # Install doctl if you haven't already
   brew install doctl # macOS
   # or download from https://github.com/digitalocean/doctl/releases

   # Authenticate doctl
   doctl auth init

   # Create and deploy the app
   doctl apps create --spec .do/app.yaml
   ```

3. **Environment Variables**
   Required environment variables:
   - `NODE_ENV`: Set to 'production'
   - `NEXT_PUBLIC_API_URL`: Your API endpoint

4. **Post-Deployment**
   - Visit your app's URL (provided by Digital Ocean)
   - Verify all features are working
   - Set up your custom domain if needed

### Monitoring and Maintenance

- Monitor your app's performance in the Digital Ocean dashboard
- Set up alerts for important metrics
- Regular updates:
  ```bash
  # Update dependencies
  npm update

  # Check for security vulnerabilities
  npm audit
  ```

## Project Structure

```
plus1-mvp/
├── src/               # Source code
├── public/           # Static files
├── .do/             # Digital Ocean configuration
└── ...
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[License Type] - See LICENSE file for details
