const CategoryModel = require("../models/CategoryModel");

const categories = [
  {
    categoryPosition: 1,
    categoryName: "Salary",
    categoryType: "Income",
    icon: {
      emoji: "💰",
      bgColor: "#FFD700", // Gold
    },
  },
  {
    categoryPosition: 2,
    categoryName: "Allowance",
    categoryType: "Income",
    icon: {
      emoji: "🤑",
      bgColor: "#00FF00", // Green
    },
  },
  {
    categoryPosition: 3,
    categoryName: "Petty cash",
    categoryType: "Income",
    icon: {
      emoji: "💵",
      bgColor: "#00FF7F", // Spring Green
    },
  },
  {
    categoryPosition: 4,
    categoryName: "Bonus",
    categoryType: "Income",
    icon: {
      emoji: "🎁",
      bgColor: "#FF69B4", // Hot Pink
    },
  },
  {
    categoryPosition: 5,
    categoryName: "Other",
    categoryType: "Income",
    icon: {
      emoji: "🗂️",
      bgColor: "#D3D3D3", // Light Gray
    },
  },
  // Expense
  {
    categoryPosition: 6,
    categoryName: "Food",
    categoryType: "Expense",
    icon: {
      emoji: "🍉",
      bgColor: "#FF6347", // Tomato
    },
  },
  {
    categoryPosition: 7,
    categoryName: "Electronic",
    categoryType: "Expense",
    icon: {
      emoji: "📱",
      bgColor: "#4682B4", // Steel Blue
    },
  },
  {
    categoryPosition: 8,
    categoryName: "Household",
    categoryType: "Expense",
    icon: {
      emoji: "🏠",
      bgColor: "#4682B4", // Steel Blue
    },
  },
  {
    categoryPosition: 9,
    categoryName: "Apparel",
    categoryType: "Expense",
    icon: {
      emoji: "👕",
      bgColor: "#FF4500", // Orange Red
    },
  },
  {
    categoryPosition: 10,
    categoryName: "Health",
    categoryType: "Expense",
    icon: {
      emoji: "🧑‍⚕️",
      bgColor: "#32CD32", // Lime Green
    },
  },
  {
    categoryPosition: 11,
    categoryName: "Education",
    categoryType: "Expense",
    icon: {
      emoji: "📘",
      bgColor: "#1E90FF", // Dodger Blue
    },
  },
  {
    categoryPosition: 12,
    categoryName: "Transport",
    categoryType: "Expense",
    icon: {
      emoji: "🚌",
      bgColor: "#FFD700", // Gold
    },
  },
  {
    categoryPosition: 13,
    categoryName: "Beauty",
    categoryType: "Expense",
    icon: {
      emoji: "💄",
      bgColor: "#FF1493", // Deep Pink
    },
  },
  {
    categoryPosition: 14,
    categoryName: "Social life",
    categoryType: "Expense",
    icon: {
      emoji: "🧑‍🤝‍🧑",
      bgColor: "#1E90FF", // Dodger Blue
    },
  },
  {
    categoryPosition: 15,
    categoryName: "Culture",
    categoryType: "Expense",
    icon: {
      emoji: "🖼️",
      bgColor: "#8A2BE2", // Blue Violet
    },
  },
  {
    categoryPosition: 16,
    categoryName: "Gift",
    categoryType: "Expense",
    icon: {
      emoji: "🎁",
      bgColor: "#FF69B4", // Hot Pink
    },
  },
  {
    categoryPosition: 17,
    categoryName: "Pets",
    categoryType: "Expense",
    icon: {
      emoji: "🐶",
      bgColor: "#FFA500", // Orange
    },
  },
  {
    categoryPosition: 18,
    categoryName: "Other",
    categoryType: "Expense",
    icon: {
      emoji: "🗂️",
      bgColor: "#D3D3D3", // Light Gray
    },
  },
];

const defaultCategories = (userId) => {
  if (userId) {
    const newArray = categories.map((category) => ({
      user: userId,
      ...category,
    }));
    CategoryModel.findOne({ user: userId })
      .then((response) => {
        if (!response) {
          CategoryModel.insertMany(newArray)
            .then(() => {})
            .catch(() => {});
        }
      })
      .catch(() => {});
  }
};

module.exports = defaultCategories;
