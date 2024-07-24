"use client";

import Button from "@/app/components/common/button/GradientButton";
import NoGradientButton from "@/app/components/common/button/NoGradientButton";
import { closeDialog, deleteWallet } from "@/app/lib/features/walletSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";

interface Props {
  subTitle?: String;
}

const ConfirmDeleteDialog: React.FC<Props> = ({ subTitle }) => {
  const { walletObj } = useAppSelector((state: RootState) => state.wallet);

  const dispatch = useAppDispatch();

  const onSubmitHandler = () => {
    if (walletObj._id) {
      dispatch(deleteWallet(walletObj._id));
    }
  };

  return (
    <>
      <p className="text2 text-center">Are you sure you want to delete?</p>
      {subTitle && (
        <p className="opacity-70 text-center mt-2">{`If you delete, there will be no option to filter income & expense with the ${subTitle}!`}</p>
      )}
      <div className="flex items-center gap-10 justify-between mt-10">
        <NoGradientButton
          onClick={() => dispatch(closeDialog())}
          name={"No"}
          className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 py-2 px-5"
        />
        <Button name={"Yes"} className="w-full" onClick={onSubmitHandler} />
      </div>
    </>
  );
};

export default ConfirmDeleteDialog;
