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
        <div className="dropdownHeader">
          <span className={`chevronIcon ${isOpen ? "open" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={12}
              height={12}
              style={{ fill: "#000000", display: "block" }}
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </span>
          <span
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              width: "18px",
              height: "18px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={18}
              height={18}
              style={{ fill: "#000000", display: "block" }}
            >
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z" />
            </svg>
          </span>
          <span className="title">
            {title} <span className="badge">{count}</span>
          </span>
        </div>
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
