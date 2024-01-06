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
  const renderepisodes = useExtractEpisodeNumbers(character.episode);
  // Function to fetch episodes based on episode numbers
  const storedEpisodes = localStorage.getItem("episodes");
  const storedEpisodesArray = JSON.parse(storedEpisodes);
  async function fetchEpisodes() {
    setLoading(true);
    const queryParams = {
      ///checking if the storedepisodearray is present if its checking for which episodes need to perfrom api call
      episodes: storedEpisodesArray
        ? episodes.filter((episode) => {
            const isEpisodeInLocalStorage = storedEpisodesArray?.some(
              (storedEpisode) => storedEpisode.id == episode
            );
            return !isEpisodeInLocalStorage;
          })
        : episodes,
    };
    ///only perfroming api call when episodes is greater than one
    if (queryParams.episodes.length > 0) {
      try {
        const result = await axiosGet(apiRouter.GET_EPISODE_NAMES, queryParams);
        if (result) {
          //handling case where character features in only 1 episode there object is coming so changing it accordingly
          const newEpisodesData = Array.isArray(result.data) ? result.data : [result.data];
          if (storedEpisodesArray) {
            ///here we are checking whether the episode is present or not we dont need it generally but keeping it for verification
            newEpisodesData.forEach((newEpisode) => {
              const isNewEpisodeInLocalStorage = !storedEpisodesArray?.some(
                (storedEpisode) => {
                  return storedEpisode.id == newEpisode.id;
                }
              );
              console.log(isNewEpisodeInLocalStorage);
              if (isNewEpisodeInLocalStorage) {
                //pushing the new episodes in the storedepisodes
                storedEpisodesArray.push(newEpisode);
              }
            });
            localStorage.setItem(
              "episodes",
              JSON.stringify(storedEpisodesArray)
              ///updating local storage
            );
          } else {
            //if the local storage is empty we are handling the case 
            console.log(result.data.length);
            //this case is if character feature in more than one episode
            if (Array.isArray(result.data) && result.data.length > 0) {
              localStorage.setItem("episodes", JSON.stringify(result.data));
            } else if (result.data) {
              //this case handles if character features in only one episode
              localStorage.setItem("episodes", JSON.stringify([result.data]));
            }
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
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
    //converted fetch episodes to async await because we are taking data from local storage it will be available after sometime not immediately
    async function fetchDataAndProcess() {
      await fetchEpisodes();
      ///this operation checks for the episodes the character has featured in and forms array of that in episodenamedata
      const episodenamedata =
        storedEpisodesArray?.length > 0 &&
        storedEpisodesArray.filter((characterepisode) =>
          renderepisodes?.some(
            (storedEpisode) => storedEpisode == characterepisode.id
          )
        );
      console.log(episodenamedata);
      ///finally we are setting episodenamedata in the episode names
      SetEpisodesNames(episodenamedata);
    }
    fetchDataAndProcess();
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
        {episodesnames.length > 0 &&
          episodesnames.map((characterepisode, index) => (
            <Col
              key={index}
              className={style.viewprofiledetails}
              xs={12}
              lg={8}
            >
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
