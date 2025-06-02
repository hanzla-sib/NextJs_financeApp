# Finance Management App

A modern financial management application built with Next.js, designed to help users track, analyze, and manage their financial transactions efficiently.

## Table of Contents

- [Features](#features)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database & Seeding](#database--seeding)
- [Development Notes](#development-notes)
- [License](#license)

---

## Features

- **Transaction Management:** Add, edit, and delete financial transactions.
- **Dashboard:** Visual summaries and trends of your finances.
- **Dark Mode:** Toggle between light and dark themes.
- **Form Handling & Validation:** Robust forms using `react-hook-form` and `Zod`.
- **Loading Skeletons:** Smooth UX with skeleton loaders during data fetch.
- **Server Actions:** Efficient server-side data manipulation and caching.
- **Database Seeding:** Automated initial data setup for development/testing.
- **Error Boundaries:** Graceful error handling in the UI.

---

## Tech Stack & Libraries

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [Supabase](https://supabase.com/) (SQL, server actions, seeding)
- **API Mocking:** [JsonServer](https://github.com/typicode/json-server)
- **Icons:** [lucide-react](https://lucide.dev/)
- **State & Cookies:** [react-cookie](https://www.npmjs.com/package/react-cookie)
- **Form Handling:** [react-hook-form](https://react-hook-form.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Utilities:** [tailwind-merge](https://github.com/dcastil/tailwind-merge), custom hooks, and utility functions
- **Other:** React Suspense, forwardRef, dotenv, RPC (Remote Procedure Calls)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd NextJs_financeApp
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the required environment variables (see [Environment Variables](#environment-variables)).

### 4. Seed the Database (Optional for Dev/Test)

```bash
node seed.mjs
```

### 5. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
NextJs_financeApp/
│
├── app/                # Next.js app directory (pages, layouts, components)
│   ├── dashboard/      # Dashboard and transaction management
│   ├── (auth)/         # Authentication pages and logic
│   └── components/     # Shared UI components
│
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities, constants, validation, Supabase logic
├── db.json             # JsonServer mock data
├── seed.mjs            # Database seeding script
├── tailwind.config.js  # Tailwind CSS configuration
├── next.config.mjs     # Next.js configuration
└── ...
```

---

## Environment Variables

Create a `.env.local` file and add the following (example):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Add other environment variables as needed
```

---

## Database & Seeding

- The app uses Supabase for storing and querying transactions.
- To seed the database with initial data, run:

  ```bash
  node seed.mjs
  ```

- For local development, you can also use `db.json` with JsonServer.

---

## Development Notes

- **Server Actions:** Utilizes Next.js server actions for secure data operations and caching.
- **Form Validation:** All forms are validated using Zod schemas.
- **Error Handling:** React Error Boundaries are implemented for robust error management.
- **Loading States:** Skeleton components provide feedback during async operations.
- **Dark Mode:** Toggle available in the UI, with preference saved in cookies.

---

## License

This project is licensed under the MIT License.

---

Feel free to further customize this README for your team or deployment needs! If you need a specific section or more details, let me know.