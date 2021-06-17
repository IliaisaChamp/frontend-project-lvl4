import React from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

export default function SendMessage({ handleSendMessage }) {
  const { t } = useTranslation();

  return (
    <div className="border-top mt-auto py-3 px-3">
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
                data-testid="new-message"
                type="text"
                className="textInput"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.text}
                name="text"
                placeholder={t('form.message')}
              />
              <Button variant="" type="sybmit" disabled={!props.dirty}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-arrow-right-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
