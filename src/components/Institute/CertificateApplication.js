import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { getNonApprovedApplications } from '../../services/operations/InstituteOperations';

function CertificateApplication() {
  const { result,dashboardLoading, setDashboardLoading } = useContext(AppContext);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      console.log(result.id);
      const response = await getNonApprovedApplications(result.id);
      const sample = response.data.CertificateRequest;
      console.log(sample);
      setData(sample);
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
      <h2>Applications for certificates</h2>
      <div>
        {dashboardLoading ? (
          <div>loading..</div>
        ) : (
          <div>
            {data.map((item) => (
              <div key={item._id}>
                <p>AppliedAt: {item.AppliedAt}</p>
                <p>EndDate: {item.EndDate}</p>
                <p>InstituteId: {item.InstituteId}</p>
                <p>StartDate: {item.StartDate}</p>
                <p>StudentId: {item.StudentId}</p>
                <p>StudentName: {item.StudentName}</p>
                <p>courseName: {item.courseName}</p>
                <p>status: {item.status}</p>
              </div>
            ))
          }
        </div>)
        }
      </div>
    </div>
  );
}

export default CertificateApplication;