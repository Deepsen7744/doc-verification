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
    const [contractAddress, setContractAddress] = useState("0x98858Ab398F25Ca9BF1B709F516FF09865951AD5");

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

    async function createCertificate(_studentAddress,_instituteAddress,_courseName,_transactionHash){
      try{
        await contract.createCertificate(_studentAddress,_instituteAddress,_courseName,_transactionHash);
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

    async function uploadCertificate(_studentAddress,_instituteAddress,_transactionHash,_courseName,_ipfsHash){
      try{
        await contract.uploadCertificate(_studentAddress,_instituteAddress,_transactionHash,_courseName,_ipfsHash);
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
      getCertificateOwners,
      getCourses,
      getEnrolledStudentsInCourse,
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
      uploadCertificate,
      dashboardLoading, 
      setDashboardLoading,
      result, 
      setResult
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}