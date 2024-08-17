"use client";

import Button from "@/app/components/common/button/GradientButton";
import LoadingButton from "@/app/components/common/button/LoadingButton";
import NoGradientButton from "@/app/components/common/button/NoGradientButton";

interface Props {
  subTitle?: String;
  closeHandler: () => void;
  onSubmitHandler: () => void;
  isLoading: boolean;
}

const ConfirmDeleteDialog: React.FC<Props> = ({
  subTitle,
  closeHandler,
  onSubmitHandler,
  isLoading,
}) => {
  return (
    <>
      <p className="text2 text-center">Are you sure you want to delete?</p>
      {subTitle && (
        <p className="opacity-70 text-center mt-2">{`If you delete, there will be no option to filter income & expense with the ${subTitle}!`}</p>
      )}
      <div className="flex items-center gap-10 justify-between mt-10">
        <NoGradientButton
          onClick={closeHandler}
          name={"No"}
          className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 py-2 px-5"
        />
        {isLoading ? (
          <LoadingButton className="w-full" />
        ) : (
          <Button name={"Yes"} className="w-full" onClick={onSubmitHandler} />
        )}
      </div>
    </>
  );
};

export default ConfirmDeleteDialog;
