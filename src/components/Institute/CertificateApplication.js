import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { getNonApprovedApplications } from '../../services/operations/InstituteOperations';
import { getStudentData } from '../../services/operations/StudentOperations';
import { approveCertificate } from '../../services/operations/InstituteOperations';
import CryptoJS from 'crypto-js';
import CertificateSlider from './CertificateSlider';
import SidebarInstitute from './SidebarInstitude';
import QRCode from 'qrcode';


function CertificateApplication() {
  const { 
    account, 
    result, 
    dashboardLoading, 
    setDashboardLoading,
    certificateData, 
    SetCertificateData,
    showSlider, 
    SetShowSlider,
    encryptedData, 
    SetEncryptedData,
    SetQr} = useContext(AppContext);

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

  const handleApprove = async (data) => {
    try {
      SetShowSlider(true);

      const result = await getStudentData(data.StudentId);
      console.log(result);

      SetCertificateData({
        instituteName: data.instituteName,
        StartDate: new Date(data.StartDate).toISOString().slice(2, 10),
        EndDate: new Date(data.EndDate).toISOString().slice(2, 10),
        AppliedAt: new Date(data.AppliedAt).toISOString().slice(2, 10),
        StudentName: data.StudentName,
        courseName: data.courseName,
        studentAccount: result.data.AccountNumber,
        instituteAccount: account
      });

        console.log(certificateData);
        const secretKey = 'secret'; 
        SetEncryptedData(CryptoJS.AES.encrypt(JSON.stringify(certificateData), secretKey).toString());

        const response = await QRCode.toDataURL(encryptedData);
        SetQr(response);

        await approveCertificate(data.InstituteId, data._id);
        fetchData();
    } catch (error) {
      console.error(error);
      setDashboardLoading(false);
    }
  };


  return (
    <div className="    pt-16   flex flex-col">
      <SidebarInstitute />
      {
      showSlider ? (<CertificateSlider/>) : 
      (<div className=" pl-80 pt-7">
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
                  <button onClick={() => handleApprove(item)}>Approve</button>
                )}
              </div>
            ))
          }
        </div>)
        }
        </div>
      </div>)
    } 
    </div>
  );
}

export default CertificateApplication;
