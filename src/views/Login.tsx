import Button from "react-bootstrap/Button";
import React from "react";
import FormInput from "../components/atoms/FormInput";
import { Formik, Form } from "formik";
import { loginValidationSchema } from "../helpers/formValidations/loginValidations";

const Login: React.FC = () => {
  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {

    
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 92, 172, 0.06)" }}
      className="bg-gray-200 vw-100 vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={loginValidationSchema}
        render={({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <Form
            className="d-flex justify-content-center align-items-center flex-column bg-white border p-4 shadow-sm"
            style={{ width: "350px" }}
          >
            <h2>Inicio de sesión</h2>
            <FormInput
              label="Ingrese email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
              isInvalid={!!errors.email && !!touched.email}
            />

            <FormInput
              label="Ingrese contraseña"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              value={values.password}
              isInvalid={!!errors.password && !!touched.password}
            />
            {errors.email && touched.email ? (
              <div className="text-danger mb-3">{errors.email}</div>
            ) : null}

            {errors.password && touched.password ? (
              <div className="text-danger mb-3">{errors.password}</div>
            ) : null}

            <Button
              type="submit"
              style={{ backgroundColor: "rgba(0, 92, 172, 8)" }}
            >
              Iniciar Sesión
            </Button>
          </Form>
        )}
      />
    </div>
  );
};

export default Login;
