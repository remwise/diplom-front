import React, { useState } from 'react';
import { FlexboxGrid, Content, Container, Sidebar, Navbar, Nav, Dropdown, Icon, Sidenav, Header, Col } from 'rsuite';

import UserArticlesPanel from '../../components/user-articles-panel';
import NotificationsPanel from '../../components/notifications-panel';
import UserSettingsPanel from '../../components/user-settings-panel/user-settings-panel';

import './user-page.css';

const UserPageNav = props => {
  const { appearance, active, onSelect, reversed = false } = props;
  return (
    <Nav reversed={reversed} appearance={appearance} active={active} onSelect={onSelect} vertical activeKey={active}>
      <Nav.Item eventKey="articles" icon={<Icon icon="group" />}>
        Заявки
      </Nav.Item>
      {/* <Nav.Item eventKey="notifications" icon={<Icon icon="magic" />}>
        Оповещения
      </Nav.Item> */}
      <Nav.Item eventKey="settings" icon={<Icon icon="gear" />}>
        Настройки
      </Nav.Item>
    </Nav>
  );
};

const UserPage = () => {
  const [active, setActive] = useState('articles');

  let page;

  switch (active) {
    case 'articles':
      page = <UserArticlesPanel />;
      break;
    // case 'notifications':
    //   page = <NotificationsPanel />;
    //   break;
    case 'settings':
      page = <UserSettingsPanel />;
      break;
    default:
      return;
  }

  return (
    <Container>
      <p className="main-caption user-page-caption">Личный кабинет</p>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item componentClass={Col} xs={24} lgHidden mdHidden>
          <UserPageNav appearance="subtle" reversed={true} active={active} onSelect={e => setActive(e)} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item componentClass={Col} xsHidden smHidden md={4}>
          <UserPageNav appearance="tabs" active={active} onSelect={e => setActive(e)} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item componentClass={Col} xs={24} md={19}>
          <Container>{page}</Container>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
};

export default UserPage;
