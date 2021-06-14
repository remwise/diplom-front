import React, { useEffect } from 'react';
import { Button, Col, FlexboxGrid, Row, Timeline } from 'rsuite';
import { observer } from 'mobx-react-lite';
import { Link, useLocation } from 'react-router-dom';
import { getDate, getDiapason } from '../../utils/dates';

import EventDetailsContent from '../event-details-content';
import EventDetailsForm from '../event-details-form';

import './event-details.css';

import { getStore as getEventStore } from '../../stores/event';

const eventStore = getEventStore();

const EventDetails = observer(({ conference_id }) => {
  useEffect(() => {
    eventStore.getEvent({ conference_id });
  }, [conference_id]);

  let location = useLocation();

  const { name, start_date, end_date, logo_filename, registration_end, program } = eventStore.event;

  const timeline = program.length ? (
    <div>
      <p className="description-text description-event-details">Расписание</p>
      <Timeline align="left">
        {program.map(el => {
          return (
            <Timeline.Item key={el.program_id}>
              <p className="timeline-text timeline-date">{getDate(el.date, 'LLL')}</p>
              <p className="timeline-text">{el.text}</p>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  ) : null;

  const sendArticle =
    location.pathname.indexOf('send') === -1 && new Date(registration_end) > new Date() ? (
      <Link to={`send`}>
        <Button className="dark-blue-btn send-article-btn">Подать заявку</Button>
      </Link>
    ) : null;

  const leftSide = (
    <React.Fragment>
      <img className="conference-logo event-logo" src={`/data/images/events/${logo_filename}`} alt="" />
      {sendArticle}
      {timeline}
    </React.Fragment>
  );

  const content =
    location.pathname.indexOf('send') !== -1 && new Date(registration_end) > new Date() ? (
      <EventDetailsForm conference_id={conference_id} />
    ) : (
      <EventDetailsContent {...eventStore.event} />
    );

  return (
    <FlexboxGrid justify="space-between">
      <FlexboxGrid.Item componentClass={Col} xsHidden smHidden md={6}>
        {leftSide}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item componentClass={Col} xs={24} md={17}>
        <Row>
          <Col xs={24}>
            <p className="event-title">{name}</p>
            <Row className="event-date-block">
              <Col md={10} xs={12}>
                <p className="description-text description-event-details">Дата проведения</p>
                <p className="event-date-text">{getDiapason(start_date, end_date)}</p>
              </Col>
              <Col md={10} xs={12}>
                <p className="description-text description-event-details">Дата окончания регистрации</p>
                <p className="event-date-text">{getDate(registration_end, 'LLL')}</p>
              </Col>
            </Row>
          </Col>
          <Col lgHidden mdHidden xs={24} style={{ marginBottom: '30px' }}>
            {leftSide}
          </Col>
          <Col xs={24}>{content}</Col>
        </Row>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
});

export default EventDetails;
