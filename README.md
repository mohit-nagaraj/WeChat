# WeChat
This project is a real-time chat application built using Socket.IO, Express, and MongoDB with HTTPS support. It manages user connections and messages securely.

## Features
- Real-Time Communication: Utilizes Socket.IO for real-time, bidirectional communication between clients and server.
- Secure Connections: HTTPS support with SSL certificates ensures secure data transmission.
- User Management: Connects to MongoDB to store and manage online users.
- Message Handling: Sends and receives messages between users in real-time.
- CORS Support: Configured to allow cross-origin requests from a specified domain.


### How It Works
1. Server Initialization:
    - An Express app is initialized.
    - SSL certificates are read from the file system.
    - An HTTPS server is created using the SSL certificates and the Express app.

2. Socket.IO Setup:
    - Socket.IO is initialized with CORS settings and attached to the HTTPS server.

3. MongoDB Connection:
    - Connects to a MongoDB database to store user information.
    - Defines a schema and model for online users.

4. Event Handling:
    - Connection: When a new user connects, their socket ID is logged.
    - Add New User: Adds a new user to the MongoDB database if they don't already exist and emits the list of online users.
    - Disconnect: Removes the user from the MongoDB database when they disconnect and emits the updated list of online users.
    - Message: Sends a message to the specified recipient if they are online.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- SSL certificates

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/mohit-nagaraj/WeChat.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure MongoDB connection in the code if necessary. Add the env variables as you can see from .env.example and put the `PORT`, `MONGO_URI`, `JWT_KEY` values

4. Place your SSL certificates in the /ssl directory.

### Running the Server
Start the server:
Here both the socket server & the express server should be started, they run as 2 separate servers.
```bash
node index.js
```

The server will start listening on port specified with HTTPS.

License
This project is licensed under the MIT License. See the LICENSE file for details.