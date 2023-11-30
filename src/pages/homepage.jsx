// Importing necessary dependencies and components from external files and libraries
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { axiosGet } from "../services/api/getApi";
import { apiRouter } from "../services/utilities/apiRouter";
import { Pagination, Col, Row, Button, Input, Dropdown } from "antd";
import CharacterCard from "../components/common/CharacterCard";
import style from "../styles/homepage.module.scss";
import GenerateSelect from "../ui/selectOption";
import Search from "antd/es/input/Search";
import { MenuOutlined } from "@ant-design/icons";
const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filtereddata, setFilteredData] = useState([]);
  const [showfilters, setShowFilters] = useState(false);
  const [name, setName] = useState();
  const [filters, setFilters] = useState([
    { status: "" },
    { gender: "" },
    { species: "" },
    { type: "" },
    { location: "" },
    { episode: "" },
  ]);

  // Options for different filter categories
  const statusOptions = ["Alive", "Dead", "Unknown"];
  const genderOptions = ["Male", "Female", "Genderless", "unknown"];
  const speciesOptions = ["Human", "Alien", "unknown"];
  const typeOptions = [
    "Genetic experiment",
    "Superhuman (Ghost trains summoner)",
    "Parasite",
    "Human with antennae",
    "Human with ants in his eyes",
  ];
  const episodesArray = Array.from({ length: 51 }, (_, index) => index + 1);

  // Navigation items for the dropdown menu
  const items = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" href="/viewlocations">
          Locations
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="/viewepisodes">
          Episodes
        </a>
      ),
    },
  ];

  // Function to fetch data based on the selected page and filters
  async function fetchData(page) {
    setLoading(true);
    const queryParams = {
      page: page,
      name: name ? name : "",
      status: filters[0].status ? filters[0].status : "",
      gender: filters[1].gender ? filters[1].gender : "",
      species: filters[2].species ? filters[2].species : "",
      type: filters[3].type ? filters[3].type : "",
      location: filters[4].location ? filters[4].location : "",
      episode: filters[5].episode ? filters[5].episode : "",
    };
    try {
      const result = await axiosGet(apiRouter.GET_ALL_CHARACTERS, queryParams);
      if (!result.error) {
        setFilteredData(result.data.results);
        setTotalPages(result.data.info.pages);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  // Function to handle the search by name input
  async function searchByName(value) {
    setName(value.target.value);
    fetchData(pages);
  }

  // Function to handle page change in the pagination
  const handlePageChange = (page) => {
    setPages(page);
    fetchData(page);
  };

  // Function to apply selected filters
  const applyFilters = () => {
    fetchData(pages);
  };

  // Function to handle changes in status filter
  const handleStatusFilter = (value, type) => {
    const newFilters = [...filters];
    const updatedFilter = newFilters.find(
      (filter) => filter[type] !== undefined,
    );
    if (updatedFilter) {
      updatedFilter[type] = value;
    }
    setFilters(newFilters);
  };

  // useEffect hook to fetch data on initial render and when 'pages' state changes
  useEffect(() => {
    fetchData(pages);
    console.log(loading);
  }, [pages]);

  // JSX structure for the Homepage component
  return (
    <div className={style.homepagecontainer}>
      {/* Search and filter row */}
      <Row className={style.homepagefilters}>
        {/* Search input */}
        <Col xs={24} sm={16} lg={16} className={style.homepagesearch}>
          <Search placeholder="search by name" onChange={searchByName} />
        </Col>
        {/* Show Filters button */}
        <Col
          xs={6}
          lg={2}
          sm={4}
          className={style.homepageshowfilters}
          onClick={() => setShowFilters(!showfilters)}
        >
          <Button> Show Filters </Button>
        </Col>
        {/* Dropdown menu button */}
        <Col xs={6} lg={2} sm={4} className={style.homepageshowfilters}>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
          >
            <Button>
              {" "}
              <MenuOutlined />{" "}
            </Button>
          </Dropdown>
        </Col>
      </Row>

      {/* Filter container (visible when 'showfilters' is true) */}
      {showfilters && (
        <Row className={style.homepagefiltercontainer}>
          {/* Status filter */}
          <Col xs={10} md={6} lg={6} className={style.homepageselect}>
            {" "}
            <GenerateSelect
              optionsarray={statusOptions}
              defaultValue={"Select Status"}
              onChange={handleStatusFilter}
              type="status"
            />
          </Col>
          {/* Gender filter */}
          <Col xs={10} md={6} lg={6} className={style.homepageselect}>
            {" "}
            <GenerateSelect
              optionsarray={genderOptions}
              defaultValue={"Select Gender"}
              onChange={handleStatusFilter}
              type="gender"
            />
          </Col>
          {/* Species filter */}
          <Col xs={10} md={6} lg={6} className={style.homepageselect}>
            {" "}
            <GenerateSelect
              optionsarray={speciesOptions}
              defaultValue={"Select Species"}
              onChange={handleStatusFilter}
              type="species"
            />
          </Col>
          {/* Type filter */}
          <Col xs={10} md={6} lg={6} className={style.homepageselect}>
            {" "}
            <GenerateSelect
              optionsarray={typeOptions}
              defaultValue={"Select Type"}
              onChange={handleStatusFilter}
              type="type"
            />
          </Col>
          {/* Episode filter */}
          <Col xs={10} md={6} lg={6} className={style.homepageselect}>
            {" "}
            <GenerateSelect
              optionsarray={episodesArray}
              defaultValue={"Select Episode"}
              onChange={handleStatusFilter}
              type="episode"
            />
          </Col>
          {/* Location filter */}
          <Col xs={10} md={6} lg={6} className={style.homepagesearchlocation}>
            <Input
              style={{ width: "90%" }}
              placeholder="enter location"
              onChange={(e) => handleStatusFilter(e.target.value, "location")}
            />
          </Col>
          {/* Apply Filters button */}
          <Col xs={10} md={6} lg={6} className={style.homepageapplyfilters}>
            {" "}
            <Button onClick={applyFilters} className={style.applyfiltersbtn}>
              Apply Filters
            </Button>
          </Col>
        </Row>
      )}

      {/* Character cards container */}
      <div className={style.homepagecharactercardcontainer}>
        {filtereddata ? (
          filtereddata?.map((character, index) => (
            <CharacterCard key={index} data={character} />
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
  );
};
export default Homepage;
