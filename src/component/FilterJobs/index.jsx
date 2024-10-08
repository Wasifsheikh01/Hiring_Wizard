import { useEffect, useState } from 'react'
import './index.css';
import Cookies from "js-cookies";

const FilterSection = (props) => {
  const token = Cookies.getItem("jwt-token");
  const [allValues,setvalue] = useState({
    profileDetails:{},
})
const {onChangeEmpTyp, onChangeSalaryRange} = props;
// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
  

  

  useEffect(()=>{

    const fetchApi = async () => {

      const apiUrl = 'https://apis.ccbp.in/profile';

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYW5lZXRoYSIsInJvbGUiOiJQUklNRV9VU0VSIiwiaWF0IjoxNjIzMDY1NTMyfQ.68FuDFraHW7GplQiXVUrnsU1goYgmwd0tXNk6-HxCok`,
        },
        
      };
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      
      if (response.ok === true) {
        setvalue({...allValues,profileDetails:data.profile_details})
     
      }
      console.log(data);
    }
    fetchApi();

  },[])

 

  const renderEmploymentTypesList = () => {

    const onChangeEmpType = (e)=>{
      // const isChecked = event.target.checked
      onChangeEmpTyp(e.target.value,e.target.checked);
    }
    
    return employmentTypesList.map(eachType => {

      return (
        <li className="fliters-list-item" key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            id={eachType.employmentTypeId}
            className="checkbox-input"
            value={eachType.employmentTypeId}
            onChange={onChangeEmpType}
          />
          <label htmlFor={eachType.employmentTypeId} className="filter-label">
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-list">{renderEmploymentTypesList()}</ul>
    </>
  )

  const renderSalaryRangesList = () => {
    const onChnaegSalary = (event)=>{
      onChangeSalaryRange(event.target.value);
    }

    return salaryRangesList.map((eachRange) => {


      return (
        <li className="fliters-list-item" key={eachRange.salaryRangeId}>
          <input
            type="radio"
            className="checkbox-input"
            value={eachRange.salaryRangeId}
            name="salary ranges"
            onChange={onChnaegSalary}
          />
          <label htmlFor={eachRange.salaryRangeId} className="filter-label">
            {eachRange.label}
          </label>
        </li>
      )
    })
  }
  const renderSalaryRangesTypes = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">{renderSalaryRangesList()}</ul>
    </>
  )

  const renderProfileDetails = ()=>{
    return(
    <div className="profile-details-container">
        <img src={allValues.profileDetails.profile_image_url} alt="profile" className="profile-image" />
        <h1 className="profile-name">{allValues.profileDetails.name}</h1>
        <p className="profile-bio">{allValues.profileDetails.short_bio}</p>
      </div>
  );
}

  return (
    <div className="filters-group-container">
      {renderProfileDetails()}
      {renderEmploymentTypes()}
      <hr className="separator" />
      {renderSalaryRangesTypes()}
    </div>
  )
}

export default FilterSection;
