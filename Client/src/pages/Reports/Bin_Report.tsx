import Breadcrumb from '../../components/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from 'axios';

import jwtDecode from 'jwt-decode';
import Pagination from '@mui/material/Pagination';

import {
  Select, 
  Option,
} from "@material-tailwind/react";

const Bin_Report = () => {

  interface DecodedToken {
    user: string;
    h_id: string;
    hospital: string;
    address: string;
    contact: string;
  }

  const [bin, setBin] = useState([]);

  const [ hospitalID, setHospitalID] = useState("");
  const [ pageSize, setPageSize ] = useState(10);

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
    // Establish a WebSocket connection
    {/*const socket = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL

    // Listen for WebSocket messages
    socket.addEventListener('message', (event) => {
      // Handle WebSocket updates here
      const updatedData = JSON.parse(event.data);
      setBin(updatedData);
    });
  */}
    
    const fetchWaste = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/reports/bindetails?Hospital_ID=${hospitalID}`);
        //console.log("Data is: ", res.data);
        setBin(res.data);
      } catch(error) {
        console.log("Error in Generation Report: ", error)
      }
    }
    fetchWaste();
  })  
  const currentBin = bin.slice(startIndex, endIndex);
  
  console.log("Waste item: ", bin)

    return (
      <>
      <Breadcrumb pageName="Bin Report" />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className='py-5 w-1/3'>
            <Select 
              variant="standard" 
              label="Time Duration"
              value={pageSize.toString()}
              onChange={(newvalue) => {
                if (newvalue !== undefined) {
                  setPageSize(parseInt(newvalue, 10));
                }
              }}
            >
                <Option value='10'>10</Option>
                <Option value='25'>25</Option>
                <Option value='50'>50</Option>
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
                      {["Sl. No.", "Color", "Location", "Status", "Updated At"].map((el) => (
                        <th
                        key={el} 
                        className="py-5 px-1 font-medium text-black dark:text-white xl:pl-11">
                            {el}
                        </th>
                      ))}
                  </tr>
              </thead>
              <tbody>
                {currentBin.map((item, key) => {

                  const className = "py-5 px-1 xl:pl-10 text-black dark:text-white text-left";

                  return(
                    <tr key={key}>
                      <td className={className}>
                        {key+1}
                      </td>
                      <td className={className}>
                        {item[`Color Name`]}
                      </td>
                      <td className={className}>
                        <div>
                          {item[`Location`]}
                        </div>
                        <span className='text-xs flex justify-center mt-2'>{item[`Device ID`]?item[`Device ID`] : "Not Found"}</span>
                      </td>
                      <td className={className}>
                        {item[`Status`] ? "Full":"Empty"}
                      </td>
                      <td className={className}>
                        {item['Updated']}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className='flex justify-start items-center translate-y-6'>
            <span>Showing {pageSize} of {bin.length} entries</span>
          </div>
          <div className='flex justify-center items-center'>
            <Pagination
              color={'primary'}
              count={Math.ceil(bin.length / pageSize)}
              page={currPage}
              onChange={(event, page) => setCurrPage(page)}
            />
          </div>
      </div>
      </>
    );
  };
  
  export default Bin_Report;
  