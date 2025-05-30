# RackOn - Inventory Management System for MSMEs

## 🚀 Introduction
RackOn is a user-friendly inventory management platform designed specifically for Micro, Small, and Medium Enterprises (MSMEs). It streamlines inventory tracking, sales reporting, and alerts, helping businesses operate efficiently and make data-driven decisions.

## 🛠 Features
- **User Authentication:** Secure login and sign-up with Firebase email/password and Google authentication.
- **Inventory Management:** Add, update, delete, and view products with real-time data.
- **Sales Reports:** Graphical representation of sales using intuitive charts.
- **Smart Alerts:** Low-stock and expiration alerts via the web app and email notifications.
- **AI-based Sales Prediction:** Predict sales trends using AI models to help businesses plan better.
- **Role Management:** Future implementation to ensure role-based access control for different user levels.

## 🏗️ Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **AI Model:** Python (Future Implementation)

## 🚦 Installation
Follow these steps to set up RackOn locally:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/rackon.git
    cd rackon
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    cd client
    npm install
    ```

3. **Configure Firebase:**
    - Create a Firebase project from the [Firebase Console](https://console.firebase.google.com/).
    - Enable Firestore and Authentication (Email/Password and Google Sign-In).
    - Copy your Firebase configuration and create a `.env` file in both the backend and frontend directories.

4. **Run the Application:**
    ```bash
    cd client
    npm start
    ```
    In another terminal window:
    ```bash
    cd server
    node index.js
    ```

## 🧑‍💻 Usage
1. **Sign Up or Log In** using your email and password or Google account.
2. **Add Products** by navigating to the product management page.
3. **Monitor Sales** with visual reports and charts.
4. **Receive Alerts** when stock levels are low or products are expiring soon.
5. **Predict Sales** using AI-powered insights (coming soon).

## 🗂 Project Structure
```bash
rackon/
├── client/      # Frontend (React)
├── server/      # Backend (Node.js, Express)
└── README.md
```

## 📧 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Create a Pull Request.

---
_Developed with ❤️ by RackOn Team._
