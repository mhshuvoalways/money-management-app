const timeCalFunc = (selectTime: string) => {
  let timeWord = "";
  if (selectTime === "daily") {
    timeWord = "day";
  } else if (selectTime === "weekly") {
    timeWord = "week";
  } else if (selectTime === "monthly") {
    timeWord = "month";
  } else if (selectTime === "yearly") {
    timeWord = "year";
  }
  return timeWord;
};

export default timeCalFunc;
