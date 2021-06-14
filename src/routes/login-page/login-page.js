import React from 'react';
import { FlexboxGrid, Content, Container, Col } from 'rsuite';

import LoginPanel from '../../components/login-panel';

const LoginPage = () => {
  return (
    <div className="login-page">
      <Container>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item componentClass={Col} md={12} sm={21} xs={24}>
              <LoginPanel />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
};

export default LoginPage;
