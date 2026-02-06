# EZY Skills - Online Learning Platform

A pixel-perfect, responsive implementation of the EZY Skills online learning platform, built with modern web technologies. This project translates Figma designs into a functional React application.

## 🚀 Technologies Used

This project leverages a robust and modern tech stack:

*   **Framework:** [React](https://react.dev/) (v19) - A JavaScript library for building user interfaces.
*   **Build Tool:** [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling for fast development and building.
*   **Language:** [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript for better code quality and developer experience.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4) - A utility-first CSS framework for rapid UI development.
*   **Routing:** [React Router DOM](https://reactrouter.com/) (v6) - Declarative routing for React web applications.
*   **Fonts:** [Google Fonts](https://fonts.google.com/) (Poppins, Inter, Montserrat).

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 20.0.0 or higher (Required by Vite).
*   **npm**: Usually comes with Node.js.

## 🛠️ Installation & Setup

Follow these steps to get the project running locally:

1.  **Unzip the project** (if you received the compressed file) or clone the repository.
2.  **Navigate to the project directory**:
    ```bash
    cd muayyad-task
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    ```
5.  **Open your browser**:
    The application will typically run at `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```
muayyad-task/
├── public/              # Static assets (images, icons, SVGs)
│   └── images/          # Extracted assets from Figma
├── src/
│   ├── components/      # Reusable UI components (Header, Footer, Cards)
│   ├── pages/           # Page views (Home, Login, Courses, etc.)
│   ├── App.tsx          # Main application component & Routing setup
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles & Tailwind imports
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🎨 Features

*   **Pixel-Perfect Design**: Closely matches the provided Figma mockups.
*   **Responsive Layout**: Fully responsive design adapting to Mobile, Tablet, and Desktop screens.
*   **Asset Management**: Includes high-quality SVGs and PNGs extracted directly from the design source.
*   **Modern CSS**: Utilizes Tailwind CSS v4 for efficient and maintainable styling.

## 📜 Scripts

*   `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
*   `npm run build`: Compiles the application for production to the `dist` folder.
*   `npm run preview`: Locally preview the production build.
*   `npm run lint`: Runs ESLint to check for code quality issues.
