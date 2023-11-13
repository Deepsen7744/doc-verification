import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { getNonApprovedApplications } from '../../services/operations/InstituteOperations'
import { getStudentData } from '../../services/operations/StudentOperations'
import { approveCertificate } from '../../services/operations/InstituteOperations'
import CryptoJS from 'crypto-js'
import SidebarInstitute from './SidebarInstitude'

function CertificateApplication() {
  const {
    account,
    result,
    dashboardLoading,
    setDashboardLoading,
    createCertificate,
  } = useContext(AppContext)
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      console.log(result.id)
      const response = await getNonApprovedApplications(result.id)
      const sample = response.data.CertificateRequest
      console.log(sample)
      setData(sample)
      setDashboardLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setDashboardLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [result.id])

  const handleApprove = async (data) => {
    try {
      const result = await getStudentData(data.StudentId)

      const certificateData = {
        instituteName: data.instituteName,
        StartDate: data.StartDate,
        EndDate: data.EndDate,
        AppliedAt: data.AppliedAt,
        StudentName: data.StudentName,
        courseName: data.courseName,
        studentAccount: result.data.AccountNumber,
        instituteAccount: account,
      }

      console.log(certificateData)
      const secretKey = 'secret'
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(certificateData),
        secretKey
      ).toString()
      await createCertificate(
        result.data.AccountNumber,
        account,
        data.courseName,
        encryptedData
      )
      await approveCertificate(data.InstituteId, data._id)
      fetchData()
    } catch (error) {
      console.error('Error approving institute:', error)
      setDashboardLoading(false)
    }
  }

  return (
    <div className="    pt-16   flex flex-col">
      <SidebarInstitute />
      <div className="      pl-80 pt-7">
        <div>
          <h2>Applications for certificates</h2>
          <div>
            {dashboardLoading ? (
              <div>loading..</div>
            ) : (
              <div>
                {data.map((item) => (
                  <div key={item._id}>
                    <p>Application id: {item._id}</p>
                    <p>AppliedAt: {item.AppliedAt}</p>
                    <p>EndDate: {item.EndDate}</p>
                    <p>InstituteId: {item.InstituteId}</p>
                    <p>Institute Name: {item.instituteName}</p>
                    <p>StartDate: {item.StartDate}</p>
                    <p>StudentId: {item.StudentId}</p>
                    <p>StudentName: {item.StudentName}</p>
                    <p>courseName: {item.courseName}</p>
                    <p>status: {item.status}</p>
                    {item.status === 'NotApproved' && (
                      <button onClick={() => handleApprove(item)}>
                        Approve
                      </button>
                    )}
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

export default CertificateApplication
