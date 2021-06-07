import React from 'react';
import { Formik } from 'formik';

import { Button } from 'react-bootstrap';

export default function SendMessage({ handleSendMessage }) {
  return (
    <div className="border-top mt-auto py-3 px-5">
      <Formik
        initialValues={{ text: '' }}
        onSubmit={(values, { resetForm }) => {
          handleSendMessage(values.text);
          resetForm();
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="textInput"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.text}
                name="text"
              />
              <Button variant="outline-secondary" id="button-addon2" type="sybmit">
                Button
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
