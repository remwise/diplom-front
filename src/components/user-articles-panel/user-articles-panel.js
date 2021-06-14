import React, { useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Col,
  DatePicker,
  Divider,
  FlexboxGrid,
  Form,
  FormGroup,
  InputPicker,
  Modal,
  Row,
  Tag,
  TagGroup,
  Uploader,
} from 'rsuite';
import TextField from '../text-field';

import './user-articles-panel.css';

const UserArticlesPanel = () => {
  // const [show, setShow] = useState(false);

  // const [formValue, setFormValue] = useState({
  //   name: '',
  //   organization_id: '',
  // });

  const paymentStatus = [
    <Button className="user-page-articles-status success">Принята</Button>,
    <Button className="user-page-articles-status fail">Не принята</Button>,
    <React.Fragment>
      <Button className="user-page-articles-status wait-payment">
        Ожидает оплаты
        <br />
        500р.
      </Button>
      {/* <Button className="dark-blue-btn" style={{ display: 'block', marginTop: '10px' }} size="xs"> */}
      {/* <Button appearance="link" className="send-payment" onClick={() => setShow(true)}> */}
      <Button appearance="link" className="send-payment">
        Сообщить об оплате
      </Button>
    </React.Fragment>,
  ];

  const arr = [1, 2, 3];
  const subArr = [
    {
      name: 'Разработка лабораторного образца пирометрического датчика на базе оптической системы с цилиндрическими линзами',
      year: 2018,
      status: 1,
    },
    {
      name: 'Формирование ШИМ-сигнала для генератора фиктивной мощности',
      year: 2019,
      status: 0,
    },
    {
      name: 'Использование функциональной избыточности при разработке дат-чиков для инерциальной навигации',
      year: 2020,
      status: 2,
    },
  ];

  const conferencesList = arr.map(arrel => (
    <div className="user-page-articles-list">
      <p className="user-page-articles-conference">
        Международная научно-техническая конференция "Измерение, контроль, информатизация"
      </p>
      {subArr.map((el, index) => (
        <>
          <FlexboxGrid justify="space-between" align="middle">
            <FlexboxGrid.Item componentClass={Col} md={2} sm={3} xs={3}>
              <span className="user-page-articles-year">{el.year}</span>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item componentClass={Col} md={16} sm={13} xs={11}>
              <span className="user-page-articles-name">{el.name}</span>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item componentClass={Col} md={6} sm={8} xs={10}>
              {paymentStatus[el.status]}
            </FlexboxGrid.Item>
          </FlexboxGrid>
          {index !== subArr.length - 1 ? <Divider className="user-page-articles-divider" /> : null}
        </>
      ))}
    </div>
  ));

  return (
    // <div className="modal-container">
    <div>
      <p className="user-page-second-caption">Ваши заявки</p>
      {conferencesList}
      {/* <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Создание новой конференции</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onChange={e => setFormValue(e)}
            formValue={formValue}
            onSubmit={() => {
            }}
          >
            <TextField required name="name" label="Введите название конференции" />
            <TextField required name="event_name" label="Введите название события" />
            <Uploader
              className="uploader"
              accept="image/*"
              autoUpload={false}
              listType="picture-text"
              action="/api/files/upload.php"
              name="logo_filename"
            >
              <Button>Загрузить логотип</Button>
            </Uploader>
            <TextField
              name="organization_id"
              label="Организация"
              placeholder="Выберите организацию"
              accepter={InputPicker}
            />
            <TextField
              name="register_date"
              label="Дата окончания регистрации"
              placement="topStart"
              format="DD.MM.YYYY HH:mm"
              accepter={DatePicker}
            />
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
      {/* <Row>
        <Col lgHidden mdHidden xs={24}>
          {conferencesList}
          <Divider />
        </Col>
      </Row> */}
    </div>
  );
};

export default UserArticlesPanel;
