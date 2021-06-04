import React, { useRef, useState } from 'react';
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
  Uploader,
} from 'rsuite';

import TextField from '../text-field';

import './event-details-form.css';

// import { getStore as getUserStore } from '../../stores/user';

// const userStore = getUserStore();

const EventDetailsForm = () => {
  const uploader = useRef(null);
  const form = useRef(null);
  const [file, setFile] = useState([]);
  const [directorsCounter, setDirectorsCounter] = useState(1);
  const [collaboratorsCounter, setCollaboratorsCounter] = useState(1);

  const [formValue, setFormValue] = useState({
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
    // address: '',
  });

  const history = useHistory();

  return (
    <div className="event-details-form">
      <Form
        ref={form}
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
        <TextField
          className="event-details-form-el-fluid"
          name="section_id"
          label="Секция"
          cleanable={false}
          placeholder="Выберите секцию"
          accepter={InputPicker}
          data={[
            { label: 'Секция 1', value: 'sec1' },
            { label: 'Секция 2', value: 'sec2' },
          ]}
        />
        <TextField name="description" componentClass="textarea" label="Аннотация" rows={5} className="textfield-textarea" />
        <TextField name="pages_count" label="Количество страниц" type="number" />
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
          value={'Комаров Андрей Владимирович, студент'}
          disabled
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Организация автора"
          value={'Алтайский Государственный технический университет им. И.И. Ползунова'}
          disabled
          style={{ marginBottom: '3px' }}
        />
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
              Создать
            </Button>
            <Button onClick={() => history.replace(history.location.pathname.replace('send', ''))}>Закрыть</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </div>
  );
};

export default EventDetailsForm;
