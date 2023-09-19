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

  const [waste, setWaste] = useState([]);
  const [ hospitalID, setHospitalID] = useState("");

  const [ timeduration, setTimeDuration ] = useState("All");

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
        console.log("Data is: ", res);
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
  console.log("Time Duration: ", timeduration);
  // Group the processed data by bag color
  const processAndGroupData = (data: BagData[]) => {
    const groupedData: { [key: string]: BagData[] } = {};
    data.forEach((bag: BagData) => {
        const pickupDateTime = bag['Pick up DateTime'];
        const pickupDate = pickupDateTime.split(' ')[0]; // Extract the date part
        const [year, month, day] = pickupDate.split('-'); // Split the date into parts
        const formattedDate = `${day}-${month}-${year}`; // Format it as DD-MM-YYYY

        if (!groupedData[formattedDate]) {
            groupedData[formattedDate] = [];
        }
        groupedData[formattedDate].push(bag);
    });

    const todayDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const sortedKeys = Object.keys(groupedData).sort((a, b) => {
      if (a === todayDate) {
        return -1; // Today's date should come first
      }
      if (b === todayDate) {
        return 1; // Today's date should come first
      }
      const dateA = new Date(a.split('-').reverse().join('-')).getTime();
      const dateB = new Date(b.split('-').reverse().join('-')).getTime();
      return dateB - dateA;
    });

    // Create a new object with sorted keys
    const sortedGroupedData: { [key: string]: BagData[] } = {};
    sortedKeys.forEach(key => {
        sortedGroupedData[key] = groupedData[key];
    });
    return sortedGroupedData;
  };

  const groupedData = processAndGroupData(waste);

  const currentBags = Object.entries(groupedData).slice(startIndex, endIndex);
  //console.log("Grouped Data is:", groupedData)

    return (
      <>
      <Breadcrumb pageName="Generation Report of Bags" />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className='w-1/3'>
            <Select label="Time Duration" value={timeduration} onChange={(e) => setTimeDuration(e)}>
              <Option value='All'>All</Option>
              <Option value='Yesterday'>Yesterday</Option>
              <Option value='Weekly'>Weekly</Option>
              <Option value='Monthly'>Monthly</Option>
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
                    {["Sl. No.", "Date", "Red Bags", "Yellow Bags", "Blue Bags", "Sharps"].map((el) => (
                      <th
                      key={el} 
                      className="py-5 px-1 font-medium text-black dark:text-white xl:pl-11">
                          {el}
                      </th>
                    ))}
                  </tr>
              </thead>
              <tbody>
                {currentBags.map(([pickupDate, bags], index) => (
                  <tr key={index}>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>{index + 1}</td>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                        <Link to={`/Generation_Report/${pickupDate}`}>{pickupDate}</Link>
                      </td>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                        {`${bags.find(bag => bag.bagColor === 'Red')?.['Number of Bags'] || '0'}/${bags.find(bag => bag.bagColor === 'Red')?.['Weight of Bags'] || '0'} kgs`}
                      </td>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                        {`${bags.find(bag => bag.bagColor === 'Yellow')?.['Number of Bags'] || '0'}/${bags.find(bag => bag.bagColor === 'Yellow')?.['Weight of Bags'] || '0'} kgs`}
                      </td>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                        {`${bags.find(bag => bag.bagColor === 'Blue')?.['Number of Bags'] || '0'}/${bags.find(bag => bag.bagColor === 'Blue')?.['Weight of Bags'] || '0'} kgs`}
                      </td>
                      <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                        {`${bags.find(bag => bag.bagColor === 'White')?.['Number of Bags'] || '0'}/${bags.find(bag => bag.bagColor === 'White')?.['Weight of Bags'] || '0'} kgs`}
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-center items-center relative'>
              <Pagination
                color={'primary'}
                count={Math.ceil(Object.entries(groupedData).length / pageSize)}
                page={currPage}
                onChange={(event, page) => setCurrPage(page)}
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
  