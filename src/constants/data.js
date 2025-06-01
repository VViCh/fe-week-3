import Moment from "moment";

export const initialTasks = [
  {
    id: 1,
    text: "Weekly Standup FAVE",
    date: new Moment(),
    isDone: false,
  },
  { id: 2, text: "TeRe", date: new Moment(), isDone: true },
  { id: 3, text: "Makan", date: new Moment(), isDone: false },
  { id: 4, text: "Hidup", date: new Moment(), isDone: true },
  {
    id: 5,
    text: "Quiz SciComp LEC",
    date: new Moment().add(1, "day"),
    isDone: false,
  },
  {
    id: 6,
    text: "Quiz HCI LEC",
    date: new Moment().add(2, "days"),
    isDone: false,
  },
  {
    id: 7,
    text: "Quiz Data Structure",
    date: new Moment().add(3, "days"),
    isDone: false,
  },
  { id: 8, text: "Tidur", date: new Moment().add(1, "day"), isDone: false },
  { id: 9, text: "Hidup", date: new Moment().add(1, "day"), isDone: false },
  {
    id: 10,
    text: "Panitia Onsite TechnoFest",
    date: new Moment().subtract(5, "days"),
    isDone: true,
  },
  { id: 11, text: "QC dengan Kezia", date: new Moment(), isDone: false },
];
