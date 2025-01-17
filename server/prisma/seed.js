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
  // Create products
  let products = [];

  for (let index = 0; index < 100; index++) {
    let product = {};
    product = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      quantity: faker.number.int(10, 100),
      skuId: `SKU${Math.floor(Date.now() + Math.random() * 7)}`,
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
    const admin = ['true', 'false']
    let user = {};
    user = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      username: `${faker.person.firstName()}${Math.round(Math.random() * 1000)}`,
      password: faker.person.int(10, 100),
      email: function() {
        return `${this.firstname}.${this.lastname}@${faker.internet.domainName}`
      },
      isAdmin: a[Math.round(Math.random())]
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
  const methods = [ 'CreditCard','DebitCard','Stripe','Paypal' ]
  methods.forEach((method) => {
    createUsers.forEach((user) => {
      const createPaymentMethod = prisma.paymentMethod.create({
        data: {
          name: method,
          user_id: user.id,
          type: method
        }
      })
    })
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
