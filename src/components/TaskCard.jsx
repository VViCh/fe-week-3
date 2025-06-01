import Badge from "./Badge";

const TaskCard = ({ task, onToggleComplete, status }) => {
  const formatDate = (date, status) => {
    if (status === "today") {
      return "Today";
    } else if (status === "tomorrow") {
      return "Tomorrow";
    } else {
      return date.format("ddd, DD MMM");
    }
  };

  return (
    <div className={`taskCard ${task.isDone ? "completed" : ""}`}>
      <div className="taskCheckboxLabel">
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.isDone}
          onChange={() => onToggleComplete(task.id)}
        />
        <label htmlFor={`task-${task.id}`}>{task.text}</label>
      </div>
      <Badge className={status} text={formatDate(task.date, status)} />
    </div>
  );
};

export default TaskCard;
