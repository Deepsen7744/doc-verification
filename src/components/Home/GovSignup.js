import React from 'react';
import { createGoverment } from '../../services/operations/GovermentOperations';
import { useForm } from 'react-hook-form';

function GovSignup() {
  const { handleSubmit, formState: { errors }, register } = useForm();

  const statesOfIndia = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  const onSubmit = async (data) => {
    console.log(data);
    const response = await createGoverment(data);
    console.log(response);
    window.location.href = '/'; 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="state">State</label>
        <select
          name="state"
          id="state"
          {...register('state', { required: true })}
        >
          <option value="">Select a State</option>
          {statesOfIndia.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.state && <p>This field is required.</p>}
      </div>

      <div>
        <label htmlFor="AccountNumber">Account Number</label>
        <input
          type="text"
          name="AccountNumber"
          id="AccountNumber"
          {...register('AccountNumber', { required: true })}
        />
        {errors.AccountNumber && <p>This field is required.</p>}
      </div>

      <div>
        <label htmlFor="PrivateKey">Account Private Key</label>
        <input
          type="password"
          name="PrivateKey"
          id="PrivateKey"
          {...register('PrivateKey', { required: true })}
        />
        {errors.PrivateKey && <p>This field is required.</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          {...register('email', { required: true })}
        />
        {errors.email && <p>This field is required.</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default GovSignup;
