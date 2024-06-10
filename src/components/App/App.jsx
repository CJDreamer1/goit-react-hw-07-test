// import TaskForm from "first";
// import Error from "first";
// import Loader from "first";
// import TaskList from "first";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchTasks from "../../redux/tasksOps";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <main>
      <h1>HTTP request with Redux</h1>
      {/* <TaskForm /> */}
      {/* <Loader>Loading messages</Loader> */}
      {/* <Error>Error message</Error> */}
      {/* <TaskList /> */}
    </main>
  );
}
