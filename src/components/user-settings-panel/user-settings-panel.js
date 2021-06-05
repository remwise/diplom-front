import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button, Schema, InputPicker, DatePicker, Row, Col, Divider } from 'rsuite';

import { passwordValidate, phoneValidate } from '../../utils/validators';
import TextField from '../text-field';

import './user-settings-panel.css';

import { getStore as getUserStore } from '../../stores/user';
import { getStore as getInfoListStore } from '../../stores/info-list';

const userStore = getUserStore();
const infoListStore = getInfoListStore();

const { StringType, DateType, NumberType } = Schema.Types;

const model = Schema.Model({
  email: StringType().isRequired('Введите email').isEmail('Введите корректный email'),
  name: StringType().isRequired('Введите имя'),
  surname: StringType().isRequired('Введите фамилию'),
  patronymic: StringType(),
  position_id: NumberType(),
  city_id: NumberType(),
  organization_id: NumberType(),
  address: StringType(),
  phone: StringType().addRule(value => phoneValidate(value), 'Введите корректный номер телефона'),
  sex: StringType().isRequired('Выберите пол'),
  birthday: DateType().max(new Date(), 'Дата рождения не может быть позже сегодняшнего дня'),
  password: StringType()
    .isRequired('Введите пароль')
    .minLength(8, 'Минимальная длина пароля 8 символов')
    .addRule(value => passwordValidate(value), 'Пароль должен состоять из букв и цифр'),
});

const modelPassword = Schema.Model({
  old_password: StringType().isRequired('Введите пароль'),
  password: StringType()
    .isRequired('Введите пароль')
    .minLength(8, 'Минимальная длина пароля 8 символов')
    .addRule(value => passwordValidate(value), 'Пароль должен состоять из букв и цифр'),
});

const UserSettingsPanel = observer(() => {
  useEffect(() => {
    infoListStore.getInfoLists();
  }, []);

  const form = useRef(null);
  const formPassword = useRef(null);

  const { email, name, surname, patronymic, birthday, address, city_id, organization_id, phone, sex, position_id } =
    userStore.user;

  const [formValue, setFormValue] = useState({
    birthday: new Date(birthday),
    email: email,
    name: name,
    surname: surname,
    patronymic: patronymic,
    phone: phone,
    sex: sex,
    organization_id: organization_id,
    position_id: position_id,
    city_id: city_id,
    address: address,
  });

  const [passwordFormValue, setPasswordFormValue] = useState({
    old_password: '',
    password: '',
  });

  const submitForm = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }
    // userStore.register(formValue);
  };

  const submitPasswordForm = () => {
    if (!formPassword.current.check()) {
      console.error('Form Error');
      return;
    }
    // userStore.register(formValue);
  };

  const passwordForm = (
    <Form
      ref={formPassword}
      model={modelPassword}
      onChange={e => setPasswordFormValue(e)}
      formValue={passwordFormValue}
      onSubmit={submitPasswordForm}
      className="password-form"
    >
      <TextField name="old_password" label="Старый пароль" type="password" />
      <TextField name="password" label="Новый пароль" type="password" />
      <Button className="dark-blue-btn" type="submit">
        Сохранить
      </Button>
    </Form>
  );

  return (
    <div>
      <p className="user-page-second-caption">Настройки</p>
      <Row>
        <Col lgHidden mdHidden xs={24}>
          {passwordForm}
          <Divider />
        </Col>
        <Col md={10} xs={24}>
          <Form ref={form} model={model} onChange={e => setFormValue(e)} formValue={formValue} onSubmit={submitForm}>
            <TextField name="email" label="Email" type="email" />
            <TextField name="surname" label="Фамилия" />
            <TextField name="name" label="Имя" />
            <TextField name="patronymic" label="Отчество" />
            <TextField name="phone" label="Телефон" type="phone" />
            <TextField
              name="city_id"
              label="Город"
              placeholder="Выберите город"
              accepter={InputPicker}
              data={infoListStore.cities}
            />
            <TextField name="address" label="Адрес" />
            <TextField
              name="organization_id"
              label="Организация"
              placeholder="Выберите организацию"
              accepter={InputPicker}
              data={infoListStore.organizations}
            />
            <TextField
              name="position_id"
              label="Должность"
              placeholder="Выберите должность"
              accepter={InputPicker}
              data={infoListStore.positions}
            />
            <TextField
              name="sex"
              label="Пол"
              placeholder="Выберите пол"
              cleanable={false}
              accepter={InputPicker}
              data={[
                { label: 'Мужской', value: 'm' },
                { label: 'Женский', value: 'w' },
              ]}
            />
            <TextField name="birthday" label="Дата рождения" placement="topStart" accepter={DatePicker} />
            <Button className="dark-blue-btn" type="submit">
              Сохранить
            </Button>
          </Form>
        </Col>
        <Col mdOffset={2} md={10} smHidden xsHidden>
          {passwordForm}
        </Col>
      </Row>
    </div>
  );
});

export default UserSettingsPanel;
