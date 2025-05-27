import React from 'react'

function Input({inputType="text",inputPlaceholder="",value,onChange,className,name}) {
  return (
        <>
         <input 
         type={inputType}
         name={name}
         className={`border-2 border-slate-500 rounded-lg p-2 outline-none focus:border-green-400 ${className}`}
         placeholder={inputPlaceholder}
         onChange={onChange}
         value={value}
         />
         </>

  )
}

export default Input