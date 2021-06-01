import React from 'react';

import SingUp from '../components/Form/SingUp.js';
import FormWrapper from '../components/Form/FormWrapper.js';

export default function Login() {
  return (
    <FormWrapper text="Уже есть аккаунт?" linkText="Войти" link="/login">
      <SingUp />
    </FormWrapper>
  );
}
