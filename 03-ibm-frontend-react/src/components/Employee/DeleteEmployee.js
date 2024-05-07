
import axios from 'axios';
import React, { useState } from 'react';

const DeleteEmployee = () => {
  

    const [inputEmpId, setInputEmpId] = useState('');
    // const [errors, setErrors] = useState({});

    const handleChange = (evt) => {
        setInputEmpId(evt.target.value);
        // setErrors({ ...errors, [evt.target.name]: '' });
    };
    const handleGetEmployeeById = async (backendUrl) => {
        try {
            const response = await axios.get(backendUrl);
            return response.data; // Return the data
        } catch (error) {
            console.error("Error getting employee:", error.message);
            throw error; // Re-throw the error
        }
    };
    
    const handleDelete = async (evt) => {
        evt.preventDefault();
        try {
            // Get employee data by ID
            const employeeData = await handleGetEmployeeById(`http://localhost:9090/emp/get-emp-by-id/${inputEmpId}`);
            
            // Check if employee exists
            if (employeeData) {
                // Extract employee ID
                const id = employeeData.eid;
                
                // Delete employee by ID
                await axios.delete(`http://localhost:9090/emp/delete-emp/${id}`);
                
                // Alert and reset input
                alert(`Employee with id : ${id} has been deleted successfully`);
                setInputEmpId('');
            } else {
                // Alert if employee doesn't exist
                alert(`Employee with id : ${inputEmpId} does not exist`);
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
            // Handle errors, e.g., display an error message
            // You can also throw the error to be handled by the caller
        }
    };
    
    return (
        <div>
            <form onSubmit={handleDelete}>
                <label>Enter Employee Id :</label>
                <input type="text" placeholder='Employee id' value={inputEmpId} onChange={handleChange} required />
                <button>Delete Employee</button>
            </form>
        </div>
    );
}

export default DeleteEmployee;
