# Moviez Land

Moviez Land is a professional movie tracking application built with Next.js 16, MongoDB, and the TMDB API. It provides a streamlined interface for browsing trending cinema, searching a global database, and maintaining a personalized watchlist.

## Features

- **Trending and Discovery**: Real-time access to the latest popular movies.
- **High-Speed Search**: Efficient search functionality powered by TMDB.
- **Cinematic Experience**: Integrated high-quality trailer player with a clean modal interface.
- **User Accounts**: Secure registration and authentication to manage personal favorites.
- **Robust Validation**: Server and client-side form validation using Zod.
- **Responsive Layout**: Designed for optimal performance across mobile, tablet, and desktop devices.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Icons**: Lucide React and React Icons
- **Notifications**: Sonner
- **Image Hosting**: Cloudinary

## Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB Atlas account
- TMDB API Key
- Cloudinary account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/moviezland.git
   cd moviezland
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Configuration:
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_uri

   # TMDB API
   TMDB_BASE_URL=https://api.themoviedb.org/3
   TMDB_API_ACCESS_TOKEN=your_tmdb_access_token
   NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN=your_tmdb_access_token

   # Authentication
   AUTH_SECRET=your_auth_secret
   BASE_API_URL=http://localhost:3000

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

To deploy on Vercel:

1. Push the repository to GitHub.
2. Link the repository in the Vercel dashboard.
3. Configure the Environment Variables in the project settings.
4. Deploy the application.

## License

This project is licensed under the MIT License.
