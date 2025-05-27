import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [designationFilter, setDesignationFilter] = useState("All");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/admin/allEmployees`;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log("api",API_URL)
        const response = await fetch(API_URL,{
            method:'GET',
            credentials:"include"
        });
        if (!response.ok) throw new Error("Failed to fetch employee data");
        const data = await response.json();
        setEmployees(data.data);
        setFilteredEmployees(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    let result = [...employees];

    // Search
    if (searchTerm.trim()) {
      result = result.filter((emp) =>
        [emp.f_Name, emp.f_Email, emp.f_Course, emp.f_Designation]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Filter
    if (genderFilter !== "All") {
      result = result.filter((emp) => emp.f_Gender === genderFilter);
    }
    if (designationFilter !== "All") {
      result = result.filter((emp) => emp.f_Designation === designationFilter);
    }

    // Sorting
    if (sortKey) {
      result.sort((a, b) => {
        let aVal = a[sortKey];
        let bVal = b[sortKey];
        if (sortKey === "f_CreateDate") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else {
          aVal = aVal?.toLowerCase?.() ?? "";
          bVal = bVal?.toLowerCase?.() ?? "";
        }

        return sortOrder === "asc" ? aVal > bVal ? 1 : -1 : aVal < bVal ? 1 : -1;
      });
    }

    setFilteredEmployees(result);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, genderFilter, designationFilter, sortKey, sortOrder, employees]);

  const handleEdit = (id) => {
    navigate(`/editEmployee/${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete Employee ID: ${id}`);
    
    setEmployees((prev)=>prev.filter((emp)=>emp.f_id!==id))
  };

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <div className="p-6 flex justify-center items-center w-full h-screen">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  const designations = [...new Set(employees.map((e) => e.f_Designation))];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Employee List</h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, course, designation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-1/3"
        />

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          value={designationFilter}
          onChange={(e) => setDesignationFilter(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="All">All Designations</option>
          {designations.map((des, idx) => (
            <option key={idx} value={des}>{des}</option>
          ))}
        </select>
      </div>

      {/* Results Info */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} entries
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => toggleSort("f_Name")}>
                Name {sortKey === "f_Name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => toggleSort("f_Email")}>
                Email {sortKey === "f_Email" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="py-3 px-4">Mobile</th>
              <th className="py-3 px-4">Designation</th>
              <th className="py-3 px-4">Gender</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => toggleSort("f_CreateDate")}>
                Date {sortKey === "f_CreateDate" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((emp) => (
                <tr key={emp.f_id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${emp.f_Image}`}
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
                  <td className="py-3 px-4">
                    {new Date(emp.f_CreateDate).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(emp.f_id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.f_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm rounded-md ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;