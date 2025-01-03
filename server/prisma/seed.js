const prisma = require(".");
const seed = async () => {
  //Actual data to be seeded
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
