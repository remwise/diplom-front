import React from 'react';

import './event-details-content.css';

import { Link } from 'react-router-dom';

const EventDetailsContent = props => {
  const { about, contacts, price, files } = props;

  const fileList = files.length ? (
    <div>
      <p className="description-text description-event-details">Файлы</p>
      <div>
        {files.map(el => {
          return (
            <p key={el.file_id}>
              <Link to={`/${el.filename}`} target="_blank" download>
                {el.name}
              </Link>
            </p>
          );
        })}
      </div>
    </div>
  ) : null;

  return (
    <React.Fragment>
      <p className="description-text description-event-details">О конференции</p>
      <div className="event-data">{about}</div>

      <p className="description-text description-event-details">Цена</p>
      <div className="event-data">{price}</div>

      <p className="description-text description-event-details">Контакты</p>
      <div className="event-data">{contacts}</div>

      {fileList}
    </React.Fragment>
  );
};

export default EventDetailsContent;
