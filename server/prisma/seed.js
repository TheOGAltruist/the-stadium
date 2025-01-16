const prisma = require(".");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

// const seed = async () => {

// };
// seed()
//   .then(async () => await prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

async function seed() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      password: "securepassword",
      email: "john.doe@example.com",
      isAdmin: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstname: "Jane",
      lastname: "Smith",
      username: "janesmith",
      password: "securepassword",
      email: "jane.smith@example.com",
    },
  });

  // Create a payment method
  const paymentMethod = await prisma.paymentMethod.create({
    data: {
      name: "John's Credit Card",
      user: {
        connect: { id: user1.id },
      },
      type: "CreditCard",
    },
  });

  // Create some products
  let products = [];

  for (let index = 0; index < 100; index++) {
    let product = {};
    product = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      quantity: faker.number.int(10, 100),
      skuId: faker.commerce.isbn(8),
      image: faker.image.url(),
    };

    products.push(product);
  }

  const createProducts = await prisma.product.createManyAndReturn({
    data: products,
    select: {
      id: true,
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: "Product 1",
      description: "Description for product 1",
      price: 19.99,
      quantity: 100,
      skuId: "SKU001",
      image: "https://via.placeholder.com/150",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Product 2",
      description: "Description for product 2",
      price: 29.99,
      quantity: 200,
      skuId: "SKU002",
      image: "https://via.placeholder.com/150",
    },
  });

  // Create some categories
  await prisma.category.create({
    data: {
      name: "Electronics",
      product: {
        connect: { id: product1.id },
      },
    },
  });

  await prisma.category.create({
    data: {
      name: "Books",
      product: {
        connect: { id: product2.id },
      },
    },
  });

  // Create some tags
  await prisma.tag.create({
    data: {
      name: "New Arrival",
      product: {
        connect: { id: product1.id },
      },
    },
  });

  await prisma.tag.create({
    data: {
      name: "Best Seller",
      product: {
        connect: { id: product2.id },
      },
    },
  });

  // Create a review
  await prisma.review.create({
    data: {
      text: "Great product!",
      rating: 4.5,
      product: {
        connect: { id: product1.id },
      },
      user: {
        connect: { username: user1.username },
      },
    },
  });

  // Create a wishlist
  const wishlist = await prisma.wishlist.create({
    data: {
      name: "My Wishlist",
      owner: {
        connect: { id: user2.id },
      },
    },
  });

  // Add items to the wishlist
  await prisma.wishlistItem.create({
    data: {
      product: {
        connect: { id: product1.id },
      },
      wishlist: {
        connect: { id: wishlist.id },
      },
    },
  });

  // Create a cart item
  await prisma.cartItem.create({
    data: {
      user: {
        connect: { id: user1.id },
      },
      product: {
        connect: { id: product2.id },
      },
      quantity: 2,
    },
  });

  // Create an order
  const order = await prisma.order.create({
    data: {
      order_id: "ORDER001",
      user: {
        connect: { id: user1.id },
      },
      payment: {
        connect: { id: "some-payment-method-id" }, // Ensure this ID exists or create a payment method first
      },
      status: "Pending",
    },
  });

  // Add items to the order
  await prisma.orderItem.create({
    data: {
      order: {
        connect: { order_id: order.order_id },
      },
      product: {
        connect: { id: product1.id },
      },
      quantity: 1,
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
