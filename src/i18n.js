import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      main: {
        title: 'Hexlet Chat',
        title_channel: 'Каналы',
      },
      button: {
        send: 'Отправить',
        cancel: 'Отменить',
        out: 'Выйти',
        go: 'Войти',
        reg: 'Зарегистрироваться',
      },
      form: {
        title: 'Войти',
        title_reg: 'Регистрация',
        name: 'Ваш ник',
        password: 'Пароль',
        confirm: 'Подтвердите пароль',
        message: 'Введите сообщение...',
      },
      modal: {
        title: 'Добавить канал',
        title_delete: 'Удалить канал',
        text_delete: 'Переименовать канал',
        title_rename: 'Переименовать канал',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
