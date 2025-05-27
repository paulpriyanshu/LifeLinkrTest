import React, { useState } from 'react'
import Input from '../lib/Input'
import Button from '../lib/Button'

function CreateEmployee() {
const [formData, setFormData] = useState({
  f_Name: '',
  f_Email: '',
  f_Designation: '',
  f_Gender: '',
  f_Course: '',
  f_MobileNo: '',
  f_Image: null
});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
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
    data.append('f_Image', formData.f_Image);
    try {
        const response = await fetch('http://localhost:8000/api/v1/admin/createEmployee', {
      method: 'POST',
      body: data
      
    });
     const result = await response.json();
     console.log("results",result)
    if (result.status=="success") {
      alert('Employee added successfully!');
      console.log(result);
    } else {
      console.error('Validation errors:', result.errors);
      alert('Validation failed. Check console for errors.');
    }
    } catch (error) {
        
    }

    // Example: post to server
    // fetch('/api/employees', { method: 'POST', body: data });

    console.log('Form submitted:', formData);
  };

  return (
    <div className='flex justify-center items-center w-full h-screen '>
        <div className='bg-white shadow-2xl p-8 rounded-2xl w-full max-w-lg'>
       <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto ">
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
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-1  border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            {formData.f_Image && (
              <img
                src={URL.createObjectURL(formData.f_Image)}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-md shadow"
              />
            )}
          </div>

          <Button
            type="submit"
            children="Submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          />
        </form>

        </div>
    </div>
  );
}

export default CreateEmployee;