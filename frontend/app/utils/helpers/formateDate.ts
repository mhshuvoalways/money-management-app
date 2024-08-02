import moment from "moment";

const formateDate = (date?: Date) => {
  if (date) {
    return moment(date).format("LL");
  }
};

export default formateDate;
