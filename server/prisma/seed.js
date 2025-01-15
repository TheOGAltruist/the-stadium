const prisma = require(".");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt")

const seed = async () => {

  let products = [];

  for (let index = 0; index < 100; index++) {
    let product = {};
    product = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      quantity: faker.number.int(10, 100),
      skuId: faker.commerce.isbn(8),
      image: faker.image.url()
    }

    products.push(product)
  };

  const createProducts = await prisma.product.createManyAndReturn({
    data: products,
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
