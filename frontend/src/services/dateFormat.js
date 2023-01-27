/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
const formatDate = (date) => {
  let timestampForMysql = new Date(date);
  const offset = timestampForMysql.getTimezoneOffset();

  timestampForMysql.setMinutes(timestampForMysql.getMinutes() + offset * -1);
  const newDate = timestampForMysql.toISOString();

  const splitDate = newDate.split("T");
  const splitYMD = splitDate[0].split("-");
  const hour = splitDate[1].split(".");
  hour.pop();

  const year = splitYMD[0];
  const month = splitYMD[1];
  const day = splitYMD[2];

  return {
    originalDate: date,
    year: year,
    month: month,
    day: day,
    hour: hour[0],
    fullYMD: splitDate[0],
    fullDMY: `${day}/${month}/${year}`,
  };
};

export default formatDate;
