# Todo List Application

## Overview
The **Todo List Application** is a web-based task management tool built with **Next.js**, **TypeScript**, and **React**. It allows users to create, view, filter, and manage their todos efficiently. The app supports user-specific todo lists, displaying the logged-in user's `username` in the Navbar.

## Features
- **User-Specific Todos**: Fetches and displays todos based on `userId`.
- **Create Todos**: Users can add todos with a title, description, priority (High, Medium, Low) and tags.
- **Filter Todos**:
  - By priority (High, Medium, Low).
  - By tags.
- **View Todos**: Todos are displayed with edit/delete options.
- **Responsive UI**: Styled with Tailwind CSS.

## Tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js, MongoDB
- **State Management**: React Context API
- **Deployment**: Vercel

`

## Setup Instructions
### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation
1. Clone the Repository:
   ```bash
   git clone <repository-url>
   cd todo-list-app
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
3. Set Up Environment Variables:
   Create a `.env.local` file and add:
   ```env
   MONGODB_URI=<your-mongodb-connection-string>
   DB_NAME= <your-database-name>
   ```
4. Run the Development Server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Usage
- **Access the App**: Navigate to `http://localhost:3000/todos`.
- **Create a Todo**: Click "Create Todo", fill in details, add tags, and submit.
- **Filter Todos**: Use the sidebar to filter by priority and tags.
- **View Todos**: Todos are listed with edit/delete options.

## API Endpoints
- **GET** `/api/todo/get?user=<userId>`: Fetch user-specific todos.
- **POST** `/api/todo/add`: Create a new todo.
- **DELETE** `/api/todo/delete`: Delete a todo by ID.
- **UPDATE** `/api/todo/edit?todoID=<todoId>`: Updates a todo



## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make changes and commit:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Contact
For questions or feedback, reach out to `sriramoji.abhiram@gmail.com`.

---

