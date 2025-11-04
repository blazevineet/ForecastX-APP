# ForecastX 💡

ForecastX is a clean, modern, and personalized weather application that provides real-time forecasts, 5-day predictions, and actionable travel advice. It features a full user authentication system built with a Node.js backend.



## ✨ Features

* **Smart Dashboard:** A clean, all-in-one view of the weather.
* **Real-time Data:** Live temperature, humidity, wind speed, pressure, and visibility.
* **Sunrise & Sunset:** Accurately displays sunrise and sunset times for the searched location.
* **5-Day Forecast:** Uses the 5-day/3-hour API to process and display a daily forecast.
* **Actionable Travel Advice:** Translates raw weather data into simple, color-coded advice for flights, driving, packing, and outdoor activities.
* **Full User Authentication:**
    * Secure user registration with **bcrypt** password hashing.
    * Login system using **JSON Web Tokens (JWT)** for session management.
* **User Personalization:**
    * **Dark Mode:** A functional, site-wide dark mode toggle.
    * **Units:** Switch between Celsius (°C) and Fahrenheit (°F).
    * All preferences are saved to `localStorage` and applied on every page.
* **Protected Routes:** Internal pages (Dashboard, Settings) are protected and require a user to be logged in.
* **Seasonal Alerts:** A dedicated page for "evergreen" seasonal advice (e.g., Delhi pollution, Chennai monsoons).
* **Responsive Design:** A clean, mobile-first interface that scales to desktop.

## 🚀 Tech Stack

### Frontend
* HTML5
* CSS3 (Flexbox, Grid, Custom Properties, Animations)
* Vanilla JavaScript (ES6+)
* `localStorage` for session and preference management

### Backend
* Node.js
* Express.js (for the REST API)
* `bcrypt.js` (for password hashing)
* `jsonwebtoken` (for JWT session tokens)
* `cors`

### Third-Party API
* **OpenWeatherMap API**
    * `Current Weather` API
    * `5 Day / 3 Hour Forecast` API
    * `Geocoding` API

## 🔧 Installation & Setup

This project is in two parts: the `frontend` (all the `.html` files) and the `backend` (`server.js`). You must run both.

### 1. Backend Server Setup

1.  **Navigate to the backend folder:**
    ```bash
    cd forecastx-backend
    ```
2.  **Install all dependencies:**
    *(This is the step that fixes the `MODULE_NOT_FOUND` error)*
    ```bash
    npm install
    ```
3.  **Run the server:**
    ```bash
    node server.js
    ```
4.  The terminal should show: `Backend server for ForecastX running on http://localhost:3000`
    (Leave this terminal running).

### 2. Frontend Setup

1.  **Get Your API Key:**
    This app **will not work** without a valid OpenWeatherMap API key.
    * Go to [OpenWeatherMap.org](https://openweathermap.org/) and create a free account.
    * Go to your profile and get your API Key.
    * Make sure you are subscribed to the **"Current Weather"** and **"5 Day / 3 Hour Forecast"** plans (they are included in the free tier).

2.  **Add Your API Key:**
    * Open the `dashboard.html` file in your code editor.
    * Find this line (around line 214):
        ```javascript
        const API_KEY = 'YOUR_API_KEY_HERE';
        ```
    * Paste your API key inside the quotes.

3.  **Run the App:**
    * No installation is needed.
    * Open the main `index.html` file in your browser.
    * You can now register, log in, and use the app.

## 🛣️ Future Plans

* **Save Favorite Locations:** Implement the backend logic (already built) to allow logged-in users to save and manage a list of their favorite locations.
* **Persistent Database:** Migrate the backend from an in-memory array to a real database like **MongoDB** or **PostgreSQL** so user accounts are saved permanently.
* **Live Alerts:** Upgrade to the "One Call API" to display real-time, government-issued weather alerts on the dashboard.
