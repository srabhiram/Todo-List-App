# Todo List Application

## Overview
The **Todo List Application** is a web-based task management tool built with **Next.js**, **TypeScript**, and **React**. It allows users to create, view, filter, and manage their todos efficiently. The app supports user-specific todo lists, displaying the logged-in user's `username` in the URL (e.g., `/todos?username=Abhiram`).

## Features
- **User-Specific Todos**: Fetches and displays todos based on `userId`.
- **Dynamic Username in URL**: Displays the logged-in user’s `username`.
- **Create Todos**: Users can add todos with a title, description, priority (High, Medium, Low), tags, and due date.
- **Filter Todos**:
  - By priority (High, Medium, Low).
  - By tags.
- **View Todos**: Todos are displayed with edit/delete options.
- **Responsive UI**: Styled with Tailwind CSS.
- **Dialog for Todo Creation**: Supports input validation and tag management.

## Tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB (Mongoose)
- **State Management**: React Context API
- **Routing**: Next.js query parameters
- **Deployment**: (Update with platform, e.g., Vercel)

## Project Structure
```
app/
├── todos/
│   ├── page.tsx                # Todos page
│   ├── CreateTodoDialog.tsx     # Dialog component for adding todos
│   ├── create/route.ts          # API route for fetching todos
├── context/
│   ├── userContext.tsx         # Context for user and todo data
├── models/
│   ├── todos.model.ts          # Mongoose model for todos
│   ├── user.model.ts           # Mongoose model for users
├── api/
│   ├── getUser/                # Fetch users API
│   ├── todo/
│   │   ├── add/                # Create todo API
│   │   ├── delete/             # Delete todo API
```

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
   NEXT_PUBLIC_APP_URI=http://localhost:3000
   MONGODB_URI=<your-mongodb-connection-string>
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
- **GET** `/api/todos/create?userId=<userId>`: Fetch user-specific todos.
- **POST** `/api/todo/add`: Create a new todo.
- **DELETE** `/api/todo/delete`: Delete a todo by ID.

## Future Improvements
- Implement authentication (NextAuth.js).
- Add edit functionality.
- Enhance search and filtering.
- Introduce pagination for large lists.
- Show success/error notifications.

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

### Notes
- Update the `Contact` section with your email.
- Add a `Screenshots` section if needed.
- Modify the `Deployment` section with your hosting platform.
