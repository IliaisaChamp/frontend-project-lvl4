import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Alert } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import Input from './Input.js';
import Button from './ModalButton.js';

export default function ChannelsModal({ show, handleClose, updateValue }) {
  const validateSchema = useValidateSchema();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { type } = useSelector((state) => state.modal);
  const title = useTitle(type);
  const { t } = useTranslation();
  const handleDelete = () => updateValue();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: `${
            type === 'renameChannel' ? channels.find((c) => c.id === currentChannelId).name : ''
          }`,
        }}
        validationSchema={validateSchema}
        onSubmit={(value, { setFieldError, resetForm, setSubmitting }) => {
          setSubmitting(false);
          if (isUnique(value.name, channels)) {
            setFieldError('name', 'Канал с таким названием уже есть');
            setSubmitting(true);
          } else {
            updateValue(value);
            setSubmitting(true);
            resetForm();
          }
          setSubmitting(true);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Modal.Body>
              {type === 'removeChannel' ? (
                <Alert variant="warning">Вы уверены?</Alert>
              ) : (
                <Input
                  name="name"
                  type="text"
                  value={values.name}
                  dataTestid={type === 'renameChannel' ? 'rename-channel' : 'add-channel'}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                text={t('button.cancel')}
                handleClose={handleClose}
                isSubmitting={isSubmitting}
              />
              {type !== 'removeChannel' ? (
                <Button
                  variant="primary"
                  text={t('button.send')}
                  type="submit"
                  isSubmitting={isSubmitting}
                />
              ) : (
                <Button
                  variant="danger"
                  text={t('button.send')}
                  type="button"
                  handleDelete={handleDelete}
                  isSubmitting={isSubmitting}
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
  const { t } = useTranslation();

  useEffect(() => {
    switch (type) {
      case 'renameChannel':
        setTitle(t('modal.title_rename'));
        break;
      case 'removeChannel':
        setTitle(t('modal.title_delete'));
        break;
      default:
        setTitle(t('modal.title'));
        break;
    }
  }, [type]);

  return title;
}
