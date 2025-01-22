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
- Redux for state management
- Cookies for saving token

#### Features

- Authentication
- Profile
- Products
- Cart
- Guest Cart & Checkout
- Reviews
- Comments
- Payment Methods
- Wishlist
- Suggestions
- Dynamic Search Bar
- Filters (Tags and Categories)
- CRUD functionality for admin (products, users, admins, etc)
- CRUD functionality for users (profile, address, payment method, cart, reviews, comments)

##### App folder structure
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
        - package.json
    - .gitignore
    - README.md
