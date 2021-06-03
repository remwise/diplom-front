import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, FlexboxGrid, Panel, Row } from 'rsuite';

import './conferences-item.css';

const ConferencesItem = props => {
  const { logo_filename, event_name, registration_end, start_date, end_date, organization_name, conference_id } = props;

  return (
    <Panel className="conferences-item">
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={4}>
          <Link to={conference_id} className="event-link">
            <img className="conference-logo" src={`/data/images/events/${logo_filename}`} alt="" />
          </Link>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={19}>
          <Link to={conference_id} className="event-link">
            <span>{event_name}</span>
          </Link>
          <Row>
            <Col lg={8} md={10} xs={12}>
              <p className="description-text description-conf-item">Дата проведения</p>
              <p className="date-text">
                {start_date} - {end_date}
              </p>
            </Col>
            <Col lg={8} md={10} xs={12}>
              <p className="description-text description-conf-item">Дата окончания регистрации</p>
              <p className="date-text">{registration_end}</p>
            </Col>
          </Row>
          <div className="org-block">
            <p className="description-text description-conf-item">Место проведения</p>
            <p className="org-text">{organization_name}</p>
          </div>
          <Link to={`${conference_id}/send`}>
            <Button className="event-send-link dark-blue-btn">Подать заявку</Button>
          </Link>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
};

export default ConferencesItem;
