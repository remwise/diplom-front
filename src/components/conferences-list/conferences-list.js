import React, { useEffect } from 'react';
import { PanelGroup, Loader } from 'rsuite';
import { observer } from 'mobx-react-lite';

import ConferencesItem from '../conferences-item';

import './conferences-list.css';

import { getStore as getEventStore } from '../../stores/event';

const eventStore = getEventStore();

const ConferencesList = observer(() => {
  useEffect(() => {
    eventStore.getFilterEvents();
  }, []);

  const events = eventStore.events;

  if (!events) return <Loader center size="lg" />;

  if (!events || (events && !events.length))
    return (
      <div className="conferences-list-empty">
        <div>Конференции не найдены</div>
      </div>
    );

  return (
    <PanelGroup className="conferences-list">
      {events.map(el => {
        return <ConferencesItem key={el.conference_id} {...el} />;
      })}
    </PanelGroup>
  );
});

export default ConferencesList;
