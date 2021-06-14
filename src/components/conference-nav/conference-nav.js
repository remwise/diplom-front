import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Col, Dropdown, Icon, Row, Nav } from 'rsuite';
import RespNav from '@rsuite/responsive-nav';

import './conference-nav.css';

import { getStore as getDigestStore } from '../../stores/digest';

const digestStore = getDigestStore();

const ConferenceNav = observer(({ active, onSelect, conference_id }) => {
  useEffect(() => {
    digestStore.getDigests({ conference_id });
  }, [conference_id]);

  let respNavItems = null,
    navItems = null,
    navItemsDropdown = null,
    startIndex = 7;

  if (digestStore.digests) {
    respNavItems = digestStore.digests.map((el, index) => {
      if (index !== 0)
        return (
          <RespNav.Item key={el.digest_id} eventKey={el.digest_id}>
            {el.publication_year}
          </RespNav.Item>
        );
    });

    navItems = digestStore.digests.slice(1, startIndex).map(el => {
      return (
        <Nav.Item key={el.digest_id} eventKey={el.digest_id}>
          {el.publication_year}
        </Nav.Item>
      );
    });

    navItemsDropdown = digestStore.digests.slice(startIndex).map(el => {
      return (
        <Dropdown.Item key={el.digest_id} eventKey={el.digest_id}>
          {el.publication_year}
        </Dropdown.Item>
      );
    });
  }

  const navItemsDropdownBlock =
    navItemsDropdown && navItemsDropdown.length ? (
      <Dropdown trigger={['click', 'hover']} title="Другие">
        {navItemsDropdown}
      </Dropdown>
    ) : null;

  const digests = navItems !== null && navItems.length ? <Nav.Item disabled>Сборники:</Nav.Item> : null;

  return (
    <Row>
      <Col smHidden xsHidden>
        <Nav appearance="tabs" activeKey={active} onSelect={onSelect} className="conference-nav">
          <Nav.Item eventKey="home" icon={<Icon icon="home" />}>
            Событие
          </Nav.Item>
          {digests}
          {navItems}
          {navItemsDropdownBlock}
        </Nav>
      </Col>
      <Col lgHidden mdHidden>
        <RespNav appearance="tabs" activeKey={active} onSelect={onSelect} className="conference-nav" moreText="Другие">
          <RespNav.Item eventKey="home" icon={<Icon icon="home" />}>
            Событие
          </RespNav.Item>
          {digests}
          {respNavItems}
        </RespNav>
      </Col>
    </Row>
  );
});

export default ConferenceNav;
