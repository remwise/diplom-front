import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, SelectPicker, Animation, Row, Col, Divider } from 'rsuite';
import TextField from '../text-field';

import './search-panel.css';

const { Collapse } = Animation;

const SearchPanel = () => {
  const [formValue, setFormValue] = useState({
    registerStartDate: null,
    registerEndDate: null,
    eventStartDate: null,
    eventEndDate: null,
    universityName: '',
    sort: 'default',
  });

  const [show, setShow] = useState(false);
  // const [searchText, setSearchText] = useState('');

  // useEffect(() => {

  // })

  return (
    <div>
      <h2 className="search-panel-title">Поиск конференций</h2>
      <Row className="search-panel">
        <Col md={14} xs={14}>
          {/* <Input onChange={e => setSearchText(e)} value={searchText} /> */}
          <Input />
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
            <Form onChange={e => setFormValue(e)} formValue={formValue} fluid>
              {/* <Form layout="inline"> */}
              {/* <TextField name="registerStartDate" label="Начало регистрации не раньше" accepter={DatePicker} /> */}
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
                  <TextField name="universityName" label="Университет" />
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

      {/* <Panel header="Фильтры" bordered collapsible> */}
      {/* <div>
        <Form layout="inline" onChange={e => setFormValue(e)} formValue={formValue}>
          <TextField name="registerStartDate" label="Начало регистрации не раньше" accepter={DatePicker} />
          <TextField name="registerEndDate" label="Окончание регистрации не позже" accepter={DatePicker} />
          <TextField name="universityName" label="Университет" />
          <Divider />
          <TextField name="eventStartDate" label="Начало события не раньше" accepter={DatePicker} />
          <TextField name="eventEndDate" label="Окончание события не позже" accepter={DatePicker} />
          <TextField
            name="sort"
            label="Сортировка"
            searchable={false}
            cleanable={false}
            appearance="subtle"
            data={[
              { label: 'По умолчанию', value: 'default' },
              { label: 'По названию', value: 'name' },
              { label: 'По дате регистрации', value: 'registerDate' },
              { label: 'По дате проведения', value: 'eventDate' },
            ]}
            accepter={SelectPicker}
          />
        </Form>
      </div> */}
      {/* </Panel> */}
    </div>
  );
};

export default SearchPanel;
