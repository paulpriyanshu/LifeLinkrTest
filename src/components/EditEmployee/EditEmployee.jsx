import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../lib/Input';
import Button from '../lib/Button';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    f_Name: '',
    f_Email: '',
    f_Designation: '',
    f_Gender: '',
    f_Course: '',
    f_MobileNo: '',
    f_Image: null,
    f_ImageURL: '',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/employee/${id}`,{
            method:'GET',
            credentials:"include"
        });
        const result = await res.json();
        console.log("result",result)
        if (result.status === 'success') {
          setFormData(prev => ({
            ...prev,
            ...result.data,
            f_ImageURL: result.data.f_Image || '', // Optional existing image URL
          }));
        } else {
          alert('Failed to fetch employee data');
        }
      } catch (err) {
        console.error(err);
        alert('Error fetching employee data');
      }
    };

    if (id) fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("file",files)
    if (name === 'f_Image') {
      setFormData(prev => ({ ...prev, f_Image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('f_Name', formData.f_Name);
    data.append('f_Email', formData.f_Email);
    data.append('f_MobileNo', formData.f_MobileNo);
    data.append('f_Designation', formData.f_Designation);
    data.append('f_Gender', formData.f_Gender);
    data.append('f_Course', formData.f_Course);
    if (formData.f_Image) {
      data.append('f_Image', formData.f_Image);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/editEmployee/${id}`, {
        method: 'POST',
        body: data,
        credentials:"include"
      });
      const result = await response.json();

      if (result.status === 'success') {
        alert('Employee updated successfully!');
        navigate('/employees');
      } else {
        alert('Update failed. See console for details.');
        console.error(result);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };
console.log(`${import.meta.env.VITE_API_URL}${formData.f_Image}`)
  return (
    <div className='flex justify-center items-center w-full h-screen '>
      <div className='bg-white shadow-2xl p-8 rounded-2xl w-full max-w-lg'>
        <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto">
          {[
            ['Name', 'f_Name'],
            ['Email', 'f_Email'],
            ['Mobile No', 'f_MobileNo'],
            ['Designation', 'f_Designation'],
            ['Gender', 'f_Gender'],
            ['Course', 'f_Course']
          ].map(([label, name]) => (
            <div key={name}>
              <label className="block font-semibold text-gray-700">{label}:</label>
              <Input
                inputType="text"
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Image:</label>
            <input
              type="file"
              name="f_Image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          {formData.f_Image instanceof File ? (
                <img
                    src={URL.createObjectURL(formData.f_Image)}
                    alt="New Preview"
                    className="mt-3 w-32 h-32 object-cover rounded-md shadow"
                />
                ) : formData.f_ImageURL ? (
                <img
                    src={`${import.meta.env.VITE_API_URL}${formData.f_ImageURL}`}
                    alt="Current Image"
                    className="mt-3 w-32 h-32 object-cover rounded-md shadow"
                />
                ) : null}
          </div>

          <Button
            type="submit"
            children="Update Employee"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          />
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;