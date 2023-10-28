import React, { useEffect,useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import {abi} from "../../Abi";
const ethers = require("ethers");

function StudDashboard() {

  const {
    account,
    setAccount,
    contractAddress,
    setContract,
    setProvider} = useContext(AppContext);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contract = new ethers.Contract(contractAddress,abi,signer);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return(
  <div>
  <p>StudDashboard Acc: {account}</p>
  <Link to={"/dashboard/student/student-profile"}><button>Student profile</button></Link>
  <Link to={"/dashboard/student/student-application"}><button>Application</button></Link>
  <Link to={"/dashboard/student/my-certificates"}><button>My Certificates</button></Link>
  </div>);
}

export default StudDashboard