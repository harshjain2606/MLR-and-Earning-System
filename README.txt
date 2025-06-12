      // Referral System with Multi-Level Profit Sharing and Live Data Updates //

* Overview
    This project is a multi-level referral and earnings system where users can refer others,and profit is distributed based on a hierarchical structure.
    Earnings are tracked and distributed in real-time, and users receive notifications whenever they earn from referrals. 
    The backend handles the calculations, and the frontend displays the results in real-time using Socket.IO.

* Features
    . Referral Hierarchy: Users can refer up to 8 people directly. Earnings are calculated based on direct (Level 1) and indirect (Level 2) referrals.
    . Real-Time Notifications: The system sends real-time notifications for earned profits whenever a purchase is made by a referral.

* Profit Distribution:

    . 5% Earnings from direct referrals (Level 1).
    . 1% Earnings from second-level referrals (Level 2).

* Purchase Validation: Only purchases above ₹1000 will generate earnings.
* Backend Logging: The backend logs the transactions and earnings in the terminal.
* Frontend Notifications: The frontend displays detailed notifications for earned profits.

* System Architecture

    . Frontend: An HTML page with JavaScript to handle user input and display notifications.
    . Backend: A Node.js server using Express, Socket.IO for real-time communication, and a simple mock database to simulate users and their referrals.

* Technologies Used

    . Backend:
        .Node.js
        .Express
        .Socket.IO
        .CORS (Cross-Origin Resource Sharing)

    . Frontend:
        .HTML
        .JavaScript
        .Socket.IO client for real-time notifications

* Setup and Installation

    1. Backend Setup
        Step 1: Install Dependencies
            1. Create a folder for your project.
            2. Initialize a Node.js project:
                . npm init -y
            3. Install Required Packages:
                . npm install express socket.io cors

        Step 2: Create the Backend (server.js)
        Step 3: Run the Backend Server:
                . node server.js
                . The backend will run on http://localhost:3000.

    2. Frontend Setup
        Step 1: Create the Frontend (index.html)
            1. Create an index.html file.
            2. Step 2: Open the Frontend.
                . Run on Live Serve URL : http://127.0.0.1:5500.

* Conclusion
This project enables a multi-level referral and earnings system with real-time updates. The

Thank you for this assignment opportunity.
Harsh Jain
+91 9643486520
jaainharsh383@gmail.com