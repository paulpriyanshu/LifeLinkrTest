import React, { useState } from 'react';
import Input from '../lib/Input';
import Button from '../lib/Button';
import toast from 'react-hot-toast';

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
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const { f_Name, f_Email, f_Designation, f_Gender, f_Course, f_MobileNo } = formData;
    if (!f_Name || !f_Email || !f_Designation || !f_Gender || !f_Course || !f_MobileNo) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(f_Email)) {
      toast.error("Enter a valid email address.");
      return false;
    }
    if (!/^\d{10}$/.test(f_MobileNo)) {
      toast.error("Enter a valid 10-digit mobile number.");
      return false;
    }
    return true;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validations
  if (!formData.f_Name || !formData.f_Email || !formData.f_MobileNo) {
    toast.error('Name, Email and Mobile No are required!');
    return;
  }

  if (formData.f_MobileNo.length < 10) {
    toast.error('Mobile number must be at least 10 digits!');
    return;
  }

  if (!formData.f_Designation) {
    toast.error('Please select a designation.');
    return;
  }

  if (!formData.f_Gender) {
    toast.error('Please select a gender.');
    return;
  }

  if (!formData.f_Course) {
    toast.error('Please select a course.');
    return;
  }

  if (!formData.f_Image) {
    toast.error('Please upload an image.');
    return;
  }

  // Prepare form data
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/createEmployee`, {
      method: 'POST',
      body: data,
      credentials: 'include'
    });

    const result = await response.json();

    if (result.status === 'success') {
      toast.success('Employee added successfully!');
      setFormData({
        f_Name: '',
        f_Email: '',
        f_Designation: '',
        f_Gender: '',
        f_Course: '',
        f_MobileNo: '',
        f_Image: null
      });
    } else {
      toast.error('Validation failed on the server.');
      console.error(result.errors);
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Something went wrong while submitting!');
  }
};
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='bg-white shadow-2xl p-8 rounded-2xl w-full max-w-lg'>
        <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto">

          <div>
            <label className="block font-semibold text-gray-700">Name:</label>
            <Input name="f_Name" value={formData.f_Name} onChange={handleChange} />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Email:</label>
            <Input name="f_Email" value={formData.f_Email} onChange={handleChange} />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Mobile No:</label>
            <Input name="f_MobileNo" value={formData.f_MobileNo} onChange={handleChange} />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Designation:</label>
            <select
              name="f_Designation"
              value={formData.f_Designation}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">-- Select Designation --</option>
              <option value="Manager">Manager</option>
              <option value="HR">HR</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Intern">Intern</option>
              <option value="Product Manager">Product Manager</option>
              <option value="QA Engineer">QA Engineer</option>
              <option value="Marketing Specialist">Marketing Specialist</option>
              <option value="Sales Executive">Sales Executive</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Gender:</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input type="radio" name="f_Gender" value="Male" onChange={handleChange} checked={formData.f_Gender === 'Male'} />
                Male
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="f_Gender" value="Female" onChange={handleChange} checked={formData.f_Gender === 'Female'} />
                Female
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="f_Gender" value="Other" onChange={handleChange} checked={formData.f_Gender === 'Other'} />
                Other
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Course:</label>
            <select
                name="f_Course"
                value={formData.f_Course}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            >
                <option value="">-- Select Course --</option>
                <option value="BCA">BCA</option>
                <option value="B.Sc">B.Sc</option>
                <option value="B.Tech">B.Tech</option>
                <option value="BBA">BBA</option>
                <option value="BA">BA</option>
                <option value="MCA">MCA</option>
                <option value="M.Sc">M.Sc</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="MA">MA</option>
                <option value="Diploma">Diploma</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
            </select>
            </div>

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