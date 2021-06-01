import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextField from './TextField.js';
import Button from './Button.js';
import useHttp from '../../hooks/http.hook.js';
import AuthContext from '../../context/AuthContext.js';

const schema = Yup.object().shape({
  username: Yup.string().required('Введите логин'),
  password: Yup.string().required('Введите пароль'),
});

export default function SingIn() {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        try {
          const { data } = await request('/api/v1/login', { ...values });
          auth.login(data.token, data.userId);
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {({ isSubmitting }) => (
        <>
          <Form>
            <h1 className="mb-4">Войти</h1>
            <div className="col mb-3">
              <TextField
                label="Ваш ник"
                name="username"
                type="text"
                placeholder="Ваш ник"
              />
              <TextField
                label="Пароль"
                name="password"
                type="password"
                placeholder="Пароль"
              />
            </div>
            <Button text="Войти" isSubmitting={isSubmitting} />
          </Form>
        </>
      )}
    </Formik>
  );
}
