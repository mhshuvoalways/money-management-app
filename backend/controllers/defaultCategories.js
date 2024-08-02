const CategoryModel = require("../models/CategoryModel");

const categories = [
  {
    categoryName: "Salary",
    categoryType: "Income",
    icon: {
      emoji: "💰",
      bgColor: "#FFD700", // Gold
    },
  },
  {
    categoryName: "Allowance",
    categoryType: "Income",
    icon: {
      emoji: "🤑",
      bgColor: "#00FF00", // Green
    },
  },
  {
    categoryName: "Petty cash",
    categoryType: "Income",
    icon: {
      emoji: "💵",
      bgColor: "#00FF7F", // Spring Green
    },
  },
  {
    categoryName: "Bonus",
    categoryType: "Income",
    icon: {
      emoji: "🎁",
      bgColor: "#FF69B4", // Hot Pink
    },
  },
  {
    categoryName: "Other",
    categoryType: "Income",
    icon: {
      emoji: "🗂️",
      bgColor: "#D3D3D3", // Light Gray
    },
  },
  {
    categoryName: "Food",
    categoryType: "Expense",
    icon: {
      emoji: "🍉",
      bgColor: "#FF6347", // Tomato
    },
  },
  {
    categoryName: "Social life",
    categoryType: "Expense",
    icon: {
      emoji: "🧑‍🤝‍🧑",
      bgColor: "#1E90FF", // Dodger Blue
    },
  },
  {
    categoryName: "Pets",
    categoryType: "Expense",
    icon: {
      emoji: "🐶",
      bgColor: "#FFA500", // Orange
    },
  },
  {
    categoryName: "Transport",
    categoryType: "Expense",
    icon: {
      emoji: "🚌",
      bgColor: "#FFD700", // Gold
    },
  },
  {
    categoryName: "Culture",
    categoryType: "Expense",
    icon: {
      emoji: "🖼️",
      bgColor: "#8A2BE2", // Blue Violet
    },
  },
  {
    categoryName: "Household",
    categoryType: "Expense",
    icon: {
      emoji: "🏠",
      bgColor: "#4682B4", // Steel Blue
    },
  },
  {
    categoryName: "Apparel",
    categoryType: "Expense",
    icon: {
      emoji: "👕",
      bgColor: "#FF4500", // Orange Red
    },
  },
  {
    categoryName: "Beauty",
    categoryType: "Expense",
    icon: {
      emoji: "💄",
      bgColor: "#FF1493", // Deep Pink
    },
  },
  {
    categoryName: "Health",
    categoryType: "Expense",
    icon: {
      emoji: "🧑‍⚕️",
      bgColor: "#32CD32", // Lime Green
    },
  },
  {
    categoryName: "Education",
    categoryType: "Expense",
    icon: {
      emoji: "📘",
      bgColor: "#1E90FF", // Dodger Blue
    },
  },
  {
    categoryName: "Gift",
    categoryType: "Expense",
    icon: {
      emoji: "🎁",
      bgColor: "#FF69B4", // Hot Pink
    },
  },
  {
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
