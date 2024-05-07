import axios from 'axios';
import React, { useState } from 'react';

const UpdateEmpModel = ({selectedEmp,setUpdateEmpModalState}) => {
    const backendUrl = 'http://localhost:9090/emp/update-emp';
    const [empData, setEmpData] = useState(selectedEmp);
    const [errors, setErrors] = useState({});

    const handleChange = (evt) => {
        setEmpData({ ...empData, [evt.target.name]: evt.target.value });
        setErrors({ ...errors, [evt.target.name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!empData.firstName.trim()) {
            newErrors.firstName = "First name is required";
            isValid = false;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(empData.email)) {
            newErrors.email = "Invalid email address";
            isValid = false;
        }

        if (!/^\d{12}$/.test(empData.aadhaar)) {
            newErrors.aadhaar = "Aadhaar must be a 12-digit number";
            isValid = false;
        }

        if (empData.salary <= 0 || isNaN(empData.salary)) {
            newErrors.salary = "Salary must be a positive number";
            isValid = false;
        }
        if (empData.age <= 0 || isNaN(empData.age)) {
            newErrors.salary = "Age must be a positive number";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (validateForm()) {
            axios.put(backendUrl, empData)
                .then((resp) => {
                    alert(`${resp.data.firstName} with id ${resp.data.id} updated successfully!`);
                    setEmpData({ firstName: '', email: '', aadhaar: '', salary: '' ,age:''});
                    setUpdateEmpModalState(false)
                })
                .catch(error => {
                    console.error("Error adding employee:", error);
                });
        }
    };
    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 position-absolute top-0 start-0 bg-light bg-opacity-75 ">
            <h1 className='text-dark mt-5'>Update Employee Component</h1>
            <form className="mt-2 bg-body-tertiary p-4 w-50 mb-5 d-flex flex-column shadow-lg shadow-dark"  onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input className="px-2 py-1" type="text" id="firstName" name="firstName" value={empData.firstName} onChange={handleChange} placeholder="Enter first name" required autoFocus />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
                <br />
                <label htmlFor="email">Email:</label>
                <input className="px-2 py-1" type="email" id="email" name="email" value={empData.email} onChange={handleChange} placeholder="Enter email" />
                {errors.email && <span className="error">{errors.email}</span>}
                <br />
                <label htmlFor="aadhaar">Aadhaar:</label>
                <input className="px-2 py-1" type="number" id="aadhaar" name="aadhaar" value={empData.aadhaar} onChange={handleChange} placeholder="Enter aadhaar" />
                {errors.aadhaar && <span className="error">{errors.aadhaar}</span>}
                <br />
                <label htmlFor="salary">Salary:</label>
                <input className="px-2 py-1" type="number" id="salary" name="salary" value={empData.salary} onChange={handleChange} placeholder="Enter salary" />
                {errors.salary && <span className="error">{errors.salary}</span>}
                <br />
                <label htmlFor="age">Age:</label>
                <input className="px-2 py-1" type="number" id="age" name="age" value={empData.age} onChange={handleChange} placeholder="Enter Age" />
                {errors.age && <span className="error">{errors.Age}</span>}
                <br />
                <div className='w-100 d-flex justify-content-between'>
                <input className="px-2 py-2" type="submit" value="Update Employee" />
                <button className="btn px-2 py-2" onClick={setUpdateEmpModalState(true)} >Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateEmpModel;
