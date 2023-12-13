import { createContext, useState } from "react";
import { abi } from "../Abi";
const {ethers} = require("ethers");

export const AppContext = createContext();

export default function AppContextProvider ({children}) {

    const [dashboardLoading, setDashboardLoading] = useState(false);
    const [result, setResult] = useState({
      isLoading: true,
      isAuthorized: false,
      username: "",
      email: "",
      id: ""
    });

    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contractAddress, setContractAddress] = useState("0xd3Ed5387FCB9EE99adC0b9E6F87FB9b0e793d647");
    const [certificateData, SetCertificateData] = useState({});
    const [showSlider, SetShowSlider] = useState(false);
    const [index,setIndex] = useState(-1);
    const [qr, SetQr] = useState();
    // const [ipfsHash, SetIpfsHash] = useState("");
    const [encryptedData, SetEncryptedData] = useState("");

    const handleIndex = (data) => {
      setIndex(data);
      console.log(data);
    };

    async function getCertificateOwners(_transactionHash){
      try{
        const data = await contract.getCertificateOwners(_transactionHash);
        console.log(data);
        return data;
      } catch(error)
      {
          if (error.data) {
              const abiCoder = new ethers.utils.AbiCoder();
              const data = abiCoder.decode(["string"], error.data);
              const reason = data[0];
              console.error("Revert reason:", reason);
          } else {
              console.error("Error data not available.");
          }
        const data = false;
        return data;
      }
    }

    async function getCourses(_instituteAddress){
      try{
        const data = await contract.getCourses(_instituteAddress);
        console.log(data);
        return data;
      } catch(error)
      {
        if (error.data) {
            const abiCoder = new ethers.utils.AbiCoder();
            const data = abiCoder.decode(["string"], error.data);
            const reason = data[0];
            console.error("Revert reason:", reason);
        } else {
            console.error("Error data not available.");
        }
        const data = false;
        return data;
      }
    }

    async function getEnrolledStudentsInCourse(_instituteAddress,_courseName){
      try{
        const data = await contract.getEnrolledStudentsInCourse(_instituteAddress,_courseName);
        console.log(data);
        return data;
      } catch(error)
      {
        if (error.data) {
            const abiCoder = new ethers.utils.AbiCoder();
            const data = abiCoder.decode(["string"], error.data);
            const reason = data[0];
            console.error("Revert reason:", reason);
        } else {
            console.error("Error data not available.");
        }
        const data = false;
        return data;
      }
    }

    async function getInstituteInfo(_instituteAddress){
      try{
        const data = await contract.getInstituteInfo(_instituteAddress);
        console.log(data);
        return data;
      } catch(error)
      {
        if (error.data) {
            const abiCoder = new ethers.utils.AbiCoder();
            const data = abiCoder.decode(["string"], error.data);
            const reason = data[0];
            console.error("Revert reason:", reason);
        } else {
            console.error("Error data not available.");
        }
        const data = false;
        return data;
      }
    }

    async function getIpfsHash(_studentAddress,_transactionHash){
      try{
        const data = await contract.getIpfsHash(_studentAddress,_transactionHash);
        console.log(data);
        return data;
      } catch(error)
      {
        if (error.data) {
            const abiCoder = new ethers.utils.AbiCoder();
            const data = abiCoder.decode(["string"], error.data);
            const reason = data[0];
            console.error("Revert reason:", reason);
        } else {
            console.error("Error data not available.");
        }
        const data = false;
        return data;
      }
    }

    async function getStudentInfo(_studentAddress){
      try{
        const data = await contract.getStudentInfo(_studentAddress);
        console.log(data);
        return data;
      } catch(error)
      {
        if (error.data) {
            const abiCoder = new ethers.utils.AbiCoder();
            const data = abiCoder.decode(["string"], error.data);
            const reason = data[0];
            console.error("Revert reason:", reason);
        } else {
            console.error("Error data not available.");
        }
        const data = false;
        return data;
      }
    }

    async function verification(_transactionHash){
      try{
        const data = await contract.verification(_transactionHash);
        console.log(data);
        return data;
      } catch(error)
      {
        if (error.data) {
            const abiCoder = new ethers.utils.AbiCoder();
            const data = abiCoder.decode(["string"], error.data);
            const reason = data[0];
            console.error("Revert reason:", reason);
        } else {
            console.error("Error data not available.");
        }
        const data = false;
        return data;
      }
    }

    async function addCourses(_instituteAddress,_courseNames){
      try{
        await contract.addCourses(_instituteAddress,_courseNames);
      } catch(error){
            if (error.data) {
              const abiCoder = new ethers.utils.AbiCoder();
              const data = abiCoder.decode(["string"], error.data);
              const reason = data[0];
              console.error("Revert reason:", reason);
          } else {
              console.error("Error data not available.");
          }
      }
    }

    async function approveInstitute(_instituteAddress){
      try{
        await contract.approveInstitute(_instituteAddress);
      } catch(error){
            if (error.data) {
              const abiCoder = new ethers.utils.AbiCoder();
              const data = abiCoder.decode(["string"], error.data);
              const reason = data[0];
              console.error("Revert reason:", reason);
          } else {
              console.error("Error data not available.");
          }
      }
    }

    async function createCertificate(_studentAddress,_instituteAddress,_courseName,_transactionHash,_ipfsHash){
      try{
        await contract.createCertificate(_studentAddress,_instituteAddress,_courseName,_transactionHash,_ipfsHash);
      } catch(error){
            if (error.data) {
              const abiCoder = new ethers.utils.AbiCoder();
              const data = abiCoder.decode(["string"], error.data);
              const reason = data[0];
              console.error("Revert reason:", reason);
          } else {
              console.error("Error data not available.");
          }
      }
    }

    async function registerInstitute(_instituteAddress,_instituteData){
      try{
        await contract.registerInstitute(_instituteAddress,_instituteData);
        console.log("success");
      } catch(error){
            if (error.data) {
              const abiCoder = new ethers.utils.AbiCoder();
              const data = abiCoder.decode(["string"], error.data);
              const reason = data[0];
              console.error("Revert reason:", reason);
          } else {
              console.log(error);
          }
      }
    }

    async function registerStudent(_studentAddress,_studentData){
      try{
        await contract.registerStudent(_studentAddress,_studentData);
      } catch(error){
            if (error.data) {
              const abiCoder = new ethers.utils.AbiCoder();
              const data = abiCoder.decode(["string"], error.data);
              const reason = data[0];
              console.error("Revert reason:", reason);
          } else {
              console.error("Error data not available.");
          }
      }
    }

    async function rejectInstitute(_instituteAddress){
      try{
        await contract.rejectInstitute(_instituteAddress);
      } catch(error){
            if (error.data) {
              const abiCoder = new ethers.utils.AbiCoder();
              const data = abiCoder.decode(["string"], error.data);
              const reason = data[0];
              console.error("Revert reason:", reason);
          } else {
              console.error("Error data not available.");
          }
      }
    }

    async function enrollStudentInCourse(_studentAddress, _instituteAddress, _courseName){
      try{
        await contract.enrollStudentInCourse(_studentAddress, _instituteAddress, _courseName);
      } catch(error){
            if (error.data) {
              const abiCoder = new ethers.utils.AbiCoder();
              const data = abiCoder.decode(["string"], error.data);
              const reason = data[0];
              console.error("Revert reason:", reason);
          } else {
              console.error("Error data not available.");
          }
      }
    }
     
    const value = {
      account,
      setAccount,
      contract,
      setContract,
      provider,
      setProvider,
      contractAddress, 
      setContractAddress,
      index,
      setIndex,
      handleIndex,
      certificateData, 
      SetCertificateData,
      showSlider, 
      SetShowSlider,
      qr, 
      SetQr,
      encryptedData, 
      SetEncryptedData,
      getCertificateOwners,
      getCourses,
      getEnrolledStudentsInCourse,
      enrollStudentInCourse,
      getInstituteInfo,
      getIpfsHash,
      getStudentInfo,
      verification,
      addCourses,
      approveInstitute,
      createCertificate,
      registerInstitute,
      registerStudent,
      rejectInstitute,
      dashboardLoading, 
      setDashboardLoading,
      result, 
      setResult
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}