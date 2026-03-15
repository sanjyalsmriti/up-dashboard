# User & Posts Dashboard – Submission Checklist

## Tech stack
- [x] Next.js
- [x] TypeScript

---

## Required tasks

### 1. User list page
- [x] Fetch users from `https://jsonplaceholder.typicode.com/users`
- [x] Display: Name, Email, Company name
- [x] "View Posts" button → navigates to `/users/[id]`

### 2. User posts page
- [x] Route: `/users/[id]`
- [x] Fetch posts from `/posts?userId={id}`

### 3. Search users
- [x] Search bar on user list page
- [x] Filter by **Name**
- [x] Filter by **Email**
- [x] Instant client-side filtering (no API call on type)

### 4. Loading & error handling
- [x] Variable name: **apiIsLoading** (users)
- [x] Loading state: "Loading users..."
- [x] Error state: "Something went wrong"
- [x] Posts page: loading and error states for posts

### 5. Add new post form
- [x] Fields: **Title**, **Body**
- [x] Validation before submit (Zod)
- [x] Store new posts in **localStorage**
- [x] New posts show on the same user’s posts page

---

## Optional bonus (done)
- [x] **State management:** Redux (Redux Toolkit) for users and posts
- [x] **Validation:** Zod for add-post form
- [x] **Pagination:** Posts paginated (10 per page, Previous/Next)
- [ ] **Next.js SSR/Server Components:** Users are fetched on the client (optional; not required)

---

## Before you submit

### Compulsory
1. **GitHub repository**
   - Push this project to a **public** GitHub repo.
   - Ensure `README.md` has: project name, how to run (`npm install`, `npm run dev`), and tech stack.

2. **Live link**
   - Deploy to **Vercel** (recommended), Netlify, or Cloudflare Pages.
   - Test: home page, search, View Posts, add post, pagination.
   - Add the **live URL** to the repo README and in your submission.

### Quick deploy (Vercel)
- Push code to GitHub.
- Go to [vercel.com](https://vercel.com) → New Project → Import your repo.
- Leave build command as `npm run build`, output as default.
- Deploy. Use the generated URL as your live link.

---

## Summary
All **required** tasks and most **optional** bonuses are implemented.  
Complete the **GitHub repo** and **live deployment**, then submit both links to HR.
