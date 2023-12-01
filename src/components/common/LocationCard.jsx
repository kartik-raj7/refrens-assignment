/* eslint-disable react/prop-types */
import React from "react";
import { Card, Col, Image, Row, Tag } from "antd";
import style from "../../styles/card.module.scss";
const LocationCard = ({ data }) => {
  return (
    <div className={style.card}>
      <Card
        title={
          <Image
            src="/rickmorty.webp"
            alt="character"
            preview={false}
            className={style.cardimage}
          />
        }
      >
        <Row>
          <Col span={24} className={style.cardname}>
            {data.name}
          </Col>
          <Col span={24} className={`${style.carddimension} `}>
            {" "}
            {data.dimension}
          </Col>
          <Col span={24} className={style.carddetailrow}>
            <Col span={12} className={style.cardspecies}>
              {data.type}
            </Col>
            <Col span={12} className={style.cardgender}>
              <Tag color={"blue"}>Residents - {data.residents.length}</Tag>
            </Col>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LocationCard;
