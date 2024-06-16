import EditIcon from "@/app/components/common/icons/Edit";

interface ListProps {
  id: number;
  name: string;
  balance: number;
  expenseRatio: number;
}

interface Props {
  wallets: ListProps[];
  selectedWalletId: number;
  selectWalletHandler: (walletId: number) => void;
}

const Lists: React.FC<Props> = ({
  wallets,
  selectedWalletId,
  selectWalletHandler,
}) => {
  return (
    <div className="space-y-5 w-full md:w-3/12">
      {wallets.map((wallet) => (
        <div
          className={`card flex justify-between items-center gap-2 cursor-pointer ${
            selectedWalletId === wallet.id && "bgGradient"
          }`}
          key={wallet.id}
          onClick={() => selectWalletHandler(wallet.id)}
        >
          <div>
            <p
              className={`text2 ${
                selectedWalletId === wallet.id && "text-slate-200"
              }`}
            >
              {wallet.name}
            </p>
            <p
              className={
                selectedWalletId === wallet.id
                  ? `font-medium text-slate-300`
                  : "text3"
              }
            >
              {wallet.balance}
            </p>
          </div>
          <EditIcon
            className={`size-7 text-primary bg-slate-100 dark:bg-slate-600 rounded-md p-1.5 ${
              selectedWalletId === wallet.id && "dark:bg-slate-100"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default Lists;
