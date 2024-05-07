// import axios from "axios";
// import { useState } from "react";

// const AddEmployee = () => {

//     const backendUrl = 'https://jsonplaceholder.typicode.com/users';
//     const [empData, setEmpData] = useState({ firstName: '', email: '', aadhaar: '', salary: '' });

//     const handleChange = (evt) => {
//         console.log(evt.target);
//         setEmpData({ ...empData, [evt.target.name]: evt.target.value });
//     };

//     const handleSubmit = (evt) => {
//         evt.preventDefault();
//         console.log(empData);
//         axios.post(backendUrl, empData)
//             .then((resp) => {
//                 console.log(resp.data);
//                 alert(`${resp.data.firstName} with id ${resp.data.id} added successfully!`);
//                 setEmpData({ firstName: '', email: '', aadhaar: '', salary: '' });
//             });
//     };

//     return (
//         <>
//             <h1>Add Employee Component</h1>
//             <form onSubmit={handleSubmit} >
//                 <label htmlFor="firstName">First Name:</label>
//                 <input type="text" id="firstName" name="firstName" value={empData.firstName} onChange={handleChange} placeholder="Enter first name" required autoFocus />
//                 <br />
//                 <label htmlFor="email">Email:</label>
//                 <input type="email" id="email" name="email" value={empData.email} onChange={handleChange} placeholder="Enter email" />
//                 <br />
//                 <label htmlFor="aadhaar">Aadhaar:</label>
//                 <input type="number" id="aadhaar" name="aadhaar" value={empData.aadhaar} onChange={handleChange} placeholder="Enter aadhaar" />
//                 <br />
//                 <label htmlFor="salary">Salary:</label>
//                 <input type="number" id="salary" name="salary" value={empData.salary} onChange={handleChange} placeholder="Enter salary" />
//                 <br />
//                 <input type="submit" value="Add Employee" />
//             </form>
//         </>
//     );
// };

// export default AddEmployee;






import axios from "axios";
import { useState } from "react";

const AddEmployee = () => {
    const backendUrl = 'http://localhost:9090/emp/add-emp';
    const [empData, setEmpData] = useState({ firstName: '', email: '', aadhaar: '', salary: '' ,age:''});
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
            axios.post(backendUrl, empData)
                .then((resp) => {
                    alert(`${resp.data.firstName} with id ${resp.data.id} added successfully!`);
                    setEmpData({ firstName: '', email: '', aadhaar: '', salary: '' ,age:''});
                })
                .catch(error => {
                    console.error("Error adding employee:", error);
                });
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-75">
            <h1>Add Employee Component</h1>
            <form className="mt-5 bg-body-tertiary p-4 w-75 mb-5 d-flex flex-column shadow-lg "  onSubmit={handleSubmit}>
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
                <input className="px-2 py-2" type="submit" value="Add Employee" />
            </form>
        </div>
    );
};

export default AddEmployee;
