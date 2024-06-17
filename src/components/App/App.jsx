import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskCounter from "../TaskCounter/TaskCounter";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/tasksOps";
import TextFilter from "../TextFilter/TextFilter";
import { selectLoading, selectError } from "../../redux/tasksSlice";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // const HomePage = lazy(() => import(""));
  const RegisterPage = lazy(() =>
    import("../../pages/RegisterPage/RegisterPage")
  );
  // const LoginPage = lazy(() => import(""));
  // const TasksPage = lazy(() => import(""));

  return (
    <main>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            {/* <Route path="/" element={HomePage} /> */}
            <Route path="/register" element={RegisterPage} />
            {/* <Route path="/login" element={LoginPage} /> */}
            {/* <Route path="/tasks" element={TasksPage} /> */}
          </Routes>
        </Suspense>
      </Layout>

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
