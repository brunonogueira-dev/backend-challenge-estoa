import { IDate } from "../interfaces/IDate";

export default function getTimes(date: Date): IDate {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return { year, month, day };
}