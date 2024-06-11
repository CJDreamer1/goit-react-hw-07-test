import Task from "../App/Task/Task";
import { useSelector } from "react-redux";

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks.items);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}
