import { useEffect, useState } from "react";
import Cookies from "js-cookies";
import Header from "../header/header";
import "./index.css";
import { FaSearch } from "react-icons/fa";
import FilterSection from "../FilterJobs";
import DisplayJobs from "../Displayjobs";

const Jobs = () => {
  const [allValues, setValues] = useState({
    alljobsList: [],
    showErrormsg: false,
    empType: [],
    minPackage: "",
    searchInput: "",
  });
  const token = Cookies.getItem("jwtToken");

  useEffect(() => {
    const fetchJobsData = async () => {
      const url =
        `https://apis.ccbp.in/jobs?employment_type=${allValues.empType}&minimum_package=${allValues.minPackage}&search_input=${allValues.searchInput}`;

      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYW5lZXRoYSIsInJvbGUiOiJQUklNRV9VU0VSIiwiaWF0IjoxNjIzMDY1NTMyfQ.68FuDFraHW7GplQiXVUrnsU1goYgmwd0tXNk6-HxCok",
        },
      };

      const response = await fetch(url, options);
      const fetchData = await response.json();
      // console.log(fetch());
      if (response.ok === true) {
        setValues({
          ...allValues,
          alljobsList: fetchData.jobs,
          showErrormsg: false,
        });
      } else {
        setValues({ ...allValues, showErrormsg: true });
      }
    };
    fetchJobsData();
  }, [allValues.searchInput, allValues.empType]);

  const onChangeSearchInput = (event) => {
    // console.log(event.key);
    if (event.key === "Enter") {
      setValues({ ...allValues, searchInput: event.target.value });
    }
  };

  const onChangeEmpTyp = (value, isChecked) => {
    if (isChecked === true) {
      setValues({ ...allValues, empType: [...allValues.empType, value] });
      
    } else {
      setValues({
        ...allValues,
        empType: allValues.empType.filter((each) => each !== value),
      });
    }
    console.log("working")
  }
    //dasada

    const onChangeSalaryRange = (SalaryRange, isChecked) => {
      if (isChecked) {
        setValues({ ...allValues, minPackage: SalaryRange });
      } 
      // else {
      //   setValues({ ...allValues, minPackage: "" });
      // }
    }
  
    const handleSearch = () => {
      const searchInput = document.querySelector(".input-search").value;
      setValues({ ...allValues, searchInput });
    };
    // adasdad
    return (
      <>
        <Header />

        {allValues.showErrormsg ? (
          <h1>Sorry </h1>
        ) : (
          <div className="jobs-main">
            <div className="filter-jobs">
              <FilterSection onChangeEmpTyp={onChangeEmpTyp} 
              onChangeSalaryRange={onChangeSalaryRange}/>
            </div>
            <div className="jobs-section">
              <input
                onKeyDown={onChangeSearchInput}
                type="search"
                className="form-control w-50 "
              />
              <span className="search-icon">
                <FaSearch onClick={handleSearch} />
              </span>
              <ul className="w-100">
                {allValues.alljobsList.map((each) => (
                  <DisplayJobs jobsItem={each} key={each.id} />
                ))}
              </ul>

              <ul className="w-100"></ul>
            </div>
          </div>
        )}
      </>
    );
 
};
export default Jobs;
