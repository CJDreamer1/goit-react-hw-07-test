import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../";
import TasksList from "../../components/TaskList/TaskList";
import TaskEditor from "../";
import { fetchTasks } from "../../redux/tasks/operations";
import { selectLoading } from "../../redux/tasks/selectors";

export default function TasksPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <PageTitle>Your tasks</PageTitle>
      <TaskEditor />
      <div>{isLoading && "Request in progress..."}</div>
      <TasksList />
    </>
  );
}
