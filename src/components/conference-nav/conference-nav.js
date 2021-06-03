import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Icon, Nav } from 'rsuite';

import './conference-nav.css';

import { getStore as getDigestStore } from '../../stores/digest';

const digestStore = getDigestStore();

const ConferenceNav = observer(({ active, onSelect, conference_id }) => {
  useEffect(() => {
    digestStore.getDigests({ conference_id });
  }, [conference_id]);

  const navItems = digestStore.digests
    ? digestStore.digests.map(el => {
        return (
          <Nav.Item key={el.digest_id} eventKey={el.digest_id}>
            {el.publication_year}
          </Nav.Item>
        );
      })
    : null;

  const digests = navItems !== null && navItems.length ? <Nav.Item disabled>Сборники:</Nav.Item> : null;

  return (
    <Nav appearance="tabs" activeKey={active} onSelect={onSelect} className="conference-nav">
      <Nav.Item eventKey="home" icon={<Icon icon="home" />}>
        Событие
      </Nav.Item>
      {digests}
      {navItems}
    </Nav>
  );
});

export default ConferenceNav;
