import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


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

const TableOne = () => {

  interface DecodedToken {
    user: string;
    h_id: string;
    hospital: string;
    address: string;
    contact: string;
  }

  const [ bags, setBags ] = useState([]);
  const [ hospitalID, setHospitalID] = useState("");

  const [ timeduration, setTimeDuration ] = useState("Weekly");

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
        const res = await axios.get(`http://localhost:8080/reports/tabledata?Hospital_ID=${hospitalID}`, {
          params: {
            timeduration: timeduration,
          }
        });
        console.log("Data is: ", res);
        setBags(res.data);
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
  const currentBags = bags.slice(startIndex, endIndex);
  //console.log("Grouped Data is:", groupedData)

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Yesterday Disposal Report
      </h4>
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
              {["Sl. No.", "Color", "Bags Packed", "Weight Packed", "Quantity Picked", "Weight Picked", "Driver Name"].map((el) => (
                <th
                key={el} 
                className="py-5 px-1 font-medium text-black dark:text-white xl:pl-11">
                    {el}
                </th>
              ))}
            </tr>
        </thead>
        <tbody>
          {currentBags.map((bags, index) => (
            <tr key={index}>
                <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>{index + 1}</td>
                <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                  {bags['ColorName']}
                </td>
                <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                  {bags['QuantityPacked']}
                </td>
                <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                  {bags['WeightPacked']}
                </td>
                <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                  {bags['QuantityPicked'] ? bags['QuantityPicked'] : "No Data"}
                </td>
                <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                  {bags['WeightPicked'] ? bags['WeightPicked'] : "No Data"}
                </td>
                <td className='py-5 px-1 xl:pl-10 text-black dark:text-white text-left'>
                  {bags['DriverName']}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TableOne;
