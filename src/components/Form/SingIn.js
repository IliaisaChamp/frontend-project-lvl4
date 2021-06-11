import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import TextField from './TextField.js';
import Button from './Button.js';
import useHttp from '../../hooks/http.hook.js';
import AuthContext from '../../context/AuthContext.js';

const schema = Yup.object().shape({
  username: Yup.string(),
  password: Yup.string(),
});

export default function SingIn() {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        try {
          const { data } = await request('/api/v1/login', 'POST', { ...values });
          auth.login(data.token, data.username);
        } catch (e) {
          console.log(e);
        }
        setSubmitting(true);
      }}
    >
      {({ isSubmitting }) => (
        <>
          <Form>
            <h1 className="mb-4">{t('form.title')}</h1>
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
            </div>
            <Button text={t('button.go')} isSubmitting={isSubmitting} />
          </Form>
        </>
      )}
    </Formik>
  );
}
