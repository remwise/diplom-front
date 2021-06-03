import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { ButtonToolbar, Panel, Form, FormGroup, Button, Schema, Uploader, Alert } from 'rsuite';

import TextField from '../text-field';

import './feedback-panel.css';

import { getStore } from '../../stores/user';

const store = getStore();

const { StringType } = Schema.Types;

const model = Schema.Model({
  email: StringType().isRequired('Введите email').isEmail('Введите корректный email'),
  password: StringType().isRequired('Введите пароль'),
});

const FeedbackPanel = observer(() => {
  const form = useRef(null);
  const uploader = useRef(null);

  const [file, setFile] = useState([]);

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const submitForm = () => {
    // if (!form.current.check()) {
    //   console.error('Form Error');
    //   return;
    // }
    if (file.length) {
      uploader.current.start();
    } else {
      //Отправка данных
      // store.login(formValue);
    }
  };

  return (
    <Panel header={<h3>Обратная связь</h3>} className="feedback-panel" bordered>
      <Form ref={form} model={model} onChange={e => setFormValue(e)} formValue={formValue} onSubmit={submitForm} fluid>
        <TextField
          rows={10}
          className="feedback-textarea"
          name="text"
          componentClass="textarea"
          label="О чем вы хотите рассказать?"
        />
        <Uploader
          className="uploader"
          ref={uploader}
          accept="image/*"
          autoUpload={false}
          listType="picture-text"
          action="/api/files/feedback_upload.php"
          name="filename"
          onChange={file => setFile(file)}
          disabled={Boolean(file.length)}
          onSuccess={response => {
            Alert.success('Ваше сообщение отправлено!');
            console.log(response);
            //Отправка данных
            // store.login(formValue);
          }}
          onError={() => {
            Alert.error('Произошла ошибка!');
          }}
        >
          <Button>Приложить скриншот</Button>
        </Uploader>
        <FormGroup>
          <ButtonToolbar>
            <Button className="dark-blue-btn" type="submit" appearance="primary">
              Отправить
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </Panel>
  );
});

export default FeedbackPanel;
