import React from 'react'

const FormField = ({ LabelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-800"
        >
          {LabelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 py-1.5 px-3 rounded-lg hover:from-purple-200 hover:to-pink-200 transition-all duration-200 shadow-sm"
          >
            ✨ Surprise me!
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-white border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3.5 transition-all duration-200 shadow-sm hover:shadow-md"
      />
    </div>
  )
}

export default FormField
