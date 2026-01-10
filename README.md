# Travel Trucks

A modern web application for camper van rentals, built with Next.js 16, TypeScript, Zustand and TanStack Query.

## Project Overview

Travel Trucks provides a comprehensive platform for browsing and booking camper vans. Users can filter campers by location, type, and equipment, view detailed information including photos and reviews, and submit booking requests.

## Key Features

### Catalog Page
- Advanced filtering system:
  - Location search (Ukrainian cities)
  - Vehicle type selection (alcove, panel truck, fully integrated)
  - Equipment filters (AC, automatic transmission, kitchen, TV, bathroom, etc.)
- Pagination with load more functionality (10 items per page)
- Camper cards displaying price, rating, location, and key features
- Add to favorites functionality with localStorage persistence

### Camper Details Page
- Photo gallery with multiple images
- Comprehensive vehicle description
- Technical specifications (dimensions, fuel consumption, tank capacity)
- Equipment list with icons
- User reviews with star ratings
- Booking form with validation
- Tabbed interface for Features and Reviews sections

### Additional Features
- Server-side rendering with Next.js App Router
- Client-side state management with Zustand
- Data fetching and caching with TanStack Query
- Toast notifications for user actions
- Loading states with spinners
- Custom 404 page
- Error boundary for error handling

## Technology Stack

### Core
- **Next.js 16**
- **TypeScript**
- **React 19**

### State Management & Data Fetching
- **TanStack Query (React Query) 5** - Server state management, caching, and data synchronization
- **Zustand** - Client state management for filters and favorites
- **Axios** - HTTP client for API requests

### UI & Styling
- **CSS Modules** - Scoped component styling
- **React Toastify** - Toast notifications
- **React Loader Spinner** - Loading indicators

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **dotenv** - Environment variables management

## Installation

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/travel-trucks.git
cd travel-trucks
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

The application uses TanStack Query for efficient data fetching and caching:

- **Automatic caching** - Reduces unnecessary API calls
- **Background refetching** - Keeps data fresh
- **Optimistic updates** - Improves perceived performance
- **Query invalidation** - Manages stale data
- **Prefetching** - Server-side data loading for faster page loads

API endpoints:
- `GET /campers` - Fetch campers list with filters and pagination
- `GET /campers/:id` - Fetch individual camper details

## Author

**Your Name**
- GitHub: [@yourusername](https://github.com/ITonkovyd/)
