import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import { FiEye, FiShoppingCart } from 'react-icons/fi';
import { FaRegBellSlash, FaRegBell } from 'react-icons/fa';
import axios from 'axios';
import { BsHospital } from 'react-icons/bs';

const Cards = () => {
    

    interface DecodedToken {
        user: string;
        h_id: string;
        hospital: string;
        address: string;
        contact: string;
    }

    const [ hospitalID, setHospitalID ] = useState("");
    const [ data, setData ] = useState([]);


    useEffect(() => {
    
    const token = localStorage.getItem('token');
     if(!token) {
      console.log("Token is empty");
      return;
    } 
    const DecodedToken = jwtDecode(token) as DecodedToken;
    setHospitalID(DecodedToken.h_id)

    const fetchdata = async () => {
        const res = await axios.get(`http://localhost:8080/reports/cardsdata?HospitalID=${hospitalID}`)
        //console.log("Data is: ", res.data);
        setData(res.data);
    }

    fetchdata();
})

const values = [
    {
        id: 1,
        icon: <FiEye />,
        IntValue: {},
        title: "Yellow Bags"
    },
    {
        id: 2,
        icon: <FiShoppingCart />,
        IntValue: 12,
        title: "Blue Bags"
    },
    {
        id: 3,
        icon: <FaRegBellSlash />,
        IntValue: 6,
        title: "Sharps"
    },
    {
        id: 4,
        icon: <FaRegBell />,
        IntValue: 3,
        title: "Red Bags"
    }
]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 w-full">
        {data.map((item, index) => (
            <div className="rounded-sm border border-stroke bg-white py-6 px-4 shadow-default dark:border-strokedark dark:bg-boxdark " key={index}>
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <span className='text-primary dark:text-white text-xl'>{item.icon}</span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                    <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {item['TotalBags']}/{item['TotalWeight']}
                    </h4>
                    <span className="text-sm font-medium">{item['Color Name']}</span>
                    </div>
        
                    <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
                    0.43%
                    </span>
                </div>
            </div>
        ))}        
    </div>
  )
}

export default Cards