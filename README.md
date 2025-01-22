# the-stadium
Capstone Project 2407-PT

https://fancy-platypus-62f75a.netlify.app/
.

## Description

This is an E-Commerce Application called 'The Stadium' where users can purchase products related to all sports.

### Tech/Tools
This application will be built using PERN stack
- PostgreSQL for the database
- Prisma ORM for database management
- React for the front-end
- Express.js and Node.js for the back-end
- Redux Toolkit (RTK) for state management
- Cookies for saving/sending token from back-end

#### Features

- Authentication
- Profile
- Products
- Persistent Cart & Checkout for logged-in users
- Persistent Guest Cart & Checkout
- Reviews
- Payment Methods
- Wishlist
- Suggestions
- Dynamic Search Bar
- Filters (Tags and Categories)
- CRUD functionality for admin (products, users, admins, etc)
- CRUD functionality for users (profile, address, payment method, cart, reviews)

##### Important NOTES
- Please note the project is split into two folders (client) and (server)
- Please install the required packages/dependencies for the frontend and backend SEPARATELY
    - "cd client" --> "npm install"
    - "cd server" --> "npm install"
- Please create a .env file in the server folder and put the following info in it
    "cd server" --> "touch .env"
        - DATABASE_URL = "postgres://neondb_owner:9oLTgAKvN7qR@ep-shrill-cherry-a59nyx3q-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&connect_timeout=15"
        - PORT=3000
        - JWT_SECRET=its_a_secret
        - EMAIL_SECRET = "tlm8Q~9_gkps6wXDfWiCp09IwaH6570jI9tl-bWb"
        - EMAIL_CLIENT = "f151537a-4364-4136-b56b-f287c05ce900"
        - EMAIL_TENANTID = "b8105612-1a8d-4c4f-830d-6f936290b4c3"
        - NODE_ENV="production"
- The backend is already hosted on a third-party website. So you only need to run the frontend
    - "cd client"
    - "npm run dev"

###### App folder structure
The-stadium
- Client
    - src
        - assets
            -Stadium.png
        - components
            - About.jsx
            - AdminAccount.jsx
            - AllOrders.jsx
            - AllUsers.jsx
            - CheckoutCart.jsx
            - Home.jsx
            - Login.jsx
            - Navbar.jsx
            - ProductManagement.jsx
            - Register.jsx
            - UserAccount.jsx
            - UserHome.jsx
            - UserOrderHistory.jsx
            - Wishlist.jsx
        - redux
            - admin
                - adminApi.js
            - api
                - rootApi.js
            - auth
                - authApi.js
                - authSlice.js
            - cart
                - cartApi.js
                - cartSlice.js
            - products
                - productsApi.js
            - user
                - userApi.js
            - wishlist
                - wishListApi.js
                - wishListSlice.js
            - store.js
        - App.css
        - App.jsx
        - main.jsx
        - theme.js
        - .gitignore
        - index.html
        - package.json
- Server
    - api
        - controllers
            - admin.controller.js
            - auth.controller.js
            - me.controller.js
            - product.controller.js
            - review.controller.js
            - user.controller.js
        - middleware
            - email.util.js
            - middleware.util.js
        - Prisma
            - index.js (prisma)
            - schema.prisma
            - seed.js (seed database)
        - Routes
            - admin.route.js
            - auth.route.js
            - me.route.js
            - product.route.js
            - review.route.js
        - server.js
        - .env
            - DATABASE_URL = "postgres://neondb_owner:9oLTgAKvN7qR@ep-shrill-cherry-a59nyx3q-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&connect_timeout=15"
            - PORT=3000
            - JWT_SECRET=its_a_secret
            - EMAIL_SECRET = "tlm8Q~9_gkps6wXDfWiCp09IwaH6570jI9tl-bWb"
            - EMAIL_CLIENT = "f151537a-4364-4136-b56b-f287c05ce900"
            - EMAIL_TENANTID = "b8105612-1a8d-4c4f-830d-6f936290b4c3"
            - NODE_ENV="production"
        - package.json
    - .gitignore
    - README.md
