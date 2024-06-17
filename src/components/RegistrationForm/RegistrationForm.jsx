import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      // в unwrap можна вивести помилку в iziToast в alert
      .unwrap()
      .catch(() => {
        alert("Registration Error!");
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <label>
          Usename
          <Field type="text" name="name"></Field>
        </label>
        <label>
          Email
          <Field type="email" name="email"></Field>
        </label>
        <label>
          Password
          <Field type="password" name="password"></Field>
        </label>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
