import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { getNonRegisteredInst, approveInst } from "../../services/operations/GovermentOperations";
import Slidebar from './Slidebar';

function InsttituteApplications() {
  const { result,dashboardLoading, setDashboardLoading, approveInstitute } = useContext(AppContext);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      console.log(result.id);
      const response = await getNonRegisteredInst(result.id);
      console.log(response);
      setData(response.data);
      setDashboardLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [result.id]);

  const handleApprove = async (id,AccountNumber) => {
    try {
      console.log(id,AccountNumber);
      setDashboardLoading(true);
      await approveInst(result.id, id);
      // await approveInstitute(AccountNumber);
      fetchData(); // Fetch data again after approval
    } catch (error) {
      console.error('Error approving institute:', error);
      setDashboardLoading(false);
    }
  };

  return (

    <div  className='    pt-16   flex flex-col'>
  <Slidebar /> 
    <div className='     pl-80 pt-7'>
    <div>
      <h2>Institute Applications for approval</h2>
      
      <div>
        {dashboardLoading ? (
          <div>loading..</div>
        ) : (
          <div>
            {data.map((item) => (
              <div key={item._id}>
                <p>Email: {item.email}</p>
                <p>Account Number: {item.AccountNumber}</p>
                <p>Approved: {item.Approved}</p>
                <img src={item.image} alt={item.email} />

                {item.Approved === 'NotApproved' && (
                  <button onClick={() => handleApprove(item._id,item.AccountNumber)}>Approve</button>
                )}
              </div>
            ))
          }
        </div>)
        }
      </div>
    </div>
    </div>
  </div>
    
  );
}

export default InsttituteApplications;
