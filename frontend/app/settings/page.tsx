"use client";

import AddCategory from "@/app/components/categories/AddCategory";
import Items from "@/app/components/categories/Items";
import ConfirmDeleteDialog from "@/app/components/common/dialog/ConfirmDelete";
import Header from "@/app/components/common/header";
import Dialog from "@/app/components/common/headlessui/Dialog";
import SettingsHeader from "@/app/components/settings/header";
import {
  clearUpdateObj,
  deleteCategory,
} from "@/app/lib/features/categorySlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

const CategoryPage = () => {
  const { categories, category, dialog, isLoading } = useAppSelector(
    (state: RootState) => state.category
  );

  const dispatch = useAppDispatch();

  const incomeCategories = categories.filter(
    (cate) => cate.categoryType === "Income"
  );

  const expenseCategories = categories.filter(
    (cate) => cate.categoryType === "Expense"
  );

  return (
    <Header>
      <p className="text1">Settings!</p>
      <p className="text3">{`Here's what's happening with your settings.`}</p>
      <SettingsHeader />
      <div className="flex mt-10 gap-10 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-4/12 space-y-10">
          <AddCategory />
        </div>
        <div className="w-full lg:w-8/12 space-y-10">
          <Items categoryType="Income" categories={incomeCategories} />
          <Items categoryType="Expense" categories={expenseCategories} />
        </div>
      </div>
      <Dialog
        isOpen={dialog}
        title="Delete Transaction"
        openHandler={() => dispatch(clearUpdateObj())}
      >
        <ConfirmDeleteDialog
          subTitle={"category"}
          closeHandler={() => dispatch(clearUpdateObj())}
          onSubmitHandler={() => dispatch(deleteCategory(category._id))}
          isLoading={isLoading}
        />
      </Dialog>
    </Header>
  );
};

export default CategoryPage;
