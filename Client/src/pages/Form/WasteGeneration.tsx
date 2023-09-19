import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import jwtDecode from 'jwt-decode';

const WasteGeneration = () => {

  interface DecodedToken {
    user: string;
    h_id: string;
    hospital: string;
    address: string;
    contact: string;
  }

  const [yellowBags, setYellowBags] = useState("");
  const [yellowWeight, setYellowWeight] = useState("");

  const [redBags, setRedBags] = useState("");
  const [redWeight, setRedWeight] = useState("");

  const [blueBags, setBlueBags] = useState("");
  const [blueWeight, setBlueWeight] = useState("");
  
  const [sharpsBags, setSharpsBags] = useState("");
  const [sharpsWeight, setSharpsWeight] = useState("");

  const [hospital_ID, setHospitalID] = useState("");

  const [ vehicles, setVehicles ] = useState([]);
  const [ selectedVehicle, setSelectedVehicle ] = useState('Select Vehicle');

  const [ driver, setDriver ] = useState([]);
  const [ selectedDriver, setSelectedDriver ] = useState('Select Driver');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      console.log("Token is empty");
      return;
    } 

    const DecodedToken = jwtDecode(token) as DecodedToken;
    setHospitalID(DecodedToken.h_id)
    //console.log("Decoded Token: ", DecodedToken)
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = [
      {
        "Color ID": 1,    //Yellow Bags
        "Hospital_ID": hospital_ID,
        "Number of Bags": yellowBags,
        "Weight of Bags": yellowWeight,
        "Driver ID": selectedDriver,
        "Vehicle ID": selectedVehicle
      },
      {
        "Color ID": 2,    //Blue Bags
        "Hospital_ID": hospital_ID,
        "Number of Bags": blueBags,
        "Weight of Bags": blueWeight,
        "Driver ID": selectedDriver,
        "Vehicle ID": selectedVehicle
      },
      {
        "Color ID": 3,    //Red Bags
        "Hospital_ID": hospital_ID,
        "Number of Bags": redBags,
        "Weight of Bags": redWeight,
        "Driver ID": selectedDriver,
        "Vehicle ID": selectedVehicle
      },
      {
        "Color ID": 4,    //Red Bags
        "Hospital_ID": hospital_ID,
        "Number of Bags": sharpsBags,
        "Weight of Bags": sharpsWeight,
        "Driver ID": selectedDriver,
        "Vehicle ID": selectedVehicle
      },
    ]

    try {
      const res = await axios.post(`http://localhost:8080/form/generate`, data);
      //console.log(res.data);
      if(res){
        toast.success("Data sent successfully!", {
          position: "top-right",
          autoClose: 2000,
        })
        setYellowBags('');
        setYellowWeight('');
        setRedBags('');
        setRedWeight('');
        setBlueBags('');
        setBlueWeight('');
        setSharpsBags('');
        setSharpsWeight('');
        setSelectedVehicle('');
        setSelectedDriver('');
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

  useEffect(() => {
    const fetchData = async () => {
      const vehicleresponse = await axios.get(`http://localhost:8080/reports/vehicledetails`);
      const driverresponse = await axios.get(`http://localhost:8080/reports/driverdetails`)
      setVehicles(vehicleresponse.data)
      setDriver(driverresponse.data)
    }

    fetchData();
  }, [])

  //console.log("Vehicle Data: ", vehicles);
  //console.log("Driver Data: ", driver);


  return (
    <>
      <Breadcrumb pageName="Add Bags Data" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-center">
                  <h3 className="font-bold text-2xl text-meta-6 dark:text-white">
                    Yellow Bags
                  </h3>
                </div>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Number of Bags
                      </label>
                      <input
                        type="Number"
                        value={yellowBags}
                        onChange={(e) => setYellowBags(e.target.value)}
                        min={0}
                        placeholder="Enter Number of Yellow Bags"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Weight of Yellow Bags in Total (in Kgs)
                      </label>
                      <input
                        type="Number"
                        value={yellowWeight}
                        onChange={(e) => setYellowWeight(e.target.value)}
                        placeholder="Enter Weight of All the Yellow Bags (kgs)"
                        min={0}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  {/*<div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Building Name/No. (if any)
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Type your subject</option>
                        <option value="">USA</option>
                        <option value="">UK</option>
                        <option value="">Canada</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>*/}

                  {/*<div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>*/}
                </div>
              </div>

              <div>
                <div className="border-y border-stroke py-4 px-6.5 dark:border-strokedark flex justify-center">
                  <h3 className="font-bold text-2xl text-meta-5 dark:text-white">
                    Blue Bags
                  </h3>
                </div>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Number of Bags
                      </label>
                      <input
                        type="Number"
                        value={blueBags}
                        onChange={(e) => setBlueBags(e.target.value)}
                        min={0}
                        placeholder="Enter Number of Yellow Bags"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Weight of Blue Bags in Total
                      </label>
                      <input
                        type="Number"
                        value={blueWeight}
                        onChange={(e) => setBlueWeight(e.target.value)}
                        placeholder="Enter Weight of All the Blue Bags (kgs)"
                        min={0}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  {/*<div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Building Name/No. (if any)
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Type your subject</option>
                        <option value="">USA</option>
                        <option value="">UK</option>
                        <option value="">Canada</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>*/}

                  {/*<div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>*/}

                  
                </div>
              </div>

              <div>
                <div className="border-y border-stroke py-4 px-6.5 dark:border-strokedark flex justify-center">
                  <h3 className="font-bold text-2xl text-meta-1 dark:text-white">
                    Red Bags
                  </h3>
                </div>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Number of Bags
                      </label>
                      <input
                        type="Number"
                        value={redBags}
                        onChange={(e) => setRedBags(e.target.value)}
                        min={0}
                        placeholder="Enter Number of Yellow Bags"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Weight of Yellow Bags in Total
                      </label>
                      <input
                        type="Number"
                        value={redWeight}
                        onChange={(e) => setRedWeight(e.target.value)}
                        placeholder="Enter Weight of All the Yellow Bags (kgs)"
                        min={0}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  {/*<div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Building Name/No. (if any)
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Type your subject</option>
                        <option value="">USA</option>
                        <option value="">UK</option>
                        <option value="">Canada</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>*/}

                  {/*<div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>*/}

                  
                </div>
              </div>

              <div className='pb-12'>
                <div className="border-y border-stroke py-4 px-6.5 dark:border-strokedark flex justify-center">
                  <h3 className="font-bold text-2xl text-black dark:text-white">
                    White Containers
                  </h3>
                </div>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Number of Bags
                      </label>
                      <input
                        type="Number"
                        value={sharpsBags}
                        onChange={(e) => setSharpsBags(e.target.value)}
                        min={0}
                        placeholder="Enter Number of White Containers"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Weight of Sharps in Total (in Kgs)
                      </label>
                      <input
                        type="Number"
                        value={sharpsWeight}
                        onChange={(e) => setSharpsWeight(e.target.value)}
                        placeholder="Enter Weight of All the White Containers (kgs)"
                        min={0}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  {/*<div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Building Name/No. (if any)
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Type your subject</option>
                        <option value="">USA</option>
                        <option value="">UK</option>
                        <option value="">Canada</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>*/}

                  {/*<div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>*/}

                  
                </div>
              </div>

              <div>
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-center">
                  <h3 className="font-bold underline italic text-4xl text-black dark:text-white">
                    Vehicle Information
                  </h3>
                </div>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Vehicle Number
                      </label>
                      {/*<input
                        type="Text"
                        placeholder="Enter Vehicle Number"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />*/}
                    <select
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Select Vehicle</option>
                      {vehicles.map((vehicle) => (
                        <option
                          key={vehicle[`Vehicle ID`]}
                          value={vehicle[`Vehicle ID`]}
                        > 
                          {vehicle[`Plate Number`]}
                        </option>
                      ))}
                    </select>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Driver Name
                      </label>
                      {/*<input
                        type="Text"
                        placeholder="Enter the name of the Driver"
                        min={0}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />*/}
                      <select
                        onChange={(e) => setSelectedDriver(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                      <option value="">Select Driver</option>
                      {driver.map((driver) => (
                        <option
                          key={driver[`Driver ID`]}
                          value={driver[`Driver ID`]}
                        > 
                          {driver[`Driver Name`]}
                        </option>
                      ))}
                    </select>
                    </div>
                  </div>

                  {/*<div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Building Name/No. (if any)
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Type your subject</option>
                        <option value="">USA</option>
                        <option value="">UK</option>
                        <option value="">Canada</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>*/}

                  {/*<div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>*/}

                  
                </div>
              </div>

              <div className='p-6.5'>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                    Add Data
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

export default WasteGeneration;
