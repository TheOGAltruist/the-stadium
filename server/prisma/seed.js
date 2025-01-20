const prisma = require(".");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

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
  // Create products
  let products = [];

  for (let index = 0; index < 100; index++) {
    let product = {};
    product = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      quantity: Math.floor(Math.random() * 100) + 1,
      skuId: `SKU${Math.round(Math.random() * 10000000)}`,
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

  //Create users
  let users = [];

  for (let index = 0; index < 20; index++) {
    const admin = [true, false];
    let user = {};
    user = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      username: `${faker.person.firstName()}${Math.round(
        Math.random() * 1000
      )}`,
      password: await bcrypt.hash(
        await nanoid(20),
        Math.floor(Math.random() * 10) + 1
      ),
      email: `${faker.person.firstName()}.${faker.person.lastName()}@${faker.internet.domainName()}`,
      isAdmin: admin[Math.round(Math.random())],
    };

    users.push(user);
  }

  const createUsers = await prisma.user.createManyAndReturn({
    data: users,
    select: {
      id: true,
    },
  });
  //Create payment methods
  const methods = ["CreditCard", "DebitCard", "Stripe", "Paypal"];
  for (x = 0; x < methods.length; x++) {
    for (y = 0; y < createUsers.length; y++) {
      const createPaymentMethod = await prisma.paymentMethod.create({
        data: {
          name: methods[x],
          user_id: createUsers[y].id,
          type: methods[x],
        },
      });

      //Create Orders
      const createOrders = await prisma.order.create({
        data: {
          order_id: Date.now().toString(),
          user_id: createUsers[y].id,
          paymentMethodId: createPaymentMethod.id,
          status: "Created",
        },
      });
    }
  }

  //Create OrderItems
  const allOrders = await prisma.order.findMany();

  for (z = 0; z < allOrders.length; z++) {
    const orderItem = await prisma.orderItem.create({
      data: {
        order_id: allOrders[z].order_id,
        product_id: createProducts[Math.floor(Math.random() * 100)].id,
        quantity: Math.floor(Math.random() * 10) + 1,
      },
    });
  }

  //Create Tags
  const tags = ["Sports", "Indoor", "Outdoor", "Footwear", "Running", "Tennis"];
  for (a = 0; a < createProducts.length; a++) {
    const createTag = await prisma.tag.create({
      data: {
        name: tags[Math.floor(Math.random() * 6)],
        product_id: createProducts[a].id,
      },
    });
  }

  //Create categories
  const categories = [
    "Equipment",
    "Basketball",
    "Soccer",
    "Shoes",
    "Running",
    "Tennis",
  ];
  for (a = 0; a < createProducts.length; a++) {
    const createCategory = await prisma.category.create({
      data: {
        name: tags[Math.floor(Math.random() * 6)],
        product_id: createProducts[a].id,
      },
    });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
