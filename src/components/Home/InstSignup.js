import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { createInstitute } from '../../services/operations/InstituteOperations';
import CryptoJS from 'crypto-js';
import { useForm } from 'react-hook-form';
import { abi } from '../../Abi';
const {ethers} = require("ethers");

function InstSignup() {
  const { handleSubmit, formState: { errors }, register } = useForm();
  const {registerInstitute} = useContext(AppContext);

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

  const onSubmit = async (data) => {
   try{
    data.AccountNumber = account;
    console.log(data);
    const response1 = await createInstitute(data);
    console.log(response1);
    // const secretKey = 'secret'; 
    // const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    // const _instituteAddress = data.AccountNumber;
    // const _instituteData = encryptedData;
    // await registerInstitute(_instituteAddress,_instituteData);
    // window.location.href = '/'; 
   } catch(error){
    console.log(error);
   }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Institute Name:</label>
        <input
          type="text"
          {...register('instituteName', { required: 'Institute Name is required' })}
        />
        {errors.instituteName && <p>{errors.instituteName.message}</p>}
      </div>

      <div>Account Number: {account}</div>

      <div>
        <label>Contact Number:</label>
        <input
          type="tel"
          {...register('contactNumber', { required: 'Contact Number is required', pattern: {value: /^\d{10}$/, message: 'Please enter a valid contact number (10 digits)' } })}
        />
        {errors.contactNumber && <p>{errors.contactNumber.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default InstSignup;
