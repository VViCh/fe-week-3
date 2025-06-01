import { useState } from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ title, count, tasks, onToggleComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const getTaskStatus = (taskDate) => {
    const today = new Date();
    if (taskDate.isSame(today, "day")) {
      return "today";
    } else if (
      taskDate.isSame(new Date(today.setDate(today.getDate() + 1)), "day")
    ) {
      return "tomorrow";
    } else {
      return "upcoming";
    }
  };

  return (
    <div className="taskList">
      <div className="dropdownToggle" onClick={toggleOpen}>
        <span className={`chevronIcon ${isOpen ? "open" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={14}
            height={14}
            style={{ fill: "#000000" }}
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </span>
        <span className="title">
          {title} <span className="badge">{count}</span>
        </span>
      </div>

      <div className={`taskListContainer ${isOpen ? "open" : "closed"}`}>
        <div className="taskListItems">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                status={getTaskStatus(task.date)}
              />
            ))
          ) : (
            <div className="noTasks">No tasks available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
