const prisma = require("./index");
const seed = async () => {
  //Actual data to be seeded
  try {
    await prisma.product.createMany({
      data: [
        {
          id: "1",
          name: "Basketball",
          description:
            "Official size and weight basketball suitable for indoor and outdoor play.",
          price: 29.99,
          quantity: 100,
          skuId: "NBA-001",
        },
        {
          id: "2",
          name: "Running Shoes",
          description:
            "Comfortable running shoes with superior cushioning and support.",
          price: 69.99,
          quantity: 120,
          skuId: "RNSH-002",
        },
        {
          id: "3",
          name: "Phaze II Bowling Ball",
          description:
            "This solid reactive blend leaves an incredible footprint on the lane. The marriage between the core and the cover produces the strongest motion of any symmetrical Storm ball to date.",
          price: 154.99,
          quantity: 100,
          skuId: "PBA-003",
        },
        {
          id: "4",
          name: "Football",
          description:
            "The Wilson® NFL® Official Game Ball is handcrafted with exclusive leather for an exclusive feel that is as closest to in-game pro balls.",
          price: 149.99,
          quantity: 15,
          skuId: "NFL-004",
        },
        {
          id: "5",
          name: "Tennis Racket",
          description:
            "Lightweight tennis racket with excellent grip and balance.",
          price: 89.99,
          quantity: 75,
          skuId: "TNRC-005",
        },
        {
          id: "6",
          name: "Golf Clubs Set",
          description:
            "Complete set of gold clubs for beginners and professionals.",
          price: 299.99,
          quantity: 30,
          skuId: "PGA-006",
        },
        {
          id: "7",
          name: "Yoga Mat",
          description:
            "Eco-friendly yoga mat with non-slip surface for all types of yoga practices.",
          price: 19.99,
          quantity: 300,
          skuId: "YOGA-007",
        },
        {
          id: "8",
          name: "Soccer Cleats",
          description:
            "High-performance soccer cleats designed for speed and agility on the field.",
          price: 79.99,
          quantity: 100,
          skuId: "FIFA-008",
        },
        {
          id: "9",
          name: "Volleyball",
          description: "Official size volleyball for indoor and beach play.",
          price: 24.99,
          quantity: 100,
          skuId: "NVA-009",
        },
        {
          id: "10",
          name: "Baseball Glove",
          description:
            "Durable leather baseball glove for infield and outfield play.",
          price: 49.99,
          quantity: 100,
          skuId: "MLB-010",
        },
        {
          id: "11",
          name: "Swimming Goggles",
          description:
            "Anti-fog swimming goggles with UV protection.",
          price: 14.99,
          quantity: 100,
          skuId: "SWM-011",
        },
        {
          id: "12",
          name: "Boxing Gloves",
          description:
            "High-quality boxing gloves for training and competition.",
          price: 39.99,
          quantity: 100,
          skuId: "WBC-012",
        },
      ],
    });
  } catch (error) {
    console.error("Error in seeding the database", error);
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
