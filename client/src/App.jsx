import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Home, CreatePost } from './pages';

const App = () => {
  return (
   <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-gray-200 shadow-sm backdrop-blur-sm bg-white/80">
    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <span className="text-2xl font-bold bg-gradient-to-r from-[#6469ff] to-[#9575ff] bg-clip-text text-transparent">DreamCanvas</span>
    </Link>

    <div className="flex items-center gap-3">
      <Link 
        to="/" 
        className="hidden sm:block font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Browse
      </Link>
      <Link 
        to="/create-post" 
        className="font-medium bg-gradient-to-r from-[#6469ff] to-[#9575ff] text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:from-[#7479ff] hover:to-[#a575ff]"
      >
        Create
      </Link>
    </div>
    </header> 
    <main className="sm:p-8 px-4 py-8 w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>

   </BrowserRouter>
  )
}

export default App