import { useDispatch } from "react-redux";
import { deleteTask } from "../../../redux/tasksOps";

export default function Task({ task }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };
  return (
    <div>
      <p>Text{task.text}</p>
      <p>Completed:{task.completed}</p>
      <p>{task.createdAt}</p>
      <p>id:{task.id}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
