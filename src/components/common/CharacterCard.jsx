/* eslint-disable react/prop-types */
import { Card, Col, Image, Row, Tag } from "antd";
import style from "../../styles/card.module.scss";
import { getStatusColor } from "../../utils/getStatusColors";
import { useNavigate } from "react-router-dom";

const CharacterCard = ({ data }) => {
  const navigate = useNavigate();
  const viewCharacterPage = () => {
    navigate(`/viewprofile/character=${data.name}`, { state: data });
  };
  return (
    <div className={style.card} onClick={viewCharacterPage}>
      <Card
        title={
          <Image
            src={data.image}
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
          <Col
            span={24}
            className={`${style.cardstatus} `}
            style={{ color: getStatusColor(data.status) }}
          >
            {" "}
            {data.status}
          </Col>{" "}
          <Col span={24} className={style.carddetailrow}>
            <Col span={12} className={style.cardspecies}>
              {data.species}
            </Col>
            <Col span={12} className={style.cardgender}>
              <Tag color={data.gender == "Male" ? "blue" : "pink"}>
                {data.gender}
              </Tag>
            </Col>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CharacterCard;
/*
  <Card
    style={{
      width: 300,
      marginTop: 16,
    }}
    actions={[
    //   <SettingOutlined key="setting" />,
    //   <EditOutlined key="edit" />,
    //   <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Skeleton loading={loading} avatar active>
      <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
        title="Card title"
        description="This is the description"
      />
    </Skeleton>
  </Card>
  */
