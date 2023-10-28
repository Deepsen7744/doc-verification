import React, { useEffect,useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import {abi} from "../../Abi";
const ethers = require("ethers");

function InstDashboard() {

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
  <p>InstDashboard acc:{account}</p>
  <Link to={"/dashboard/institute/institute-profile"}><button>Institute Profile</button></Link>
  <Link to={"/dashboard/institute/add-courses"}><button>AddCourses</button></Link>
  <Link to={"/dashboard/institute/certificate-application"}><button>Certificate Applications</button></Link>
  <Link to={"/dashboard/institute/given-certificates"}><button>Given Certificates</button></Link>
  </div>);
}

export default InstDashboard