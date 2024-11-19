# Contributing to WeChat

Thank you for considering contributing to WeChat! This document provides guidelines and information to help you get started.

## Frontend

### Context
The frontend uses React Context API to manage global state. The main contexts include:
- **AuthContext**: Manages user authentication state.
- **ChatContext**: Manages chat-related state, such as current chat, messages, and online users.

### Routes
The frontend has the following main routes:
- **/login**: User login page.
- **/register**: User registration page.
- **/chat**: Main chat interface, accessible only to authenticated users.

## Backend

### Routes
The backend is built using Express and has the following main routes:

#### User Routes
- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Login a user.
- **GET /api/users/:userId**: Get user details by ID.
- **GET /api/users**: Get all users.

#### Chat Routes
- **POST /api/chats**: Create a new chat.
- **GET /api/chats/:chatId**: Get chat details by ID.
- **GET /api/chats**: Get all chats.

### Authentication
The backend uses JWT for authentication. To access protected routes, include the JWT token in the `Authorization` header as follows:
