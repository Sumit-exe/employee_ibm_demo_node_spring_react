import axios from 'axios';
import DeleteEmployee from '../components/Employee/DeleteEmployee';

const BASE_URL = 'http://localhost:9090';


const EmployeeService = {

    // DeleteEmployee: async (id) => {
    //     await axios.delete(`http://localhost:9090/emp/delete-emp/${id}`)
    //     .then((response)=>{
    //         console.log(response);
    //         setUpdateEmpList(UpdateEmpList+=1 )
    //         return "Employee Deleted Successfully"
    //     }).catch(err =>{
    //         console.log(err);
    //         return "Error Deleting Employee" + err
    //     })

    // },
}

export default EmployeeService