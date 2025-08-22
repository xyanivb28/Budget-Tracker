import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

const data = [
  {
    date: new Date("2025-01-05"),
    type: "income",
    description: "Monthly paycheck from Acme Corp",
    category: "💸 Salary",
    amount: 1500,
  },
  {
    date: new Date("2025-01-07"),
    type: "expense",
    description: "Uber Eats - sushi order",
    category: "🥡 Food Delivery",
    amount: 45.75,
  },
  {
    date: new Date("2025-01-10"),
    type: "expense",
    description: "January apartment rent",
    category: "🏠 Rent",
    amount: 950,
  },
  {
    date: new Date("2025-01-12"),
    type: "expense",
    description: "Weekly grocery run at Walmart",
    category: "🛒 Groceries",
    amount: 120.4,
  },
  {
    date: new Date("2025-01-15"),
    type: "income",
    description: "Website redesign project payment",
    category: "💼 Freelance Project",
    amount: 600,
  },
  {
    date: new Date("2025-01-18"),
    type: "expense",
    description: "Filled up car tank",
    category: "⛽ Fuel",
    amount: 70.2,
  },
  {
    date: new Date("2025-01-20"),
    type: "expense",
    description: "Movie night with friends",
    category: "🎬 Entertainment",
    amount: 55,
  },
  {
    date: new Date("2025-01-22"),
    type: "income",
    description: "Quarterly stock dividends",
    category: "📈 Investments",
    amount: 300,
  },
  {
    date: new Date("2025-01-25"),
    type: "expense",
    description: "January mobile subscription",
    category: "📱 Phone Bill",
    amount: 40,
  },
  {
    date: new Date("2025-01-28"),
    type: "expense",
    description: "Electricity and water charges",
    category: "💡 Utilities",
    amount: 95.5,
  },
  {
    date: new Date("2025-02-02"),
    type: "expense",
    description: "Dinner at Italian restaurant",
    category: "🍽️ Dining Out",
    amount: 68.9,
  },
  {
    date: new Date("2025-02-05"),
    type: "income",
    description: "Monthly paycheck from Acme Corp",
    category: "💸 Salary",
    amount: 1500,
  },
  {
    date: new Date("2025-02-08"),
    type: "expense",
    description: "Amazon purchase - headphones",
    category: "🛍️ Shopping",
    amount: 120,
  },
  {
    date: new Date("2025-02-10"),
    type: "expense",
    description: "Rent payment for February",
    category: "🏠 Rent",
    amount: 950,
  },
  {
    date: new Date("2025-02-14"),
    type: "expense",
    description: "Valentine’s Day flowers & dinner",
    category: "🎁 Gifts",
    amount: 85,
  },
  {
    date: new Date("2025-02-16"),
    type: "income",
    description: "Freelance mobile app project",
    category: "💼 Freelance Project",
    amount: 800,
  },
  {
    date: new Date("2025-02-19"),
    type: "expense",
    description: "Netflix monthly subscription",
    category: "📺 Subscriptions",
    amount: 15.99,
  },
  {
    date: new Date("2025-02-22"),
    type: "expense",
    description: "Fuel top-up",
    category: "⛽ Fuel",
    amount: 63.5,
  },
  {
    date: new Date("2025-02-24"),
    type: "income",
    description: "Tax refund",
    category: "🏦 Refund",
    amount: 450,
  },
  {
    date: new Date("2025-02-26"),
    type: "expense",
    description: "Grocery shopping at Costco",
    category: "🛒 Groceries",
    amount: 132.8,
  },
  {
    date: new Date("2025-03-02"),
    type: "expense",
    description: "Spotify subscription",
    category: "📺 Subscriptions",
    amount: 9.99,
  },
  {
    date: new Date("2025-03-05"),
    type: "income",
    description: "Monthly paycheck from Acme Corp",
    category: "💸 Salary",
    amount: 1520,
  },
  {
    date: new Date("2025-03-08"),
    type: "expense",
    description: "Weekend trip - hotel booking",
    category: "✈️ Travel",
    amount: 320,
  },
  {
    date: new Date("2025-03-10"),
    type: "expense",
    description: "March apartment rent",
    category: "🏠 Rent",
    amount: 950,
  },
  {
    date: new Date("2025-03-13"),
    type: "expense",
    description: "Birthday present for Sarah",
    category: "🎁 Gifts",
    amount: 70,
  },
  {
    date: new Date("2025-03-15"),
    type: "income",
    description: "Freelance logo design project",
    category: "💼 Freelance Project",
    amount: 300,
  },
  {
    date: new Date("2025-03-18"),
    type: "expense",
    description: "New running shoes",
    category: "👟 Sports & Fitness",
    amount: 110,
  },
  {
    date: new Date("2025-03-20"),
    type: "expense",
    description: "Dinner with family",
    category: "🍽️ Dining Out",
    amount: 95,
  },
  {
    date: new Date("2025-03-23"),
    type: "income",
    description: "Investment portfolio gains",
    category: "📈 Investments",
    amount: 275,
  },
  {
    date: new Date("2025-03-25"),
    type: "expense",
    description: "Internet service bill",
    category: "💡 Utilities",
    amount: 55,
  },
  {
    date: new Date("2025-03-28"),
    type: "expense",
    description: "Car insurance payment",
    category: "🚗 Insurance",
    amount: 210,
  },
  {
    date: new Date("2025-04-02"),
    type: "income",
    description: "April paycheck from Acme Corp",
    category: "💸 Salary",
    amount: 1520,
  },
  {
    date: new Date("2025-04-04"),
    type: "expense",
    description: "Gym membership renewal",
    category: "👟 Sports & Fitness",
    amount: 50,
  },
  {
    date: new Date("2025-04-06"),
    type: "expense",
    description: "Weekly groceries at Trader Joe’s",
    category: "🛒 Groceries",
    amount: 98.3,
  },
  {
    date: new Date("2025-04-09"),
    type: "expense",
    description: "Lunch delivery - Thai food",
    category: "🥡 Food Delivery",
    amount: 32.6,
  },
  {
    date: new Date("2025-04-12"),
    type: "income",
    description: "Freelance website bug fixes",
    category: "💼 Freelance Project",
    amount: 200,
  },
  {
    date: new Date("2025-04-15"),
    type: "expense",
    description: "Electricity and gas utilities",
    category: "💡 Utilities",
    amount: 88.4,
  },
  {
    date: new Date("2025-04-18"),
    type: "expense",
    description: "Weekend cinema & snacks",
    category: "🎬 Entertainment",
    amount: 42.7,
  },
  {
    date: new Date("2025-04-20"),
    type: "income",
    description: "Sold old laptop on eBay",
    category: "🛍️ Sale",
    amount: 350,
  },
  {
    date: new Date("2025-04-23"),
    type: "expense",
    description: "Uber rides across town",
    category: "🚕 Transportation",
    amount: 26,
  },
  {
    date: new Date("2025-04-25"),
    type: "expense",
    description: "April rent payment",
    category: "🏠 Rent",
    amount: 950,
  },
  {
    date: new Date("2025-04-28"),
    type: "expense",
    description: "Birthday cake and balloons",
    category: "🎁 Gifts",
    amount: 64,
  },
  {
    date: new Date("2025-05-02"),
    type: "income",
    description: "May paycheck from Acme Corp",
    category: "💸 Salary",
    amount: 1530,
  },
  {
    date: new Date("2025-05-04"),
    type: "expense",
    description: "Pet food and toys",
    category: "🐾 Pets",
    amount: 75,
  },
  {
    date: new Date("2025-05-07"),
    type: "expense",
    description: "Lunch at Chipotle",
    category: "🍽️ Dining Out",
    amount: 18.5,
  },
  {
    date: new Date("2025-05-10"),
    type: "expense",
    description: "Weekend Airbnb booking",
    category: "✈️ Travel",
    amount: 240,
  },
  {
    date: new Date("2025-05-12"),
    type: "income",
    description: "Small freelance UI design gig",
    category: "💼 Freelance Project",
    amount: 150,
  },
  {
    date: new Date("2025-05-15"),
    type: "expense",
    description: "Weekly groceries at Walmart",
    category: "🛒 Groceries",
    amount: 127.5,
  },
  {
    date: new Date("2025-05-18"),
    type: "expense",
    description: "Car wash and detailing",
    category: "🚗 Car Maintenance",
    amount: 45,
  },
  {
    date: new Date("2025-05-21"),
    type: "income",
    description: "Dividend from tech stocks",
    category: "📈 Investments",
    amount: 325,
  },
  {
    date: new Date("2025-05-25"),
    type: "expense",
    description: "May rent payment",
    category: "🏠 Rent",
    amount: 950,
  },
];

