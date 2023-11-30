/* eslint-disable react/prop-types */
import { Card, Col, Image, Row, Tag } from "antd";
import style from "../../styles/card.module.scss";
import image from "/rickmorty.webp";
const EpisodeCard = ({ data }) => {
  return (
    <div className={style.card}>
      <Card
        title={
          <Image
            src={image}
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
              Number of Characters
              <Tag color={"blue"}>{data.characters.length}</Tag>
            </Col>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EpisodeCard;
