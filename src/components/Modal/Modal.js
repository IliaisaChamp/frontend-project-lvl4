import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Alert } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from './Input.js';
import Button from './ModalButton.js';

export default function ChannelsModal({ show, handleClose, updateValue }) {
  const validateSchema = useValidateSchema();
  const { channels } = useSelector((state) => state.channelsInfo);
  const { type } = useSelector((state) => state.modal);
  const title = useTitle(type);

  const handleDelete = () => updateValue();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
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
              {type === 'removeChannel' ? (
                <Alert variant="warning">Вы уверены?</Alert>
              ) : (
                <Input name="name" type="text" />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" text="Отменить" handleClose={handleClose} />
              {type !== 'removeChannel' ? (
                <Button variant="primary" text="Подтвердить" type="submit" />
              ) : (
                <Button
                  variant="danger"
                  text="Подтвердить"
                  type="button"
                  handleDelete={handleDelete}
                />
              )}
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

function useValidateSchema() {
  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Не должно быть пустым'),
  });
  return validateSchema;
}

function isUnique(newName, channels) {
  return channels.some((c) => c.name === newName);
}

function useTitle(type) {
  const [title, setTitle] = useState('');
  useEffect(() => {
    switch (type) {
      case 'renameChannel':
        setTitle('Переименовать канал');
        break;
      case 'removeChannel':
        setTitle('Удалить канал');
        break;
      default:
        setTitle('Добавить канал');
        break;
    }
  }, [type]);

  return title;
}
