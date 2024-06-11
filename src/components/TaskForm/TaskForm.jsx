import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/tasksOps";

export default function TaskForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addTask(values));
    actions.resetForm();
  };
  return (
    <Formik initialValues={{ text: "" }} onSubmit={handleSubmit}>
      <Form>
        <Field name="text" placeholder="Enter task text..." />
        <button type="submit">Add Task</button>
      </Form>
    </Formik>
  );
}
