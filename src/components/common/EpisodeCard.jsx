/* eslint-disable react/prop-types */
import React from "react";
import { Card, Col, Image, Row, Tag } from "antd";
import style from "../../styles/card.module.scss";
const EpisodeCard = ({ data }) => {
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
          <Col span={24} className={style.cardepisode}>
            {data.episode}
          </Col>
          <Col span={24} className={`${style.carddimension} `}>
            {" "}
            {data.air_date}
          </Col>
          <Col span={24} className={style.carddetailrow}>
            <Col span={24} className={style.cardcharacters}>
              <Col span={20}>Number of Characters</Col>
              <Col span={4}>
                <Tag color={"blue"}>{data.characters.length}</Tag>
              </Col>
            </Col>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EpisodeCard;
