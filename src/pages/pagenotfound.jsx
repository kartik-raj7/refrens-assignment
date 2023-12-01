// NotFoundPage.jsx
import React from "react";
import { Result, Button } from "antd";
import style from "../styles/notfoundpage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={style.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" href="/">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
