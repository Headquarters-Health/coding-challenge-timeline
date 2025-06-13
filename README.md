# Timeline Management Application

A comprehensive timeline management system built with Next.js and PostgreSQL, designed for tracking and managing various types of timeline items including rehabilitation activities, evaluations, and learning milestones.

## 🎯 Coding Challenge Task

**Your mission:** Build a functional timeline component that (a) displays different items and (b) allows the user to interact with the timeline.

### What you need to solve:

**Timeline Component** (`src/components/Timeline.tsx`)

### Getting Started:
- The database is already set up with sample data
- API endpoints for fetching and adding items are complete
- The settings panel is functional and ready to test your timeline

## 🚀 Features

- **Interactive Timeline Display**: Visual representation of timeline items with different categories
- **Multiple Item Types**: Support for different types of timeline items:
  - Rehabilitation activities
  - Evaluations
  - Return to Play items
  - Return to Learn items
- **Database Integration**: PostgreSQL database for persistent data storage
- **Real-time Updates**: Add, update, and manage timeline items in real-time
- **Category Management**: Color-coded categories for better organization
- **Settings Panel**: Comprehensive control panel for timeline management

## 🛠 Tech Stack

- **Frontend**: Next.js 15.3.3 with React 19
- **Styling**: Tailwind CSS 4 + CSS Modules
- **Database**: PostgreSQL with `pg` driver
- **Language**: TypeScript
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── fetch-timeline/     # Get timeline items
│   │   ├── add-rehab-item/     # Add rehabilitation items
│   │   ├── add-evaluation-item/# Add evaluation items
│   │   ├── add-return-to-play-item/
│   │   ├── add-return-to-learn-item/
│   │   ├── update-timeline-item/
│   │   └── clear-timeline/     # Clear all timeline items
│   ├── layout.tsx              # App layout
│   ├── page.tsx                # Main page
│   └── globals.css             # Global styles
├── components/
│   ├── Timeline.tsx            # Timeline display component
│   └── SettingsSection.tsx     # Settings and controls
└── utils/
    └── db.ts                   # Database utilities and queries
```

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coding-challenge-timeline
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   SELECTED_PATIENT_ID=your_patient_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗄️ Database Schema

The application uses a PostgreSQL database with the main table `added_rehab` containing:

- `id` - Unique identifier
- `title` - Item title
- `description` - Item description
- `category_main` - Main category
- `category_color` - Category color code
- `type` - Item type (rehab, evaluation, Play, Learn)
- `start_datetime_without_timezone` - Start date/time
- `end_datetime_without_timezone` - End date/time
- `patient_id_foreign` - Associated patient ID

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 📋 API Endpoints

- `GET /api/fetch-timeline` - Retrieve all timeline items
- `POST /api/add-rehab-item` - Add a new rehabilitation item
- `POST /api/add-evaluation-item` - Add a new evaluation item
- `POST /api/add-return-to-play-item` - Add a return to play item
- `POST /api/add-return-to-learn-item` - Add a return to learn item
- `PUT /api/update-timeline-item` - Update an existing timeline item - TODO: To be completed by the candidate.
- `DELETE /api/clear-timeline` - Clear all timeline items

## 🎨 Components

### Timeline Component
TODO: To be completed by the candidate.

### SettingsSection Component
Provides controls for:
- Fetching timeline data
- Adding different types of timeline items
- Clearing timeline data
- Real-time feedback and error handling

## 🚀 Deployment

The application can be deployed on Vercel or any platform that supports Next.js:

1. **Vercel Deployment**
   ```bash
   npm run build
   ```
   Connect your repository to Vercel and deploy.

2. **Environment Variables**
   Make sure to set your environment variables in your deployment platform:
   - `DATABASE_URL`
   - `SELECTED_PATIENT_ID`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 🔗 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
