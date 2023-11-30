// Importing necessary dependencies and components from external files and libraries
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Typography, Image, Row, Col } from "antd";
import style from "../styles/viewprofile.module.scss";
import useExtractEpisodeNumbers from "../hooks/useExtractEpisodeNumbers";
import { axiosGet } from "../services/api/getApi";
import { apiRouter } from "../services/utilities/apiRouter";
import { getLastDigitsAfterSlash } from "../utils/getLocationId";

// Destructuring Typography components from Ant Design
const { Title } = Typography;

const ViewProfile = () => {
  // Using the useLocation hook from react-router-dom to get the current location
  const location = useLocation();
  const character = location.state;
  const [loading, setLoading] = useState(false);
  const [episodesnames, SetEpisodesNames] = useState([]);
  const [originlocationdetails, setOriginLocationDetails] = useState([]);
  const [locationdetails, setLocationDetails] = useState([]);

  // Custom hook to extract episode numbers from character data
  const episodes = useExtractEpisodeNumbers(character.episode);

  // Function to fetch episodes based on episode numbers
  async function fetchEpisodes() {
    setLoading(true);
    const queryParams = {
      episodes,
    };
    try {
      const result = await axiosGet(apiRouter.GET_EPISODE_NAMES, queryParams);
      if (result) {
        if (episodes.length > 1) {
          SetEpisodesNames(result.data);
        } else {
          SetEpisodesNames([result.data]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  // Function to fetch location details (origin or current location) based on URL
  async function fetchLocation(id, type) {
    setLoading(true);
    const queryParams = {
      character: id,
    };
    try {
      const result = await axiosGet(apiRouter.GET_LOCATION, queryParams);
      if (result) {
        if (type === "origin") setOriginLocationDetails(result.data);
        else setLocationDetails(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  // useEffect hook to fetch data on initial render
  useEffect(() => {
    fetchEpisodes();
    if (character.origin.url) {
      fetchLocation(getLastDigitsAfterSlash(character.origin.url), "origin");
    }
    if (character.location.url) {
      fetchLocation(getLastDigitsAfterSlash(character.location.url));
    }
    console.log(loading);
  }, []);

  // JSX structure for the ViewProfile component
  return (
    <div className={style.viewprofilepage}>
      {/* Title */}
      <Title className={style.viewprofileheading}>Character Profile</Title>

      {/* Character image */}
      <Row className={style.viewprofileimagecontainer}>
        <Image
          src={character.image}
          alt={character.name}
          className={style.characterimage}
        />
      </Row>

      {/* Character name */}
      <Title className={style.viewprofilecharactername}>{character.name}</Title>

      {/* Character details */}
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

      {/* List of episodes featured in */}
      <Row>
        <Row className={style.characterepisodeheading}>
          List of Episodes Featured in:
        </Row>
        {episodesnames.map((characterepisode, index) => (
          <Col key={index} className={style.viewprofiledetails} xs={12} lg={8}>
            {index + 1}.{" "}
            <Link
              to={characterepisode.url}
              className={style.characterfeaturedepisodelink}
            >
              {characterepisode.name}
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewProfile;
