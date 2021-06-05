import React, { useState, useRef } from 'react';
import { ButtonToolbar, Panel, Form, FormGroup, Button, Schema, Uploader, Alert } from 'rsuite';
import { createFeedback } from '../../api';
import { getCookie } from '../../utils/cookies';

import TextField from '../text-field';

import './feedback-panel.css';

const { StringType } = Schema.Types;

const model = Schema.Model({
  text: StringType().isRequired('Введите текст!'),
});

const FeedbackPanel = () => {
  const form = useRef(null);
  const uploader = useRef(null);

  const [file, setFile] = useState([]);

  const [formValue, setFormValue] = useState({
    text: '',
  });

  const sendData = async (text, filename = null) => {
    const token = getCookie('token');

    if (token) {
      let res;
      try {
        res = await createFeedback({ text, filename, jwt: token });
      } catch (error) {
        Alert.error('Произошла ошибка!');
        return;
      }

      if (res.status === 200) {
        setFormValue({ text: '' });
        setFile([]);
        Alert.success('Ваше сообщение отправлено!');
      } else Alert.error('Произошла ошибка!');
    } else Alert.error('Произошла ошибка!');
  };

  const submitForm = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }
    if (file.length) {
      uploader.current.start();
    } else {
      sendData(formValue.text);
    }
  };

  return (
    <Panel header={<h3>Обратная связь</h3>} className="feedback-panel" bordered>
      <Form ref={form} model={model} onChange={e => setFormValue(e)} formValue={formValue} onSubmit={submitForm} fluid>
        <TextField
          rows={10}
          className="textfield-textarea"
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
          fileList={file}
          onChange={file => setFile(file)}
          disabled={Boolean(file.length)}
          onSuccess={response => {
            sendData(formValue.text, response.data);
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
};

export default FeedbackPanel;
