import React from 'react';
import Layout from 'antd/lib/layout';
import PageHeader from 'antd/lib/page-header';
import { Link, useNavigate } from 'react-router-dom';

import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const { Header, Content, Footer } = Layout;

const CustomHeader = () => {
  const navigate = useNavigate();
  return (
    <PageHeader
      className="site-page-header h-full"
      title={<Link to="/">React Pipeline</Link>}
      subTitle="SPA using React + TS + Vite + Tailwind"
      onBack={() => navigate(-1)}
      extra={
        <>
          <Link to="/product-list">Product List</Link>
          <Link to="/page3">Page 3</Link>
        </>
      }
    />
  );
};

const CustomFooter = () => (
  <div className="text-center">&copy; Maifee Ul Asad</div>
);

interface ILayoutProps {
  children: any;
}

// eslint-disable-next-line react/prefer-stateless-function
class CustomLayout extends React.Component<ILayoutProps> {
  render() {
    const { children } = this.props;

    return (
      <OverlayScrollbarsComponent
        element="span"
        options={{ scrollbars: { autoHide: 'scroll' } }}
        defer
      >
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ backgroundColor: 'white' }}>
            <CustomHeader />
          </Header>
          <Content>{children}</Content>
          <Footer style={{ backgroundColor: 'white' }}>
            <CustomFooter />
          </Footer>
        </Layout>
      </OverlayScrollbarsComponent>
    );
  }
}

export { CustomLayout };
