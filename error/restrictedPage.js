import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
const RestrictedPage = props => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page. Kindly contact with system administrator for more information."
      extra={
        <Button type="primary">
          <Link to="/">Go Back to Home</Link>
        </Button>
      }
    />
  );
};

export default RestrictedPage;
