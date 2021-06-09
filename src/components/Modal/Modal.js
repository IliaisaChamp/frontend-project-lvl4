import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from './Input.js';
import Button from './ModalButton.js';
// import

export default function ChannelsModal({ show, handleClose, updateValue }) {
  const validateSchema = useValidateSchema();
  const { channels } = useSelector((state) => state.channelsInfo);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={validateSchema}
        onSubmit={(values, { setFieldError, resetForm }) => {
          if (isUnique(values.name, channels)) {
            setFieldError('name', 'Канал с таким названием уже есть');
          } else {
            updateValue(values);
            resetForm();
          }
        }}
      >
        {() => (
          <Form>
            <Modal.Body>
              <Input name="name" type="text" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" text="Отменить" handleClose={handleClose} />
              <Button variant="primary" text="Добавить" type="submit" />
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

function useValidateSchema() {
  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Напишите название канала'),
  });
  return validateSchema;
}

function isUnique(newName, channels) {
  return channels.some((c) => c.name === newName);
}
