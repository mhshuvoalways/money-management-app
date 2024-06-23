"use client";

import Search from "@/app/components/common/input/Input";

interface Props {}

const List: React.FC<Props> = () => {
  return (
    <div className="space-y-4">
      <Search placeholder="Min amount" type={"number"} />
      <Search placeholder="Max amount" type={"number"} />
    </div>
  );
};

export default List;