async function main() {
  const userId = "user_30j7sxkMKYSuk96SADVl8NpTszT";

  // 1. User settings
  await prisma.userSettings.upsert({
    where: { userId },
    update: {},
    create: { userId, currency: "USD" },
  });

  // 2. Categories
  const uniqueCategories = Array.from(new Set(data.map((t) => t.category)));
  await prisma.category.createMany({
    data: uniqueCategories.map((cat) => {
      const match = cat.match(
        /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*(.*)$/u
      );
      const icon = match ? match[1] : "❓";
      const name = match ? match[2] : cat;
      const type = data.find((t) => t.category === cat)?.type || "expense";
      return { name, icon, type, userId };
    }),
    skipDuplicates: true,
  });

  // 3. Transactions
  for (const t of data) {
    const match = t.category.match(
      /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*(.*)$/u
    );
    const icon = match ? match[1] : "❓";
    const name = match ? match[2] : t.category;

    await prisma.transaction.create({
      data: {
        date: t.date,
        type: t.type,
        description: t.description,
        category: name,
        categoryIcon: icon,
        amount: t.amount,
        userId,
      },
    });
  }

  // 4. MonthHistory & YearHistory maps
  const monthMap = new Map<string, { income: number; expense: number }>();
  const yearMap = new Map<string, { income: number; expense: number }>();

  for (const t of data) {
    const d = t.date;
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const monthKey = `${year}-${month}-${day}`;
    if (!monthMap.has(monthKey))
      monthMap.set(monthKey, { income: 0, expense: 0 });
    if (t.type === "income") monthMap.get(monthKey)!.income += t.amount;
    else monthMap.get(monthKey)!.expense += t.amount;

    const yearKey = `${year}-${month}`;
    if (!yearMap.has(yearKey)) yearMap.set(yearKey, { income: 0, expense: 0 });
    if (t.type === "income") yearMap.get(yearKey)!.income += t.amount;
    else yearMap.get(yearKey)!.expense += t.amount;
  }

  // 5. MonthHistory
  for (const [key, totals] of monthMap.entries()) {
    const [year, month, day] = key.split("-");
    await prisma.monthHistory.upsert({
      where: {
        day_month_year_userId: {
          day: parseInt(day),
          month: parseInt(month),
          year: parseInt(year),
          userId,
        },
      },
      update: {},
      create: {
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
        income: totals.income,
        expense: totals.expense,
        userId,
      },
    });
  }

  // 6. YearHistory
  for (const [key, totals] of yearMap.entries()) {
    const [year, month] = key.split("-");
    await prisma.yearHistory.upsert({
      where: {
        month_year_userId: {
          month: parseInt(month),
          year: parseInt(year),
          userId,
        },
      },
      update: {},
      create: {
        month: parseInt(month),
        year: parseInt(year),
        income: totals.income,
        expense: totals.expense,
        userId,
      },
    });
  }

  console.log("✅ Seeding done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
