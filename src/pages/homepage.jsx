import React, { useEffect, useState } from "react";
import { axiosGet } from "../services/api/getApi";
import { apiRouter } from "../services/utilities/apiRouter";
import { Pagination, List, Space, Tag, Select, Col, Row, Button } from 'antd';
import CharacterCard from "../components/common/CharacterCard";
import style from '../styles/homepage.module.scss';
import GenerateSelect from "../ui/selectOption";
import Search from "antd/es/input/Search";

const { Option } = Select;

const Homepage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
 const [filtereddata,setFilteredData] = useState([]);
 const [showfilters,setShowFilters] = useState(false);
 const [name,setName] = useState();
 const [filters,setFilters] = useState([{status:''},{gender:''},{species:''},{type:''},{location:''},{episode:''}]);
 const statusOptions = ['Alive', 'Dead', 'Unknown'];
 const genderOptions = ['Male','Female','unknown'];
 const speciesOptions = ['Human','Alien','unknown'];
 const typeOptions = ['Genetic experiment','Superhuman (Ghost trains summoner)','Parasite','Human with antennae','Human with ants in his eyes',]
 const episodesArray = Array.from({ length: 51 }, (_, index) => index + 1);
 async function fetchData(page) {
    setLoading(true);
    const queryParams = {
      page: page,
      name: name?name:'',
      status: filters[0].status ? filters[0].status : '',  
      gender: filters[1].gender ? filters[1].gender : '',
      species: filters[2].species ? filters[2].species : '',
      type: filters[3].type ? filters[3].type : '',
      location: filters[4].location ? filters[1].gender : '',
      episode: filters[5].episode ? filters[5].episode : '',
    };
    try {
      const result = await axiosGet(apiRouter.GET_ALL_CHARACTERS, queryParams);
      if (!result.error) {
        setData(result.data.results);
        setFilteredData(result.data.results);
        setTotalPages(result.data.info.pages);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }
  async function searchByName(value){
        setName(value.target.value);
        fetchData(pages)
    }
  const handlePageChange = (page) => {
    setPages(page);
    fetchData(page);
  };
  const applyFilters=()=>{
    fetchData(pages);
  }
  const handleStatusFilter = (value, type) => {
    const newFilters = [...filters];
    const updatedFilter = newFilters.find(filter => filter[type] !== undefined);
    if (updatedFilter) {
      updatedFilter[type] = value;
    }
    setFilters(newFilters);
    console.log(filters);
  };
  const showCards = () => {
    // if (!loading && filteredData.length > 0) {
      return (
        <div>
        <Row className={style.homepagefilters}>
        <Col span={16} className={style.homepagesearch}><Search placeholder="search by name" onChange={searchByName}/></Col>
        <Col xs={4} className={style.homepageshowfilters} onClick={()=>setShowFilters(!showfilters)}><Button> Show Filters </Button></Col>
          </Row>
          {showfilters&&<Row>
        <Col xs={10} md={8} lg={6} className={style.homepageselect}> <GenerateSelect optionsarray={statusOptions} defaultValue={'Select Status'} onChange={handleStatusFilter} type='status'/></Col>
        <Col xs={10} md={8} lg={6} className={style.homepageselect}> <GenerateSelect optionsarray={genderOptions} defaultValue={'Select Gender'} onChange={handleStatusFilter} type='gender'/></Col>
        <Col xs={10} md={8} lg={6} className={style.homepageselect}>  <GenerateSelect optionsarray={speciesOptions} defaultValue={'Select Species'} onChange={handleStatusFilter} type='species'/></Col>
        <Col xs={10} md={8} lg={6} className={style.homepageselect}> <GenerateSelect optionsarray={typeOptions} defaultValue={'Select Type'} onChange={handleStatusFilter} type='type'/></Col>
        <Col xs={10} md={8} lg={6} className={style.homepageselect}> <GenerateSelect optionsarray={episodesArray} defaultValue={'Select Episode'} onChange={handleStatusFilter} type='episode'/></Col>
        <Col xs={10} md={8} lg={6} className={style.homepageselect}> <Button onClick={applyFilters}>Apply Filters</Button></Col>
        </Row>}
          <div className={style.homepagecharactercardcontainer}>
          {filtereddata?.map((character, index) => (
            <CharacterCard key={index} data={character} />
          ))}
        </div>
        </div>
      );
    // } else {
    //   return <h2>...Loading</h2>;
    // }
  };

  useEffect(() => {
    fetchData(pages);
  }, [pages]);

  return (
    <div className={style.homepagecontainer}>
      {showCards()}
      <Pagination
        current={pages}
        total={totalPages * 20}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Homepage;