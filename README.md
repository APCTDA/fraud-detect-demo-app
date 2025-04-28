# Fraud Detection Demo App

## Team CHENGONG

This is a demo application for fraud detection, developed by Team CHENGONG.

## Project Overview

This application demonstrates a modern fraud detection system built with cutting-edge technologies. It provides a user-friendly interface for analyzing and detecting potential fraudulent activities.

## Technologies Used

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn-ui
- **Styling**: Tailwind CSS
- **Development**: Node.js & npm
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js (recommended to install using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fraud-detect-demo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

### Docker Deployment

The application can be deployed using Docker:

1. Build the Docker image:
```bash
docker build -t fraud-detect-demo-app .
```

2. Run the container:
```bash
docker run -p 80:80 fraud-detect-demo-app
```

The application will be available at `http://localhost:80`

## Development

### Project Structure

- `/src`: Contains all source code
- `/public`: Static assets
- `/components`: Reusable UI components
- `/pages`: Application pages
- `/utils`: Utility functions and helpers

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

## Continuous Integration/Deployment

This project uses GitHub Actions for CI/CD:

- Automatic Docker image builds on push to main branch
- Images are pushed to Docker Hub
- Build cache optimization for faster builds

To set up the CI/CD pipeline:

1. Add the following secrets to your GitHub repository:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

2. The workflow will automatically build and push images on each push to the main branch.

## Deployment

The application can be deployed using various methods:

1. **Vercel**: Recommended for easy deployment
2. **Netlify**: Alternative deployment platform
3. **Traditional hosting**: Build and deploy the static files

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved by Team CHENGONG.

## Contact

For any inquiries or support, please contact the CHENGONG team.
