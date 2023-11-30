// Importing necessary dependencies and components from external files and libraries
import { useEffect, useState } from "react";
import { axiosGet } from "../services/api/getApi";
import { apiRouter } from "../services/utilities/apiRouter";
import { Col, Pagination, Row } from "antd";
import style from "../styles/episodes.module.scss";
import EpisodeCard from "../components/common/EpisodeCard";
import Search from "antd/es/input/Search";
const Viewepisodes = () => {
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Function to fetch episodes based on the selected page and episode number
  async function fetchEpisodes(page, episode) {
    const queryParams = {
      page: page,
      episode: episode ? episode : "",
    };
    setLoading(true);
    try {
      const result = await axiosGet(apiRouter.GET_EPISODE_NAMES, queryParams);
      if (result) {
        setEpisodes(result.data.results);
        setTotalPages(result.data.info.pages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  // Function to handle episode search
  const searchByEpisode = (value) => {
    fetchEpisodes(pages, value.target.value);
  };

  // Function to handle page change in the pagination
  const handlePageChange = (page) => {
    setPages(page);
    fetchEpisodes(page);
  };

  // useEffect hook to fetch episodes on initial render
  useEffect(() => {
    fetchEpisodes(pages);
    console.log(loading);
  }, []);

  // JSX structure for the Viewepisodes component
  return (
    <>
      {/* Header */}
      <div>viewlocations</div>
      <div className={style.viewlocations}>
        {/* Search bar for episode number */}
        <Row className={style.viewepisodessearchdiv}>
          <Col span={20}>
            <Search
              placeholder="Search by Episode Number"
              onChange={searchByEpisode}
            />
          </Col>
        </Row>

        {/* Episodes container */}
        <div className={style.episodescontainer}>
          {episodes ? (
            episodes?.map((location, index) => (
              <EpisodeCard key={index} data={location} />
            ))
          ) : (
            <h2 style={{ color: "wheat" }}>Nothing to show here</h2>
          )}
        </div>

        {/* Pagination component */}
        <div className={style.paginateddiv}>
          <Pagination
            current={pages}
            total={totalPages * 20}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};
export default Viewepisodes;
