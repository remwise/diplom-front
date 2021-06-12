import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, SelectPicker, Animation, Row, Col } from 'rsuite';
import TextField from '../text-field';

import './search-panel.css';

import { getStore as getEventStore } from '../../stores/event';

const eventStore = getEventStore();

const { Collapse } = Animation;

const SearchPanel = () => {
  const [formValue, setFormValue] = useState({
    searchText: '',
    registerEndDate: null,
    eventStartDate: null,
    eventEndDate: null,
    organizationName: '',
    sort: 'default',
  });

  const [show, setShow] = useState(false);
  const [stext, setText] = useState('');

  const changeSearch = (text, props) => {
    setText(text);
    props.searchText = text;
    setFormValue(props);
    eventStore.searchParams = props;
  };

  return (
    <div>
      <p className="main-caption search-panel-title">Поиск конференций</p>
      <Row className="search-panel">
        <Col md={14} xs={14}>
          <Input onChange={e => changeSearch(e, formValue)} value={stext} />
        </Col>
        <Col md={3} xs={6}>
          <Button className="search-panel-filter-btn" onClick={() => setShow(!show)}>
            Фильтры
          </Button>
        </Col>
      </Row>

      <Collapse in={show}>
        {(props, ref) => (
          <div {...props} ref={ref}>
            <Form onChange={e => changeSearch(stext, e)} formValue={formValue} fluid>
              <Row className="search-panel-filter">
                <Col lg={5} md={7} xs={24} className="search-panel-filter-date">
                  <TextField
                    className="event-details-form-el-fluid"
                    name="registerEndDate"
                    label="Окончание регистрации не позже"
                    accepter={DatePicker}
                  />
                </Col>
                <Col lg={5} md={7} xs={24} mdPush={1} className="search-panel-filter-date">
                  <TextField
                    className="event-details-form-el-fluid"
                    name="eventStartDate"
                    label="Начало события не раньше"
                    accepter={DatePicker}
                  />
                </Col>
                <Col lg={5} md={7} xs={24} mdPush={2} className="search-panel-filter-date">
                  <TextField
                    className="event-details-form-el-fluid"
                    name="eventEndDate"
                    label="Окончание события не позже"
                    accepter={DatePicker}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={7} md={10} xs={15} className="search-panel-filter-date">
                  <TextField name="organizationName" label="Университет" />
                </Col>
                <Col lg={5} md={7} xs={9} mdPush={1} className="search-panel-filter-date">
                  <TextField
                    className="event-details-form-el-fluid"
                    name="sort"
                    label="Сортировка"
                    searchable={false}
                    cleanable={false}
                    data={[
                      { label: 'По умолчанию', value: 'default' },
                      { label: 'По названию', value: 'name' },
                      { label: 'По дате регистрации', value: 'registerDate' },
                      { label: 'По дате проведения', value: 'eventDate' },
                    ]}
                    accepter={SelectPicker}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default SearchPanel;
