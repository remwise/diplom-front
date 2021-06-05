import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { PanelGroup, Row, Col, Loader, Nav, Icon, Timeline, FlexboxGrid } from 'rsuite';

import ConferencesDetailsContent from '../conference-details-content';
import ConferenceNav from '../conference-nav';
import NotFoundPage from '../../routes/not-found-page';

import './conferences-details.css';

import { getStore as getConferenceStore } from '../../stores/conference';

const conferenceStore = getConferenceStore();

// import { getStore as getActivityStore } from '../../stores/activities';
// import { getStore as getUserStore } from '../../stores/user';

// const activityStore = getActivityStore();
// const userStore = getUserStore();

const ConferencesDetails = observer(() => {
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    conferenceStore.getConference({ conference_id: id });
  }, [id]);

  const [active, setActive] = useState('home');

  if ((conferenceStore.conference === undefined && !conferenceStore.error) || conferenceStore.loading) {
    // console.log(conferenceStore.error);
    return <Loader center size="lg" />;
  }

  if (conferenceStore.error && !conferenceStore.loading) {
    // console.log(conferenceStore);
    return <NotFoundPage />;
  }

  const { name, organization_name } = conferenceStore.conference;

  return (
    <div>
      <p className="main-caption conf_name">{name}</p>
      <p className="conf_org">{organization_name}</p>
      <ConferenceNav active={active} onSelect={e => setActive(e)} conference_id={id} />
      <ConferencesDetailsContent conference_id={id} active={active} />
    </div>
  );
});

export default ConferencesDetails;
