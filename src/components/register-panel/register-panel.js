import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Panel, Form, Button, Schema, InputPicker, DatePicker, Modal, FormGroup, ButtonToolbar, Message } from 'rsuite';

import { passwordValidate, phoneValidate } from '../../utils/validators';
import TextField from '../text-field';

import './register-panel.css';

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
  phone: StringType().addRule(value => phoneValidate(value), 'Введите корректный номер телефона'),
  sex: StringType().isRequired('Выберите пол'),
  birthday: DateType().max(new Date(), 'Дата рождения не может быть позже сегодняшнего дня'),
  password: StringType()
    .isRequired('Введите пароль')
    .minLength(8, 'Минимальная длина пароля 8 символов')
    .addRule(value => passwordValidate(value), 'Пароль должен состоять из букв и цифр'),
});

const RegisterPanel = observer(() => {
  useEffect(() => {
    infoListStore.getInfoLists();
  }, []);

  const form = useRef(null);

  const [show, setShow] = useState(false);

  const [formValue, setFormValue] = useState({
    birthday: null,
    email: '',
    name: '',
    password: '',
    patronymic: '',
    phone: '',
    sex: '',
    surname: '',
    organization_id: '',
    position_id: '',
    city_id: '',
  });

  const [modalFormValue, setModalFormValue] = useState({
    // birthday: null,
    // email: '',
    // name: '',
    // password: '',
    // patronymic: '',
    // phone: '',
    // sex: '',
    // surname: '',
    // organization_id: '',
    // position_id: '',
    // city_id: '',
  });

  const submitForm = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }
    userStore.register(formValue);
  };

  return (
    <div className="modal-container">
      <Panel style={{ marginTop: '30px' }} header={<h3>Регистрация</h3>} bordered>
        <Form ref={form} model={model} onChange={e => setFormValue(e)} formValue={formValue} onSubmit={submitForm}>
          <TextField required name="email" label="Email" type="email" />
          <TextField required name="surname" label="Фамилия" />
          <TextField required name="name" label="Имя" />
          <TextField name="patronymic" label="Отчество (при наличии)" />
          <TextField
            required
            name="sex"
            label="Пол"
            placeholder="Выберите пол"
            cleanable={false}
            accepter={InputPicker}
            data={[
              { label: 'Мужской', value: 'm' },
              { label: 'Женский', value: 'w' },
            ]}
            className="event-details-form-el-fluid"
          />
          <TextField name="birthday" label="Дата рождения" placement="topStart" accepter={DatePicker} />
          <TextField name="phone" label="Телефон" type="phone" style={{ marginBottom: '80px' }} />

          <TextField
            name="city_id"
            label="Город"
            placeholder="Выберите город"
            accepter={InputPicker}
            data={infoListStore.cities}
          />
          <TextField
            name="organization_id"
            label="Организация"
            placeholder="Выберите организацию"
            accepter={InputPicker}
            data={infoListStore.organizations}
            style={{ marginBottom: '14px' }}
          />
          {/* <span className="add-organizations">Если вы не нашли свой город или организацию, добавьте их </span>
          <Button appearance="link" className="add-organizations btn" onClick={() => setShow(true)}>
            здесь
          </Button> */}
          <TextField
            name="position_id"
            label="Должность"
            placeholder="Выберите должность"
            accepter={InputPicker}
            data={infoListStore.positions}
            style={{ marginTop: '21px', marginBottom: '60px' }}
          />

          <TextField required name="password" label="Пароль" type="password" />
          <Button className="dark-blue-btn" type="submit">
            Зарегистрироваться
          </Button>
        </Form>
      </Panel>

      {/* <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Добавьте город и организацию</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onChange={e => setModalFormValue(e)}
            formValue={modalFormValue}
          >
            <Message
              type="info"
              title="Внимание!"
              description={
                <p>
                  С помощью данной формы можно добавить информацию об организации и городе в базу Системы. После отправки
                  информация поступает на обработку редакторам Системы. Как только информацию будет обработана, вам будет
                  отправлено уведомление.
                </p>
              }
            />
            <TextField rows={5} name="about" componentClass="textarea" label="О мероприятии" />
            <TextField rows={5} name="contacts" componentClass="textarea" label="Контактная информация" />
            <TextField rows={5} name="price" componentClass="textarea" label="Стоимость участия" />
            <FormGroup>
              <ButtonToolbar>
                <Button type="submit" onClick={() => setShow(false)} appearance="primary">
                  Создать
                </Button>
                <Button onClick={() => setShow(false)}>Закрыть</Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal> */}
    </div>
  );
});

export default RegisterPanel;
