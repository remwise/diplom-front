import React from 'react';
import { Button, Col, Divider, Row, Tag, TagGroup } from 'rsuite';

import './user-articles-panel.css';

const UserArticlesPanel = () => {
  const paymentStatus = [
    <Button className="user-page-articles-status success">Принята</Button>,
    <Button className="user-page-articles-status fail">Не принята</Button>,
    <Button className="user-page-articles-status wait-payment">Ожидает оплаты</Button>,
  ];

  const conferencesList = (
    <div>
      <p className="user-page-articles-conference">
        Международная научно-техническая конференция "Измерение, контроль, информатизация"
      </p>
      <Row>
        <Col md={2} sm={3} xs={3}>
          <span className="user-page-articles-year">2021</span>
        </Col>
        <Col md={16} sm={13} xs={11}>
          <span className="user-page-articles-name">Влияние каловых масс на современное музыкальное искусство</span>
        </Col>
        <Col md={6} sm={8} xs={10}>
          {paymentStatus[2]}
          <Button style={{ display: 'block', marginTop: '10px' }} size="xs">
            Сообщить об оплате
          </Button>
        </Col>
      </Row>
      <Divider style={{ marginTop: '23px' }} />
      <Row>
        <Col md={2} sm={3} xs={3}>
          <span className="user-page-articles-year">2021</span>
        </Col>
        <Col md={16} sm={13} xs={11}>
          <span className="user-page-articles-name">Влияние каловых масс на современное музыкальное искусство</span>
        </Col>
        <Col md={6} sm={8} xs={10}>
          {paymentStatus[1]}
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col md={2} sm={3} xs={3}>
          <span className="user-page-articles-year">2021</span>
        </Col>
        <Col md={16} sm={13} xs={11}>
          <span className="user-page-articles-name">Влияние каловых масс на современное музыкальное искусство</span>
        </Col>
        <Col md={6} sm={8} xs={10}>
          {paymentStatus[0]}
        </Col>
      </Row>
      <Divider />
    </div>
  );

  return (
    <div>
      <p className="user-page-second-caption">Ваши заявки</p>
      {conferencesList}
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
