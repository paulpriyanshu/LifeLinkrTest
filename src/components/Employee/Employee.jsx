import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  // Replace with your actual API endpoint
  const API_URL = "http://localhost:8000/api/v1/admin/allEmployees";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch employee data");
        const data = await response.json();
        console.log("data",data.data)
        setEmployees(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    // alert(`Edit Employee ID: ${id}`);

    navigate(`/editEmployee/${parseInt(id)}`)

  };

  const handleDelete = (id) => {
    alert(`Delete Employee ID: ${id}`);
    
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Employee List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Mobile</th>
              <th className="py-3 px-4">Designation</th>
              <th className="py-3 px-4">Gender</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.f_id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={`http://localhost:8000${emp.f_Image}`}
                      alt={emp.f_Name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{emp.f_Name}</td>
                  <td className="py-3 px-4">{emp.f_Email}</td>
                  <td className="py-3 px-4">{emp.f_MobileNo}</td>
                  <td className="py-3 px-4">{emp.f_Designation}</td>
                  <td className="py-3 px-4">{emp.f_Gender}</td>
                 
                  <td className="py-3 px-4">{emp.f_Course}</td>
                   <td className="py-3 px-4"> {new Date(emp.f_CreateDate).toLocaleDateString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour:'2-digit',
                        minute:'2-digit',
                        second:'2-digit'
                    })}</td> 
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(emp.f_id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;