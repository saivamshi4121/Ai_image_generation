import React from 'react'
import { download } from '../assets'
import { downloadImage } from '../utils'

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-xl group relative shadow-lg hover:shadow-2xl card overflow-hidden bg-white transition-all duration-300 hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-xl">
        <img
          className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
          src={photo}
          alt={prompt}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-full bg-gradient-to-t from-black via-black/95 to-transparent p-4 rounded-b-xl">
          <p className="text-white text-sm font-medium overflow-y-auto prompt line-clamp-2 mb-3 leading-relaxed">{prompt}</p>
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex justify-center items-center text-white text-xs font-bold shadow-lg">
                {name[0].toUpperCase()}
              </div>
              <p className="text-white text-sm font-semibold">{name}</p>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        type="button" 
        onClick={() => downloadImage(_id, photo)} 
        className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 pointer-events-auto"
      >
        <img src={download} alt="download" className="w-5 h-5 object-contain" />
      </button>
    </div>
  )
}

export default Card
