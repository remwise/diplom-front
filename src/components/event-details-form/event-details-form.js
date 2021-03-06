import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonToolbar,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  IconButton,
  InputPicker,
  Row,
  Schema,
  Uploader,
} from 'rsuite';

import TextField from '../text-field';

import './event-details-form.css';

import { getStore as getDigestStore } from '../../stores/digest';
import { getStore as getUserStore } from '../../stores/user';

const userStore = getUserStore();
const digestStore = getDigestStore();

const { StringType, DateType, NumberType } = Schema.Types;

const model = Schema.Model({
  // email: StringType().isRequired('Введите email').isEmail('Введите корректный email'),
  // name: StringType().isRequired('Введите имя'),
  // surname: StringType().isRequired('Введите фамилию'),
  // patronymic: StringType(),
  // position_id: NumberType(),
  // city_id: NumberType(),
  // organization_id: NumberType(),
  // address: StringType(),
  // phone: StringType().addRule(value => phoneValidate(value), 'Введите корректный номер телефона'),
  // sex: StringType().isRequired('Выберите пол'),
  // birthday: DateType().max(new Date(), 'Дата рождения не может быть позже сегодняшнего дня'),
  // password: StringType()
  //   .isRequired('Введите пароль')
  //   .minLength(8, 'Минимальная длина пароля 8 символов')
  //   .addRule(value => passwordValidate(value), 'Пароль должен состоять из букв и цифр'),
});

const EventDetailsForm = ({ conference_id }) => {
  useEffect(() => {
    digestStore.getDigests({ conference_id });
    const digestId = digestStore.digests[0]['digest_id'];

    digestStore.getDigestSections({ digestId });
  });

  const uploader = useRef(null);
  const form = useRef(null);
  const [file, setFile] = useState([]);
  const [directorsCounter, setDirectorsCounter] = useState(1);
  const [collaboratorsCounter, setCollaboratorsCounter] = useState(1);

  // const objCol = [...new Array(collaboratorsCounter)].reduce((result, item, index, array) => {
  //   result[`collaborator_${index}`] = '';
  //   return result;
  // }, {});

  // const objDir = [...new Array(directorsCounter)].reduce((result, item, index, array) => {
  //   result[`director_${index}`] = '';
  //   return result;
  // }, {});

  const state = {
    article_name: '',
    section_id: '',
    description: '',
    pages_count: '',
    ...[...new Array(collaboratorsCounter)].reduce((result, item, index, array) => {
      result[`collaborator_${index}`] = '';
      return result;
    }, {}),
    ...[...new Array(directorsCounter)].reduce((result, item, index, array) => {
      result[`director_${index}`] = '';
      return result;
    }, {}),
  };

  const [formValue, setFormValue] = useState(state);

  // console.log(formValue);

  const history = useHistory();

  const data = digestStore.digestSections
    ? digestStore.digestSections.map(el => {
        return { label: el.name, value: el.digest_section_id };
      })
    : null;

  const sectionsBlock = data ? (
    <TextField
      className="event-details-form-el-fluid"
      name="section_id"
      label="Секция"
      cleanable={false}
      placeholder="Выберите секцию"
      accepter={InputPicker}
      data={data}
    />
  ) : null;

  return (
    <div className="event-details-form">
      <Form
        ref={form}
        model={model}
        onChange={e => setFormValue(e)}
        formValue={formValue}
        onSubmit={() => {
          console.log(formValue);
          // uploader.current.start();
          // await conferenceStore.createConference({
          //   ...formValue,
          //   user_id: userStore.user['user_id'],
          // });
          // await conferenceStore.getConferences({ jwt: getCookie('token') });
        }}
        fluid
      >
        <TextField name="article_name" label="Название статьи" />
        {sectionsBlock}
        <TextField name="description" componentClass="textarea" label="Аннотация" rows={5} className="textfield-textarea" />
        {/* <TextField name="pages_count" label="Количество страниц" type="number" /> */}
        <Uploader
          className="event-details-form-el-fluid event-details-form-uploader"
          ref={uploader}
          autoUpload={false}
          listType="text"
          action="/api/files/upload.php"
          name="filename"
          onChange={file => setFile(file)}
          disabled={Boolean(file.length)}
        >
          <Button>Загрузить статью</Button>
        </Uploader>

        <TextField
          name="author_name"
          label="Данные автора"
          value={`${userStore.user.surname} ${userStore.user.name} ${userStore.user.patronymic}`}
          disabled
          style={{ marginBottom: '3px' }}
        />
        {/* <TextField
          label="Организация автора"
          value={'Алтайский Государственный технический университет им. И.И. Ползунова'}
          disabled
          style={{ marginBottom: '3px' }}
        /> */}
        <Link to="/user" style={{ display: 'block', marginBottom: '25px' }}>
          {/* /settings */}
          Изменить в настройках профиля
        </Link>

        <ControlLabel className="event-details-form-collaborator-label">ФИО соавтора</ControlLabel>
        {[...new Array(collaboratorsCounter)].map((el, index) => (
          <div key={`collaborator_${index}`} className="event-details-form-collaborator">
            <Row>
              <Col xs={21}>
                <FormControl name={`collaborator_${index}`} />
              </Col>
              <Col xs={3}>
                <IconButton
                  icon={<Icon icon="trash" />}
                  onClick={() => setCollaboratorsCounter(!collaboratorsCounter ? 0 : collaboratorsCounter - 1)}
                />
              </Col>
            </Row>
          </div>
        ))}
        <FormGroup>
          <Button onClick={() => setCollaboratorsCounter(collaboratorsCounter + 1)}>Добавить соавтора</Button>
        </FormGroup>
        <ControlLabel className="event-details-form-collaborator-label">ФИО научного руководителя</ControlLabel>
        {[...new Array(directorsCounter)].map((el, index) => (
          <div key={`director_${index}`} className="event-details-form-collaborator">
            <Row>
              <Col xs={21}>
                <FormControl name={`director_${index}`} />
              </Col>
              <Col xs={3}>
                <IconButton
                  icon={<Icon icon="trash" />}
                  onClick={() => setDirectorsCounter(!directorsCounter ? 0 : directorsCounter - 1)}
                />
              </Col>
            </Row>
          </div>
        ))}
        <FormGroup>
          <Button onClick={() => setDirectorsCounter(directorsCounter + 1)}>Добавить научного руководителя</Button>
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button
              className="dark-blue-btn"
              type="submit"
              appearance="primary"
              // onClick={() => {
              //   //Отправка запроса
              //   history.replace(history.location.pathname.replace('send', ''));
              // }}
            >
              Отправить
            </Button>
            <Button onClick={() => history.replace(history.location.pathname.replace('send', ''))}>Закрыть</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </div>
  );
};

export default EventDetailsForm;
