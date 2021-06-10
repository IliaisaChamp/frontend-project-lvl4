import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextField from './TextField.js';
import Button from './Button.js';
import useHttp from '../../hooks/http.hook.js';
import AuthContext from '../../context/AuthContext.js';

export default function SingUp() {
  const schema = useValidateSchema();
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={schema}
      onSubmit={async (values, { setFieldError }) => {
        try {
          const { data } = await request('/api/v1/signup', 'POST', { ...values });
          auth.login(data.token, data.username);
        } catch (e) {
          if (e.response.status === 409) {
            setFieldError('username', 'Такой пользователь уже существует');
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <>
          <Form>
            <h1 className="mb-4">Войти</h1>
            <div className="col mb-3">
              <TextField label="Ваш ник" name="username" type="text" placeholder="Ваш ник" />
              <TextField label="Пароль" name="password" type="password" placeholder="Пароль" />
              <TextField
                label="Подтвердите пароль"
                name="passwordConfirmation"
                type="password"
                placeholder="Подтвердите пароль"
              />
            </div>
            <Button text="Зарегистрироваться" isSubmitting={isSubmitting} />
          </Form>
        </>
      )}
    </Formik>
  );
}

function useValidateSchema() {
  const schema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Ненадежный пароль')
      .max(20, 'Пароль слишком длинный')
      .required('Обязательное поле'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Пароль должен совпадать',
    ),
  });

  return schema;
}
