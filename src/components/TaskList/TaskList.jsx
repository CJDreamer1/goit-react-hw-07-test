import Task from "../App/Task/Task";
import { useSelector } from "react-redux";
import { selectTextFilter } from "../../redux/filtersSlice";
import { selectTasks, selectVisibleTasks } from "../../redux/tasksSlice";

export default function TaskList() {
  //   const tasks = useSelector(selectTasks);
  //   const textFilter = useSelector(selectTextFilter);

  //   const visibleTasks = tasks.filter((task) =>
  //     task.text.toLowerCase().includes(textFilter.toLowerCase())
  //   );

  // заміняєо текст зверху текстом знизу, який є селектором(і ми його описали в taskSlice)
  // це працює тільки якшо операція відбувається з шматочків redux стану. В Селекторі не можуть брати участь пропси або стан комонента.
  // у разі, якщо для обчислення треба пропси, або стан компонента - обчислюємо в компоненті
  const tasks = useSelector(selectVisibleTasks);

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
