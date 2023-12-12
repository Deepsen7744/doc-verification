import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { getCerificates } from '../../services/operations/StudentOperations'
import SidebarStudent from './SidebarStudent'

// bc se nikal ke approved certificate dikhao dhikha

function MyCertificates() {
  const { result, dashboardLoading, setDashboardLoading } =
    useContext(AppContext)
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      console.log(result.id)
      const response = await getCerificates(result.id)
      setData(response.data.Applications)
      console.log(data)
      setDashboardLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setDashboardLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [result.id])

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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCertificates
