import axios from "axios";
import { useEffect, useState } from "react";
import UpdateEmpModel from "./UpdateEmpModel";
const EmpList = () => {

    const [empList, setEmpList] = useState('');

    const [selectedEmp, setSelectedEmp] = useState(null);
    let [UpdateEmpList, setUpdateEmpList] = useState(0);
    let [updateEmpModalState, setUpdateEmpModalState] = useState(false);
    const [filteredEmpList, setFilteredEmpList] = useState(null);
    useEffect(() => {
        console.log('useEffect');
        handleGetAllEmps()
    }, [UpdateEmpList]);

    const handleGetAllEmps = ()=>{
        axios.get('http://localhost:9090/emp/get-all-emps')
        .then((resp) => {
            console.log(resp.data);
            setEmpList(resp.data);
            setFilteredEmpList(resp.data);
        })
        .catch((err) => {
            console.log(err);
            throw new Error(err)
        })
    }

    const handleDelete = (id)=>{
        axios.delete(`http://localhost:9090/emp/delete-emp/${id}`)
        .then((response)=>{
            console.log(response);
            setUpdateEmpList(UpdateEmpList+=1 )
            return "Employee Deleted Successfully"
        }).catch(err =>{
            console.log(err);
            return "Error Deleting Employee" + err
        })
    }

    const handleSearchByName =(e)=>{
        const searchValue = e.target.value.toLowerCase();
        const filteredEmpList = empList.filter(emp => emp.firstName.toLowerCase().includes(searchValue))
        setFilteredEmpList(filteredEmpList)
    }

    const handleUpdateModal = (emp)=>{
        setSelectedEmp(emp)
        setUpdateEmpModalState(!updateEmpModalState)
    }

    return (
        <>
            <h1>EmpList Component</h1>
            {/* temp btn */}
            <button className="btn border-3 border p-2 m-2" onClick={()=>handleGetAllEmps()}>Fetch Employee List</button>
            
            {/* search by name */}
            <input type="text" placeholder="Search Employee by name" className="w-50" onChange={handleSearchByName}/>
            
            
            {/* get all emp list */}
            <table className="w-75 m-5">
                <thead className="bg-light text-dark ">
                    <tr >
                        <th className="p-2">First Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Aadhaar</th>
                        <th className="p-2">Salary</th>
                        <th className="p-2">Age</th>
                        <th className="p-2">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {empList && filteredEmpList.map(emp =>
                        <tr className="border border-light" key={emp.eid}>
                            <td className="p-1 ps-2 border border-light" >{emp.firstName} </td>
                            <td className="p-1 ps-2 border border-light">{emp.email} </td>
                            <td className="p-1 ps-2 border border-light">{emp.aadhaar} </td>
                            <td className="p-1 ps-2 border border-light">Rs. {emp.salary} </td>
                            <td className="p-1 ps-2 border border-light">{emp.age} years </td>
                            <td className="p-1 ps-2 border border-light">
                                <button className="btn border p-2 rounded m-2 border-danger text-danger" onClick={()=>handleDelete(emp.eid)}>Delete</button>
                                <button className="btn border p-2 rounded m-2 border-success text-success" onClick={()=>handleUpdateModal(emp)}>Update</button>
                            </td>
                        </tr>
                    )}
                </tbody>
                    {updateEmpModalState && <UpdateEmpModel selectedEmp = {selectedEmp} setUpdateEmpModalState={setUpdateEmpModalState}/>}
            </table>
        </>
    );
};

export default EmpList;


// import axios from "axios";
// import { useState } from "react";

// const EmpList = () => {

//     const [empList, setEmpList] = useState('');

//     const getEmpList = () => {
//         axios.get('https://jsonplaceholder.typicode.com/users')
//             .then((resp) => {
//                 console.log(resp);
//                 setEmpList(resp.data);
//             })
//     };

//     return (
//         <>
//             <h1>EmpList Component</h1>
//             <p> {empList && empList.length} </p>
//             <button onClick={getEmpList}>Get Emp List</button>

//         </>
//     );
// };

// export default EmpList;
