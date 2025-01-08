const prisma = require(".");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt")

const seed = async () => {

  const createProducts = await prisma.product.createManyAndReturn({
    data: [
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: 5.12,
          quantity: 10,
          skuId: faker.commerce.isbn(8)
        },
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: 5.00,
          quantity: 10,
          skuId: faker.commerce.isbn(8)
        },
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: 5.00,
          quantity: 10,
          skuId: faker.commerce.isbn(8)
        },
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: 5.00,
          quantity: 10,
          skuId: faker.commerce.isbn(8)
        },
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: 5.00,
          quantity: 10,
          skuId: faker.commerce.isbn(8)
        },
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: 5.00,
          quantity: 10,
          skuId: faker.commerce.isbn(8)
        }
    ],
    select: {
        id: true
    }
  });
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
