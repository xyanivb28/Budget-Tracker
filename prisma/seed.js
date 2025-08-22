"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("../lib/generated/prisma");
var prisma = new prisma_1.PrismaClient();
var data = [
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var userId, uniqueCategories, _i, data_1, t, match, icon, name_1, monthMap, yearMap, _a, data_2, t, d, day, month, year, monthKey, yearKey, _b, _c, _d, key, totals, _e, year, month, day, _f, _g, _h, key, totals, _j, year, month;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    userId = "user_30j7sxkMKYSuk96SADVl8NpTszT";
                    // 1. Create user settings
                    return [4 /*yield*/, prisma.userSettings.upsert({
                            where: { userId: userId },
                            update: {},
                            create: {
                                userId: userId,
                                currency: "USD",
                            },
                        })];
                case 1:
                    // 1. Create user settings
                    _k.sent();
                    uniqueCategories = Array.from(new Set(data.map(function (t) { return t.category; })));
                    return [4 /*yield*/, prisma.category.createMany({
                            data: uniqueCategories.map(function (cat) {
                                var _a;
                                var match = cat.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*(.*)$/u);
                                var icon = match ? match[1] : "❓";
                                var name = match ? match[2] : cat;
                                var type = ((_a = data.find(function (t) { return t.category === cat; })) === null || _a === void 0 ? void 0 : _a.type) || "expense";
                                return {
                                    name: name,
                                    icon: icon,
                                    type: type,
                                    userId: userId,
                                };
                            }),
                            skipDuplicates: true,
                        })];
                case 2:
                    _k.sent();
                    _i = 0, data_1 = data;
                    _k.label = 3;
                case 3:
                    if (!(_i < data_1.length)) return [3 /*break*/, 6];
                    t = data_1[_i];
                    match = t.category.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*(.*)$/u);
                    icon = match ? match[1] : "❓";
                    name_1 = match ? match[2] : t.category;
                    return [4 /*yield*/, prisma.transaction.create({
                            data: {
                                date: t.date,
                                type: t.type,
                                description: t.description,
                                category: name_1,
                                categoryIcon: icon,
                                amount: t.amount,
                                userId: userId,
                            },
                        })];
                case 4:
                    _k.sent();
                    _k.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    monthMap = new Map();
                    yearMap = new Map();
                    for (_a = 0, data_2 = data; _a < data_2.length; _a++) {
                        t = data_2[_a];
                        d = t.date;
                        day = d.getDate();
                        month = d.getMonth() + 1;
                        year = d.getFullYear();
                        monthKey = "".concat(userId, "-").concat(year, "-").concat(month, "-").concat(day);
                        if (!monthMap.has(monthKey))
                            monthMap.set(monthKey, { income: 0, expense: 0 });
                        if (t.type === "income") {
                            monthMap.get(monthKey).income += t.amount;
                        }
                        else {
                            monthMap.get(monthKey).expense += t.amount;
                        }
                        yearKey = "".concat(userId, "-").concat(year, "-").concat(month);
                        if (!yearMap.has(yearKey))
                            yearMap.set(yearKey, { income: 0, expense: 0 });
                        if (t.type === "income") {
                            yearMap.get(yearKey).income += t.amount;
                        }
                        else {
                            yearMap.get(yearKey).expense += t.amount;
                        }
                    }
                    _b = 0, _c = monthMap.entries();
                    _k.label = 7;
                case 7:
                    if (!(_b < _c.length)) return [3 /*break*/, 10];
                    _d = _c[_b], key = _d[0], totals = _d[1];
                    _e = key.split("-"), year = _e[1], month = _e[2], day = _e[3];
                    return [4 /*yield*/, prisma.monthHistory.upsert({
                            where: {
                                day_month_year_userId: {
                                    day: parseInt(day),
                                    month: parseInt(month),
                                    year: parseInt(year),
                                    userId: userId,
                                },
                            },
                            update: {},
                            create: {
                                day: parseInt(day),
                                month: parseInt(month),
                                year: parseInt(year),
                                income: totals.income,
                                expense: totals.expense,
                                userId: userId,
                            },
                        })];
                case 8:
                    _k.sent();
                    _k.label = 9;
                case 9:
                    _b++;
                    return [3 /*break*/, 7];
                case 10:
                    _f = 0, _g = yearMap.entries();
                    _k.label = 11;
                case 11:
                    if (!(_f < _g.length)) return [3 /*break*/, 14];
                    _h = _g[_f], key = _h[0], totals = _h[1];
                    _j = key.split("-"), year = _j[1], month = _j[2];
                    return [4 /*yield*/, prisma.yearHistory.upsert({
                            where: {
                                month_year_userId: {
                                    month: parseInt(month),
                                    year: parseInt(year),
                                    userId: userId,
                                },
                            },
                            update: {},
                            create: {
                                month: parseInt(month),
                                year: parseInt(year),
                                income: totals.income,
                                expense: totals.expense,
                                userId: userId,
                            },
                        })];
                case 12:
                    _k.sent();
                    _k.label = 13;
                case 13:
                    _f++;
                    return [3 /*break*/, 11];
                case 14:
                    console.log("✅ Seeding done!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
