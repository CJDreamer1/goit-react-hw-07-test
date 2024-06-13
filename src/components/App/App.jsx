// import TaskForm from "first";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskCounter from "../TaskCounter/TaskCounter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/tasksOps";
import TextFilter from "../TextFilter/TextFilter";
import { selectLoading, selectError } from "../../redux/tasksSlice";

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <main>
      <h1>HTTP request with Redux</h1>
      <TaskCounter />
      <TaskForm />
      <TextFilter />
      {isLoading && <Loader>Loading messages</Loader>}
      {isError && <Error>Error message</Error>}
      <TaskList />
    </main>
  );
}
