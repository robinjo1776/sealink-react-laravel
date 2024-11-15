import React, { useContext } from "react";
import { UserContext } from "../../UserProvider"; // Adjust path as necessary
import EmpLeadTable from "../../components/Employee/EmpLeadTable";

const EmpLeadPage = () => {
    localStorage.setItem('userRole', "employee"); 
    const { currentUser } = useContext(UserContext); // Get currentUser directly

    console.log('Current User:', currentUser); // Log the current user


    // Check if currentUser is not defined or is null
    if (!currentUser) {
        return <div>Loading...</div>; // Or redirect to a login page
    }

    // Directly access role from the currentUser object
    const userRole = currentUser.role; // Access the role directly

    console.log('User Role:', userRole); // Log the user role

    return (
        <div>
            <h1>Employee Lead Page</h1>
            <EmpLeadTable userRole={userRole} currentUser={currentUser}/>
        </div>
    );
};

export default EmpLeadPage;
