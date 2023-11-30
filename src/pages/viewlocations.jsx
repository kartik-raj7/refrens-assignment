// Importing necessary dependencies and components from external files and libraries
import { useEffect, useState } from "react";
import { axiosGet } from "../services/api/getApi";
import LocationCard from "../components/common/LocationCard";
import { apiRouter } from "../services/utilities/apiRouter";
import { Col, Pagination, Row } from "antd";
import style from "../styles/location.module.scss";
import Search from "antd/es/input/Search";
const Viewlocations = () => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Function to fetch locations based on the selected page and location name
  async function fetchLocation(page, location) {
    const queryParams = {
      page: page,
      name: location ? location : "",
    };
    setLoading(true);
    try {
      const result = await axiosGet(apiRouter.GET_LOCATION, queryParams);
      if (result) {
        setLocations(result.data.results);
        setTotalPages(result.data.info.pages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  // Function to handle location search
  const searchByLocation = (value) => {
    fetchLocation(pages, value.target.value);
  };

  // Function to handle page change in the pagination
  const handlePageChange = (page) => {
    setPages(page);
    fetchLocation(page);
  };

  // useEffect hook to fetch locations on initial render
  useEffect(() => {
    fetchLocation(pages);
    console.log(loading);
  }, []);

  // JSX structure for the Viewlocations component
  return (
    <>
      {/* Header */}
      <div>viewlocations</div>
      <div className={style.viewlocations}>
        {/* Search bar for location name */}
        <Row className={style.viewlocationscontainer}>
          <Col span={20}>
            <Search
              placeholder="Search by Location"
              onChange={searchByLocation}
            />
          </Col>
        </Row>

        {/* Locations container */}
        <div className={style.location}>
          {locations ? (
            locations?.map((location, index) => (
              <LocationCard key={index} data={location} />
            ))
          ) : (
            <h2 style={{ color: "wheat" }}>Nothing to show here</h2>
          )}

          {/* Pagination component */}
          <div className={style.paginateddiv}>
            <Pagination
              current={pages}
              total={totalPages * 20}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Viewlocations;
