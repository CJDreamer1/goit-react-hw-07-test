import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskCounter from "../TaskCounter/TaskCounter";
import { RestrictedRoute } from "../RestrictedRoute";
import { PrivateRoute } from "../RestrictedRoute";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/tasksOps";
import TextFilter from "../TextFilter/TextFilter";
import { selectLoading, selectError } from "../../redux/tasksSlice";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";

// const HomePage = lazy(() => import(""));
const RegisterPage = lazy(() =>
  import("../../pages/RegisterPage/RegisterPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
// const TasksPage = lazy(() => import("../../pages/TaskPage/TaskPage"));

export default function App() {
  const dispatch = useDispatch();

  useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (selectIsRefreshing) {
    return null;
  }

  return (
    <main>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            {/* <Route path="/" element={HomePage} /> */}
            <Route
              path="/register"
              element={
                <RestrictedRoute component={<RegisterPage />} redirectTo="/" />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/tasks"
                />
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute component={<TasksPage />} redirectTo="/login" />
              }
            />
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
