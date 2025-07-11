# Telesport

## 🏅 Description

An interactive web application for visualizing Olympic Games statistics and medal data by country.

## Development server

## ✨ Features

- **Dashboard** - Display general Olympics statistics
- **Country Detail Pages** - Display country related statistics
- **Interactive charts** - Visualize data through charts
- **Error Handling** - Handle errors and redirect to a 404 page
- **Responsive** - Optimized for desktop and mobile

## 🏗️ Architecture

```text
src/app/
├── components/    # Reusable UI components
├── pages/         # Components pages used for routing
└── core/          # Business logic 
    ├── services/  # Data management services
    └── models/    # Data models and interfaces
```

## 🛠️ Requirements

| Technology      | Version | Description                            |
|-----------------|---------|----------------------------------------|
| **Node.js**     | ≥18.x   | JavaScript runtime environment         |
| **npm**         | Latest  | Package manager (bundled with Node.js) |
| **Angular CLI** | ≥18.0.3 | Angular command line interface         |

## 🚀 Installation

### 1. Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org)

Verify your installation:

```bash
node -v
npm -v
```

### 2. Install Angular CLI

Install Angular CLI:

```bash
npm install -g @angular/cli@18
```

Verify the installation:

```bash
ng version
```

### 3. Clone and setup project

Clone the repository:

```bash
git clone https://github.com/hisarandre/P2_telesport
```

Navigate to project directory:

```bash
cd P2_Telesport
```

Install dependencies:

```bash
npm install
```

### 4. Start server

Launch the application:

```bash
ng serve
```

## 5. Access the app

Once the development server is running, navigate to:

**http://localhost:4200**
