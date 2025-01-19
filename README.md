# Client Ticketing Tool API

This API, built using [NestJS](https://nestjs.com/), is designed to manage and streamline client ticketing processes efficiently. It provides endpoints for creating, updating, managing, and resolving tickets.

## Features

### 1. **User Management**
   - **User Registration**: Allow clients and support agents to register.
   - **Authentication**: Secure login/logout using JWT authentication.
   - **Role Management**: Define roles for clients, agents, and administrators.

### 2. **Ticket Management**
   - **Create Tickets**: Clients can create tickets with relevant details such as issue type, priority, and description.
   - **View Tickets**: Clients and agents can view tickets, with filters for status, priority, and date.
   - **Update Tickets**: Agents can update ticket status, add comments, and change priority.
   - **Delete Tickets**: Administrators can delete irrelevant or spam tickets.

### 3. **Dashboard**
   - **Overview**: Display ticket statistics like open, resolved, and pending tickets.
   - **Performance Metrics**: Measure agent performance based on ticket resolution time.

### 4. **Notifications**
   - **Email Notifications**: Notify clients and agents on ticket creation, updates, and resolution.
   - **Real-Time Updates**: Use WebSockets for instant updates on ticket status.

### 5. **Reporting**
   - Generate reports based on ticket resolution time, agent performance, and issue trends.

### 6. **Search and Filters**
   - Search tickets by ID, title, or description.
   - Apply filters for date range, priority, and status.

### 7. **Audit Logs**
   - Track all actions taken on tickets for accountability and transparency.

### 8. **Role-Based Access Control (RBAC)**
   - Restrict access to specific features based on user roles.

### 9. **API Documentation**
   - Integrated Swagger UI for testing and understanding API endpoints.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- A database (e.g., PostgreSQL)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itaminul/client-ticketing-tool
   cd client-ticketing-tool-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:
   ```env
   DATABASE_URL=your-database-url
   JWT_SECRET=your-jwt-secret
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

### API Documentation
After starting the server, Swagger UI will be available at `http://localhost:3000/api`.

## Directory Structure
```
client-ticketing-tool-api/
├── src/
│   ├── auth/         # Authentication and authorization modules
│   ├── tickets/      # Ticket management modules
│   ├── users/        # User management modules
│   ├── common/       # Shared utilities and services
│   ├── app.module.ts # Main application module
├── test/             # Test cases
├── .env.example      # Example environment variables file
├── README.md         # Project documentation
└── package.json      # Project metadata and dependencies

---
