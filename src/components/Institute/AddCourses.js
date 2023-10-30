import React, { useContext, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css"; 
import { AppContext } from "../../context/AppContext";

function AddCourses() {
  const [courseNames, setCourseNames] = useState([]);
  const { addCourses,account } = useContext(AppContext);

  const add = async () => {
    console.log(courseNames);
    console.log(account);
    await addCourses(account, courseNames);
    setCourseNames([]);
  }

  return (
    <div>
      <div>
        <h2>Your Courses: </h2>
      </div>
      <div>
      <h3>Add Courses</h3>
      <TagsInput
        value={courseNames}
        onChange={(tags) => setCourseNames(tags)}
        onlyUnique={true}
        addOnBlur={true}
        inputProps={{ placeholder: "Add course names" }}
      />
      {
        courseNames.length !=0 ? (<button onClick={add}>Add Courses</button>):(null)
      }
      </div>
    </div>
  );
}

export default AddCourses;
