import React, { useEffect, useState } from 'react';
import { cerificateApplication } from '../../services/operations/StudentOperations';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { RegisteredInst } from "../../services/operations/InstituteOperations";

function Application() {
  const { result, dashboardLoading, setDashboardLoading } = useContext(AppContext);
  const { handleSubmit, formState: { errors }, register } = useForm(); // Use 'register' method
  const [data, setData] = useState([]);

  const onSubmit = async (data) => {
    try{
      console.log(data);
      console.log(result.id);
      const res = await cerificateApplication(result.id,data);
      console.log(res);
    } catch(error){
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      console.log(result.id);
      const response = await RegisteredInst();
      console.log(response);
      setData(response.data);
      setDashboardLoading(false);
      console.log(result.id);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label>Student Name:</label>
        <input {...register("StudentName", { required: 'Student Name is required' })} />
        {errors.StudentName && <span>{errors.StudentName.message}</span>}
      </div>

      <div>
        <label>Institute Name:</label>
        <select className='w-32' {...register("instituteName", { required: 'Institute ID is required' })}>
          {dashboardLoading ? (
            <option value="">Loading Institutes...</option>
          ) : (
            data.map(institute => (
              <option key={institute._id} value={institute._id}>
                {institute.instituteName}
              </option>
            ))
          )}
        </select>
        {errors.instituteName && <span>{errors.instituteName.message}</span>}
      </div>

      <div>
        <label>Course Name:</label>
        <input {...register("courseName", { required: 'Course Name is required' })} />
        {errors.courseName && <span>{errors.courseName.message}</span>}
      </div>

      <div>
        <label>Start Date:</label>
        <input type="date" {...register("StartDate", { required: 'Start Date is required' })} />
        {errors.StartDate && <span>{errors.StartDate.message}</span>}
      </div>

      <div>
        <label>End Date:</label>
        <input type="date" {...register("EndDate", { required: 'End Date is required' })} />
        {errors.EndDate && <span>{errors.EndDate.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Application;