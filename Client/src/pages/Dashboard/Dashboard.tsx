import { useEffect } from 'react';
import Cards from '../../components/Cards.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import TableOne from '../../components/TableOne.tsx';

const Dashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      console.log("Token is empty");
      return;
    }
    if(token === "undefined") {
      console.log("Token is undefined")
    }
  })
  return (
    <>
      <div className="flex md:flex-row flex-col">
        <Cards />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        
      </div>
      <TableOne />
    </>
  );
};

export default Dashboard;
