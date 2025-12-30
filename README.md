# Snipbook Project

## Project Summary
**Snipbook: A Developer Snippet Library** is a personal tool for developers to save, organize, and quickly access code snippets. It eliminates the need to search through old projects, GitHub repositories, or StackOverflow history, for example. Snipbook provides a clean, responsive interface to add, edit, delete, and favorite snippets, with filtering, sorting, and copy-to-clipboard features.

- **Frontend:** React + React Query  
- **Backend:** Django REST Framework + `rest_framework_simplejwt` for JWT authentication  
- **CSS:** Bootstrap + regular CSS  

Snipbook implements full authentication with access and refresh tokens, automatic token refresh, and protected routes using React. Users can only access their own snippets once logged in.

---

## Video Demo

A 5-minute screencast demonstrating all required features of the application, including authentication, snippet CRUD operations, filtering, pagination, and mobile responsiveness:

🔗 https://youtu.be/eM0Ief-o2sw
---

## Distinctiveness and Complexity
Snipbook stands out from typical CS50 projects because it is **not a social network, e-commerce site, or clone of previous CS50 projects**. It is a developer-focused productivity tool with features found in modern web apps:

- **Full CRUD snippet management:** Add, edit, delete, favorite snippets  
- **Advanced filtering and sorting:** Filter by title, language, code, or favorites; sort by title (A-Z/Z-A) and date (newest/oldest)  
- **Mobile-friendly responsive UI:** Includes a toggle filter button on mobile to reduce screen clutter  
- **JWT-based authentication:** Supports token refresh and automatic session handling  
- **Data normalization:** Ensures consistent formatting (e.g., capitalized languages, title case for snippet titles)  
- **Separation of frontend/backend logic:** React handles UI and state, Django REST handles API and authentication  

I strived to combine these features with robust authentication and responsive design, showcasing both thoughtful design and meaningful complexity, in order to set this project apart from simpler applications.

---

## File Overview

### Backend (Django REST Framework)
- **snippets/models.py:** Snippet model (title, language, code, description, favorite, timestamps, owner)  
- **snippets/serializers.py:**  
  - `RegisterSerializer` – validates and creates new users  
  - `SnippetSerializer` – serializes snippet data with clean formatting and data normalization  
  - `MyTokenObtainPairSerializer` – custom JWT login using email instead of username  
- **snippets/urls.py:** API endpoints for registration and snippet CRUD  
- **snipbook_backend/urls.py:** Includes snippet routes, JWT token obtain/refresh routes  

### Frontend (React)
- **App.jsx:** Sets up routes, protected routes, and wraps the app in `AuthProvider`
- **AuthContext.jsx:** Handles global authentication state (`isLoggedIn`, `user`), login, logout, token refresh, and React Query cache clearing
- **ProtectedRoute.jsx:** Restricts access to authenticated-only routes (dashboard, add/edit pages)
- **Header.jsx:** Displays logo, welcome message, username, and login/logout button; adapts based on authentication state
- **LoginLogoutBtn.jsx:** Reusable button component that conditionally handles login and logout actions
- **Footer.jsx:** Displays site info and external links (LinkedIn, GitHub, portfolio)

- **Login.jsx / Register.jsx:** Authentication forms with validation, loading states, and error handling
- **Dashboard.jsx:** Protected page displaying user snippets with filtering, sorting, pagination, and Add Snippet button
- **SnippetList.jsx:** Fetches snippets, applies filtering and sorting logic, and implements pagination via a “Load More” button
- **SnippetCard.jsx:** Displays individual snippet with title, language, description, code, favorite toggle, edit, delete, and copy-to-clipboard functionality
- **AddSnippet.jsx / EditSnippet.jsx:** Forms for creating and editing snippets, including validation and pre-filled fields
- **Filter.jsx:** Filtering and sorting UI with a mobile-only toggle button
- **ConfirmModal.jsx:** Modal used to confirm snippet deletion
- **BackButton.jsx:** Reusable navigation button to return to the previous page
- **API.js:** Axios instance for API calls, handles access token, refresh token, and 401 errors

---

## Features
- **Authentication:** JWT-based login, registration, logout, and automatic token refresh  
- **Snippet CRUD:** Create, read, update, delete snippets  
- **Favorites:** Mark/unmark snippets as favorite  
- **Filtering & Sorting:** Filter by title, code, language, or favorites; sort by title or creation date  
- **Copy-to-Clipboard:** Quickly copy code from snippet cards  
- **Responsive Design:** Fully mobile-responsive with mobile-specific filter toggle  
- **Clean Data:** Title and language capitalization handled automatically  
- **Protected Routes:** Only authenticated users can access dashboard, add, and edit pages  
- **Pagination:** Snippets are loaded incrementally using a “Load More” button (6 snippets at a time) to improve performance and usability

---

## How to Run the Application

### Backend
1. Clone the repository and navigate to the backend folder:
  cd backend
2. Create a virtual environment (optional but recommended) and activate it:
  python -m venv venv
  # On Windows
  venv\Scripts\activate
  # On macOS/Linux
  source venv/bin/activate
3. Install dependencies:
  pip install -r requirements.txt
4. Apply database migrations:
  python manage.py migrate
5. Run the development server: 
  python manage.py runserver

### Frontend
1. Navigate to the frontend folder
  cd ../frontend
2. Install dependencies:
  npm install
3. Start the frontend server:
  npm run dev
4. Open the application in your browser at: 
  http://localhost:5173


## Additional Information
- **Security:** JWT authentication with access/refresh tokens ensures secure session management.

- **Error Handling:** Provides user-friendly error messages for login, registration, and snippet operations.

- **User Experience:** Forms have validation and pre-populated fields for editing. Snippet cards are interactive and provide copy functionality.

- **Extensibility:** Easily extendable to add more features like snippet categories, tags, or code syntax highlighting.
