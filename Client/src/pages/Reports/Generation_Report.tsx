import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Pagination } from "@mui/material";
import {
  Select, 
  Option,
} from "@material-tailwind/react";

import jwtDecode from 'jwt-decode';

type BagData = {
  'Bag ID': number;
  'Bags Picked': number;
  'Color ID': number;
  'Driver ID': number;
  'Driver Name': string;
  'Number of Bags': number;
  'Pick up DateTime': string;
  'Plate Number': string;
  'Vehicle ID': number;
  'Weight Picked': number;
  'Weight of Bags': number;
  'bagColor': string;
};

const Generation_Report = () => {

  interface DecodedToken {
    user: string;
    h_id: string;
    hospital: string;
    address: string;
    contact: string;
  }

  const timeperiodHeaderMap: Record<string, string> = {
    all: "Date",
    week: "Week",
    month: "Month",
  };

  const [waste, setWaste] = useState([]);
  const [ hospitalID, setHospitalID] = useState("");

  const [ timeduration, setTimeDuration ] = useState("all");

  const pageSize = 10;
  const [ currPage, setCurrPage ] = useState(1);
  const startIndex = (currPage - 1)*pageSize;
  const endIndex = startIndex + pageSize;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      console.log("Token is empty");
      return;
    } 

    const DecodedToken = jwtDecode(token) as DecodedToken;
    setHospitalID(DecodedToken.h_id)
  })

  useEffect(() => {
    const fetchWaste = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/reports/generation?Hospital_ID=${hospitalID}`, {
          params: {
            timeduration: timeduration,
          }
        });
        //console.log("Data is: ", res);
        setWaste(res.data);
      } catch(error) {
        console.log("Error in Generation Report: ", error)
      }
    }
    if (hospitalID !== "") {
      fetchWaste();
    }
  }, [hospitalID, currPage, timeduration])

  //console.log("Hospital ID ", hospitalID)
  //console.log("Waste itme: ", waste)
  //console.log("Time Duration: ", timeduration);
  // Group the processed data by bag color

  const currentBags = waste.slice(startIndex, endIndex);
  //console.log("Grouped Data is:", groupedData)

    return (
      <>
      <Breadcrumb pageName="Generation Report of Bags" />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className='w-1/3'>
            <Select label="Time Duration" value={timeduration} onChange={(e) => setTimeDuration(e)}>
              <Option value="all">All</Option>
              <Option value="week">Last Week</Option>
              <Option value="month">Last Month</Option>
            </Select>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                {/*<tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Package
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Invoice date
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
      </tr>*/}
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    {["Sl. No.", timeperiodHeaderMap[timeduration], "Red Bags", "Yellow Bags", "Blue Bags", "Sharps"].map((el) => (
                      <th
                      key={el} 
                      className="py-5 px-1 font-medium text-black dark:text-white xl:pl-11">
                          {el}
                      </th>
                    ))}
                  </tr>
              </thead>
              <tbody>
                {currentBags.map((item, index) => (
                  <tr key={index}>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>{index + 1}</td>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                        
                        {
                            timeduration === "all" ? <Link to={`/Generation_Report/${item['Date']}`}>{item['Date']}</Link> :
                            timeduration === "week" ? item['Week']:
                            timeduration === "month" ? item['Month']:
                            timeduration === "quaterly" ? item['Quarter']:
                            timeduration === "half yearly" ? item['Half']:
                            timeduration === "yearly" ? item['Year']:
                            "NaN"
                          }
                      </td>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                        {item['Red_bags']}/{item['Red_weight']}
                      </td>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                        {item['Yellow_bags']}/{item['Yellow_weight']}
                      </td>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                        {item['Blue_bags']}/{item['Blue_weight']}
                      </td>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                        {item['White_bags']}/{item['White_weight']}
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-center items-center relative'>
              <Pagination
                color={'primary'}
                count={waste.length / pageSize}
                page={currPage}
                onChange={(event: any, page: any) => setCurrPage(page)}
              />
              {/*<div className='absolute left-0'>
                Showing {currentBags.length} of {Object.entries(groupedData).reduce((total, arr) => total + arr.length, 0)} Entries
                </div>*/}
            </div>
          </div>
            
        </div>
      </>
    );
  };
  
  export default Generation_Report;
  