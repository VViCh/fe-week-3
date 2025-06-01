import { useEffect, useState } from "react";
import Moment from "moment";
import "./App.css";
import TaskList from "./components/TaskList.jsx";
import { initialTasks } from "./constants/data.js";

function App() {
  const [currentDate, setCurrentDate] = useState(new Moment());
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
    const upcoming = tasks
      .filter((task) => task.date.isAfter(currentDate, "day"))
      .sort((a, b) => a.date - b.date);

    setTodayTasks(today);
    setUpcomingTasks(upcoming);
  }, [tasks]);

  useEffect(() => {
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

    if (!formData.task.trim()) return;

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
