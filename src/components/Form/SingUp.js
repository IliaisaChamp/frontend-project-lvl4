import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import TextField from './TextField.js';
import Button from './Button.js';
import useHttp from '../../hooks/http.hook.js';
import AuthContext from '../../context/AuthContext.js';

export default function SingUp() {
  const schema = useValidateSchema();
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        setSubmitting(false);
        try {
          const { data } = await request('/api/v1/signup', 'POST', { ...values });
          auth.login(data.token, data.username);
        } catch (e) {
          if (e.response.status === 409) {
            setFieldError('username', t('form.errors.409'));
          }
        }
        setSubmitting(true);
      }}
    >
      {({ isSubmitting }) => (
        <>
          <Form>
            <h1 className="mb-4">{t('form.title_reg')}</h1>
            <div className="col mb-3">
              <TextField
                label={t('form.name')}
                name="username"
                type="text"
                placeholder={t('form.name')}
              />
              <TextField
                label={t('form.password')}
                name="password"
                type="password"
                placeholder={t('form.password')}
              />
              <TextField
                label={t('form.confirm')}
                name="passwordConfirmation"
                type="password"
                placeholder={t('form.confirm')}
              />
            </div>
            <Button text={t('button.reg')} isSubmitting={isSubmitting} />
          </Form>
        </>
      )}
    </Formik>
  );
}

function useValidateSchema() {
  const schema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Пароли должны совпадать',
    ),
  });

  return schema;
}
