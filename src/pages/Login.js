import React from 'react';

import SingIn from '../components/Form/SingIn.js';
import FormWrapper from '../components/Form/FormWrapper.js';

export default function Login() {
  return (
    <FormWrapper text="Нет аккаунта?" linkText="Регистрация" link="/singup">
      <SingIn />
    </FormWrapper>
  );
}
