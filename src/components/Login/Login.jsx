import React, { useState } from "react";
import Input from "../lib/Input";
import Button from "../lib/Button";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate()
    
    async function handleSubmit (){
        if(!userName || !password){
            toast.error(`Please enter ${!userName ? "User Name" : "Password"}`)
        }
        // console.log("user name",userName)
        // console.log("password",password)
        try {
            const response=await fetch('http://localhost:8000/api/v1/admin/login',{
                method:'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                credentials:"include",
                body:JSON.stringify({
                    username:userName,
                    password
                })
            })
            const admin=await response.json()
            if(admin.status==="success"){
                navigate("/")
            }
            // console.log("admin",admin)


        } catch (error) {
            
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Toaster position="top-center"/>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Login
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        User Name
                    </label>
                    <Input
                        inputType="text"
                        inputPlaceholder="Enter your username"
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <Input
                        inputType="password"
                        inputPlaceholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                    />
                </div>

                <Button children="Submit" className="w-full" onClick={handleSubmit} />
            </div>
        </div>
    );
}

export default Login;