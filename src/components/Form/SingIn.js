import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextField from './TextField.js';
import Button from './Button.js';

const schema = Yup.object().shape({
  username: Yup.string().required('Введите логин'),
  password: Yup.string().required('Введите пароль'),
});

export default function LoginForm() {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
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
            <Button text="Войти" />
          </Form>
        </>
      )}
    </Formik>
  );
}
