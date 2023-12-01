import React from "react";
import style from "../styles/loader.module.scss";

const LoaderPage = () => {
  return (
    <div className={style.loadercontainer}>
      <img src="/loader.gif" alt="Loader" className={style.loaderimage} />
    </div>
  );
};

export default LoaderPage;
