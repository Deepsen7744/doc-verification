import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { getCerificates } from '../../services/operations/StudentOperations'
import SidebarStudent from './SidebarStudent'
import CryptoJS from 'crypto-js'


function MyCertificates() {

  const { result, 
    account,
    getStudentInfo,
    dashboardLoading, 
    setDashboardLoading,
    getIpfsHash } =useContext(AppContext);

  const [data, setData] = useState([])
  const [approvedCertificates, setApprovedCertificates] = useState([]);
  const [links, setLinks] = useState([]);

  const fetchData = async () => {
    try {
      // not approved certificates
      console.log(result.id)
      const response1 = await getCerificates(result.id)
      setData(response1.data.Applications)
      console.log(data)

      // approved certificates
      console.log(account);
      const response2 = await getStudentInfo(account);
      setApprovedCertificates(response2[2]);
      setDashboardLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setDashboardLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [result.id])


  useEffect(() => {

    const fetchData2 = async () => {

      const a = await getIpfsHash(account, approvedCertificates[0])
      console.log(a)

      setLinks([]);
      const fetchDataForId = async (link) => {
        try {
          const response = await getIpfsHash(account, link);
          setLinks((prevData) => [...prevData, response]);
        } catch (error) {
          console.error(`Error fetching data for ID ${link}:`, error);
        }
      };

      approvedCertificates.forEach((link) => fetchDataForId(link));
    };
    console.log(links);
    fetchData2();
  }, [approvedCertificates]);


  return (
    <div className="    pt-16   flex flex-col">
      <SidebarStudent />
      <div className="      pl-80 pt-7">
        <div>
          <h2>My Certificates</h2>
          <div>
            {dashboardLoading ? (
              <div>loading..</div>
            ) : (
              <div>
                <h3>Certificates for approval</h3>
                {data.map((item) => (
                  <div key={item._id}>
                   { item.status == "NotApproved" ? (<div>
                    <p>AppliedAt: {item.AppliedAt}</p>
                    <p>StartDate: {item.StartDate}</p>
                    <p>EndDate: {item.EndDate}</p>
                    <p>Institute Id: {item.InstituteId}</p>
                    <p>Name on certificate: {item.StudentName}</p>
                    <p>Course: {item.courseName}</p>
                    <p>Status: {item.status}</p>
                   </div>) : (null)
                    }
                  </div>
                ))}

                <h3>Approved certificates</h3>
                {

                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCertificates
