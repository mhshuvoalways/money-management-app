"use client";

import AddCategory from "@/app/components/categories/AddCategory";
import Items from "@/app/components/categories/Items";
import Header from "@/app/components/common/header";
import SettingsHeader from "@/app/components/settings/header";
import { RootState } from "@/app/lib/store";
import { useEffect, useState } from "react";
import { getCategories } from "../lib/features/categorySlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { PostCategoryType } from "../types/CategoryType";

const CategoryPage = () => {
  const [category, setCategory] = useState<PostCategoryType>({});

  const { categories } = useAppSelector((state: RootState) => state.category);

  const incomeCategories = categories.filter(
    (cate) => cate.categoryType === "Income"
  );

  const expenseCategories = categories.filter(
    (cate) => cate.categoryType === "Expense"
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Header>
      <p className="text1">Settings!</p>
      <p className="text3">{`Here's what's happening with your settings.`}</p>
      <SettingsHeader />
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <AddCategory categoryObj={category} />
        </div>
        <div className="w-full lg:w-8/12 space-y-10">
          <Items
            categoryType="Income"
            categories={incomeCategories}
            setCategory={setCategory}
          />
          <Items
            categoryType="Expense"
            categories={expenseCategories}
            setCategory={setCategory}
          />
        </div>
      </div>
    </Header>
  );
};

export default CategoryPage;
