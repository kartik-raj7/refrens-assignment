import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Typography, Image, Descriptions, Row, Col } from 'antd';
import style from '../styles/viewprofile.module.scss';
import useExtractEpisodeNumbers from '../hooks/useExtractEpisodeNumbers';
import { axiosGet } from '../services/api/getApi';
import { apiRouter } from '../services/utilities/apiRouter';
const { Title } = Typography;
const ViewProfile = () => {
  const location = useLocation();
  const character = location.state;
  const [loading,setLoading] = useState(false);
  const [episodesnames,SetEpisodesNames] = useState([]);
  const [originlocationdetails,setOriginLocationDetails] = useState([]);
  const [locationdetails,setLocationDetails] = useState([]);
  const episodes = useExtractEpisodeNumbers(character.episode);
  async function fetchEpisodes() {
    setLoading(true);
    const queryParams = {
      episodes,
    };
    try {
      const result = await axiosGet(apiRouter.GET_EPISODE_NAMES, queryParams);
      if (result) {
        if(episodes.length>1){
        SetEpisodesNames(result.data);
        }
        else{
            SetEpisodesNames([result.data]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }
  async function fetchLocation(id,type) {
    setLoading(true);
    console.log(character)
    const queryParams={
        character:id,
    };
    try {
      const result = await axiosGet(apiRouter.GET_LOCATION,queryParams);
      if (result) {
        if(type=='origin')setOriginLocationDetails(result.data)
        else setLocationDetails(result.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchEpisodes();
    if(character.origin.url){
    fetchLocation(character.origin.url[character.origin.url.length-1],'origin');
    }
    else if(character.location.url){
    fetchLocation(character.location.url[character.location.url.length-1]);
    }
  },[])
  if (!character) {
    return <div style={{ color: 'white' }}>Character not found</div>;
  }

  return (
    <div className={style.viewprofilepage}>
      <Title className={style.viewprofileheading}>Character Profile</Title>
      <Row className={style.viewprofileimagecontainer}><Image src={character.image} alt={character.name} className={style.characterimage}/></Row>
      <Title className={style.viewprofilecharactername}>{character.name}</Title>
      <Row>
        <Col xs={12} lg={8} className={style.characterdetailcol}>
            Status: {character.status}
        </Col>
        <Col xs={12} lg={8} className={style.characterdetailcol}>
            Species: {character.species}
        </Col>
        <Col xs={12} lg={8} className={style.characterdetailcol}>
            Gender: {character.gender}
        </Col>
        <Col xs={12} lg={8} className={style.characterdetailcol}>
            Origin: {character.origin.name}
        </Col>
        <Col xs={12} lg={8} className={style.characterdetailcol}>
            Origin Dimension: {originlocationdetails.dimension}
        </Col>
        <Col xs={12} lg={8} className={style.characterdetailcol}>
            Origin Residents: {originlocationdetails?.residents?.length}
        </Col>
        <Col xs={12} lg={8} className={style.characterdetailcol}>
            Location: {character.location.name}
        </Col>
        <Col xs={12} lg={8} className={style.characterdetailcol}>
            Location Dimension: {locationdetails.dimension}
        </Col>
        <Col xs={12} lg={8} className={style.characterdetailcol}>
            Location Residents: {locationdetails?.residents?.length}
        </Col>
        <Col xs={12} lg={8} className={style.characterdetailcol}>
            Type: {character.type}
        </Col>

      </Row>
      <Row>
    <Row className={style.characterepisodeheading}>List of Episodes Featured in:</Row>
      {episodesnames.map((characterepisode, index) => (
            <Col key={index} className={style.viewprofiledetails} xs={12} lg={8}>{index+1}. <Link to={characterepisode.url} className={style.characterfeaturedepisodelink}>{characterepisode.name}</Link></Col>
          ))}
      </Row>
    </div>
  );
};

export default ViewProfile;
