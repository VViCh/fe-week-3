import { useEffect, useState } from "react";
import Moment from "moment";
import "./App.css";
import TaskList from "./components/TaskList.jsx";

function App() {
  const currentDate = new Moment();
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [formData, setFormData] = useState({
    task: "",
    dueDate: currentDate.format("YYYY-MM-DD"),
    isDone: false,
  });

  useEffect(() => {
    const today = tasks.filter((task) => task.date.isSame(currentDate, "day"));
    const upcoming = tasks.filter((task) =>
      task.date.isAfter(currentDate, "day")
    ).sort((a, b) => a.date - b.date);

    setTodayTasks(today);
    setUpcomingTasks(upcoming);
  }, [tasks]);

  useEffect(() => {
    const initialTasks = [
      { id: 1, text: "Weekly Standup FAVE", date: new Moment(), isDone: false },
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
      { id: 8, text: "Hidup", date: new Moment().add(1, "day"), isDone: false },
      {
        id: 9,
        text: "Panitia Onsite TechnoFest",
        date: new Moment().subtract(5, "days"),
        isDone: true,
      },
      { id: 10, text: "QC dengan Kezia", date: new Moment(), isDone: false },
    ];
    setTasks(initialTasks);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!formData.task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: formData.task,
      date: new Moment(formData.dueDate),
      isDone: false,
    };

    setTasks([...tasks, newTask]);

    setFormData({
      task: "",
      dueDate: currentDate.format("YYYY-MM-DD"),
      isDone: false,
    });
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Good Morning, User 👋</h1>
          <p>It's {currentDate.format("dddd, DD MMMM YYYY")}</p>
        </div>

        <div className="createTask">
          <div className="createTaskGroup">
            <label htmlFor="task-input">What do you want to do?</label>
            <input
              id="task-input"
              type="text"
              name="task"
              placeholder="Study for mid exams..."
              onChange={handleInputChange}
              value={formData.task}
            />
          </div>
          <div className="createTaskGroup">
            <label htmlFor="date-input">When should it be done?</label>
            <input
              id="date-input"
              type="date"
              name="dueDate"
              onChange={handleInputChange}
              value={formData.dueDate}
            />
          </div>
          <div className="createTaskGroup">
            <p>&nbsp;</p>
            <button onClick={handleSubmit}>Create</button>
          </div>
        </div>

        <div>
          <TaskList
            title="Today"
            count={todayTasks.length}
            tasks={todayTasks}
            onToggleComplete={handleToggleComplete}
          />
          <TaskList
            title="Other"
            count={upcomingTasks.length}
            tasks={upcomingTasks}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>
    </>
  );
}

export default App;
