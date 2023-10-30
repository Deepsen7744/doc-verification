import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { getRegisteredInst } from "../../services/operations/GovermentOperations";

function RegisteredInstitute() {
  const { result,dashboardLoading, setDashboardLoading } = useContext(AppContext);
  const [data, setData] = useState([]);

  // bc se nikal ke dhikhao
  
  const fetchData = async () => {
    try {
      console.log(result.id);
      const response = await getRegisteredInst(result.id);
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

  return (
    <div>
      <h2>Registered Institute</h2>
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
              </div>
            ))
          }
        </div>)
        }
      </div>
    </div>
  );
}

export default RegisteredInstitute;
