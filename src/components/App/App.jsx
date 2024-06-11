// import TaskForm from "first";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/tasksOps";

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.tasks.loading);
  const isError = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <main>
      <h1>HTTP request with Redux</h1>
      <TaskForm />
      {isLoading && <Loader>Loading messages</Loader>}
      {isError && <Error>Error message</Error>}
      <TaskList />
    </main>
  );
}
