import moment from "moment";

export const hardRefreshAndEmptyCache = async () => {
  if ("caches" in window) {
    try {
      const keys = await caches.keys();
      keys.forEach((key) => {
        // Delete all the cache files
        caches.delete(key);
      });
    } catch (error) {}
  }
  window.location.reload();
};

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}
export const getTitleCaseSentence = (str: string) => {
  if (!str) {
    return "";
  }
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
};

export const isMomentObject = (value: any) => {
  return moment.isMoment(value);
};
export const getAbbreviation = (inputString: string) => {
  const words = inputString.trim().split(/\s+/);
  const abbreviation = words.map((word) => word[0].toUpperCase()).join("");
  return abbreviation;
};
export const isJSONString = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getMonthName = (monthNumber: number) => {
  return monthNames[monthNumber - 1];
};

export const formatTodayDate = (date: Date) => {
  const now = moment();
  const givenDate = moment(date);

  if (givenDate.isSame(now, "day")) {
    return `Today @ ${givenDate.format("hh:mm A")}`;
  } else {
    return givenDate.format("MMMM Do YYYY @ hh:mm A"); // Fallback for non-today dates
  }
};

export const getYearMonthDate = (dateInput: Date) => {
  const date = moment(dateInput);

  const year = date.format("YYYY");
  const monthName = date.format("MMM");
  const day = date.format("DD");

  return {
    year,
    monthName,
    day,
  };
};
export const getParams = (location: any) => {
  let searchParams = new URLSearchParams(location.search);
  return {
    query: searchParams.get("query") || "",
  };
};

export const setParams = (key: string, value: string) => {
  let searchParams = new URLSearchParams();
  searchParams.append(key, value || "");
  return searchParams.toString();
};
