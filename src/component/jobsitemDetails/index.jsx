import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie"
import "./index.css";

const JobsItemsDetails = ()=>{
  const { id } = useParams();
  const token = Cookies.get("jwt_token");
 

  const [allValues,setValue] = useState({
    viewJobDetails: {},
    viewSkills: {},
    viewSimilarJobs: {},
  });


  useEffect(()=>{

    const fetchJobsItems = async()=>{

      const url = `https://apis.ccbp.in/jobs/${id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };

      const response = await fetch(url,options);
      const data = await response.json();
      console.log(data);

      if (response.ok=== true){
        setValue({
          ...allValues,
          viewJobDetails: data.job_details,
          viewSkills: data.job_details.skills,
          viewLifeAtCompany : fetchData.job_details.life_at_company,
          viewSimilarJobs: fetchData.similar_jobs,
        })
      }
    };
    fetchJobsItems();


  },[]);

  return <h1>hey</h1>
}



export default JobsItemsDetails;