import React from 'react';
import { FlexboxGrid, Content, Container, Col } from 'rsuite';

import RegisterPanel from '../../components/register-panel';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Container>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item componentClass={Col} md={12} sm={21} xs={24}>
              <RegisterPanel />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
};

export default RegisterPage;
