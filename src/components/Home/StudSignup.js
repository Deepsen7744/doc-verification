import React , {useEffect, useContext} from 'react';
import { useForm } from 'react-hook-form';
import { createStudent } from '../../services/operations/StudentOperations';
import { AppContext } from '../../context/AppContext';
import CryptoJS from 'crypto-js';
import { abi } from '../../Abi';
const {ethers} = require("ethers");

function StudSignup() {

  const { handleSubmit, formState: { errors }, register } = useForm();
  const {registerStudent} = useContext(AppContext);

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
       const response1 = await createStudent(data);
       console.log(response1);
       const secretKey = 'secret'; 
       const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
       const _studentAddress = data.AccountNumber;
       const _studentData = encryptedData;
      //  await registerStudent(_studentAddress,_studentData);
      //  window.location.href = '/'; 
      } catch(error){
       console.log(error);
      }
     };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>Account Number: {account}</div>

      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          {...register('tel', { required: 'Phone Number is required', pattern: { value: /^\d{10}$/, message: 'Please enter a valid phone number (10 digits)' } })}
        />
        {errors.tel && <p>{errors.tel.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          {...register('date', { required: 'Date of Birth is required' })}
        />
        {errors.date && <p>{errors.date.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default StudSignup;
