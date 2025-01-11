const prisma = require(".");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt")

const seed = async () => {

  const createProducts = await prisma.product.createManyAndReturn({
    data: [
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          quantity: 10,
          skuId: faker.commerce.isbn(8),
          image: faker.image.url()
        },
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          quantity: 10,
          skuId: faker.commerce.isbn(8),
          image: faker.image.url()
        },
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          quantity: 10,
          skuId: faker.commerce.isbn(8),
          image: faker.image.url()
        },
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          quantity: 10,
          skuId: faker.commerce.isbn(8),
          image: faker.image.url()
        },
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          quantity: 10,
          skuId: faker.commerce.isbn(8),
          image: faker.image.url()
        },
        {
          name: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          quantity: 10,
          skuId: faker.commerce.isbn(8),
          image: faker.image.url()
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
