import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import {
  Select, 
  Option,
  Input,
} from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import jwtDecode from 'jwt-decode';

import axios from 'axios';


const Device = () => {
  interface DecodedToken {
    user: string;
    h_id: string;
    hospital: string;
    address: string;
    contact: string;
  }

  const [ colorA, setColorA ] = useState([]);
  const [ color, setColor ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const [ hospitalID, setHospitalID ] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      console.log("Token is empty");
      return;
    } 

    const DecodedToken = jwtDecode(token) as DecodedToken;
    setHospitalID(DecodedToken.h_id)
    
    const fetchColors = async () => {
      try {
       const res = await axios.get(`http://localhost:8080/reports/color?hospitalID=${hospitalID}`);
       setColorA(res.data);
       setLoading(false)
      } catch(error) {
       console.log("Error in Color Dropdown: ", error)
      }
     }
     fetchColors();
  }, [hospitalID])

  //console.log("Color Data: ", colorA);

  const handleSubmit = async () => {
    if(!color) {
      console.log("Color is undefined or empty");
      return;
    }

    const data = {
      color,
      location
    }
    try {
      const res = await axios.post(`http://localhost:8080/form/AddDevice?hospitalID=${hospitalID}`, data);
      //console.log(res.data);
      if(res){
        toast.success("Data sent successfully!", {
          position: "top-right",
          autoClose: 2000,
        })
      } else {
        toast.error("Error sending the data!", {
          position: "top-right",
          autoClose: 2000
        })
      }
    } catch(error) {
      console.log("Error:", error);
    }
  }


  return (
    <>
      <Breadcrumb pageName="Add a Device" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row py-5">
                  <div className="w-full xl:w-1/2">
                    <Select 
                      label='Color'
                      color='indigo'
                      selected={color}
                      onChange={(e)=> setColor(e)}
                    >
                      {colorA.length > 0 ? (
                        colorA.map((item, key) => (
                          <Option key={key} value={item['Color Name']}>
                            {item['Color Name']}
                          </Option>
                        ))
                      ) : (
                        <div>
                          LOADING...
                        </div>
                      )}
                      
                    </Select>
                  </div>
                    <Input 
                      label='Location'
                      variant="outlined"
                      color='indigo'
                      value={location}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                    />
                </div>
                <button 
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                    onClick={handleSubmit}
                >
                  Add Device
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer 
         position="top-right"
         autoClose={2000}
         className="custom-toast-container" // Apply custom class
         toastClassName="custom-toast" // Apply custom class to individual toasts
        />
      </div>
    </>
  );
};

export default Device;
