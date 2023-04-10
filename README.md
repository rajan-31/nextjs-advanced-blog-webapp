# Advanced Blog Application

This repository contains source code for "Advanced Blog Application". It is build using technologies metioned below. Users can create, edit and delete their own blog posts and view blog posts of all users. Logged in users can comment on any blog post page. Admin can Delete any blog post. It takes advantage of SSR where possible to provide seamless experience for users.

### Technologies Used

-   Next.js
-   React.js
-   MongoDB
-   Tailwincss

Follow four steps given below to run application locally.

### 1. Install Requirements

```bash
npm install
```

### 2. Set Environment Variables

Rename `.env.sample` to `.env.local` and set all environment variables

### 3. Running Locally

**Development**

```bash
npm run build
npm start
```

**Production**

```bash
npm run dev
```

view website at http://localhost:3000

### 4. Create First Admin

Visit http://localhost:3000/api/admin in browser

---

## Features

### Type of Users

1. Author - Edit or delete own blog posts
2. Admin - Edit or delete any blog post
3. Reader (Default: not logged in) - View blog posts

### SSR Pages (Server Side Rendered)

-   Home Page
-   Blog Post Page
-   Profile Page

### Structure

**All Users**

-   Login
-   SignUp

**Reader, Admin**

-   Home

    -   All blog posts (with pagination)
    -   Search blog posts (by title, content)
    -   (Only for ADMIN) EDIT or DELETE listed or searched blog post

-   Profile

    -   Basic Details
    -   EDIT or DELETE own blog post

-   New Blog Post

    -   Create new blog post

-   Blog Post

    -   Comment (If logged in)
