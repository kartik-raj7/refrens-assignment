import { Card, Col, Image, Row, Tag } from 'antd'
import style from '../../styles/charactercard.module.scss'
import { getStatusColor } from '../../utils/getStatusColors'
import { useNavigate } from 'react-router-dom'
const CharacterCard = ({loading,data}) => {
  const navigate=useNavigate();
  const viewCharacterPage=()=>{
    navigate(`/viewprofile/character=${data.name}`, { state: data });
  }
  return (
    <div className={style.charactercard} onClick={viewCharacterPage}>
    <Card title={<Image src={data.image} alt='character' preview={false} className={style.characterimage}/>}>
        <Row>
            <Col span={24} className={style.charactername}>{data.name}</Col>
            <Col span={24} className={`${style.characterstatus} `} style={{color:getStatusColor(data.status)}}> {data.status}
</Col>      <Col span={24} className={style.characterdetailrow}>
            <Col span={12} className={style.characterspecies}>{data.species}</Col>
            <Col span={12} className={style.charactergender}><Tag color={data.gender=='Male'?'blue':'pink'}>{data.gender}</Tag></Col>
            </Col>
        </Row>
    </Card>
    </div>
  )
}

export default CharacterCard
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