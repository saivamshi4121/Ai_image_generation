import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
        const response = await fetch(`${apiUrl}/api/v1/dalle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);

      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
        const response = await fetch(`${apiUrl}/api/v1/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })

        await response.json();
        navigate('/');
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter an prompt and generate the image')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }
  return (
    <section className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#222328] to-[#6469ff] text-4xl sm:text-5xl mb-3">
          Create
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Create imaginative and visually stunning images through AI and share them with the community
        </p>
      </div>

      <form className="mt-12" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <FormField 
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A futuristic robot exploring a neon-lit cyberpunk city..."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-white border-2 border-dashed border-gray-200 rounded-2xl w-full p-6 min-h-[400px] flex justify-center items-center hover:border-[#6469ff] transition-colors duration-300 shadow-sm">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain rounded-xl"
              />
            ): (
              <div className="text-center">
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 h-32 object-contain opacity-30 mx-auto mb-4"
                />
                <p className="text-gray-400 text-sm">Your generated image will appear here</p>
              </div>
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-10 flex justify-center items-center bg-white/90 backdrop-blur-sm rounded-xl">
                <Loader />
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={generateImage}
            disabled={!form.prompt}
            className="text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 font-semibold rounded-xl text-sm w-full sm:w-auto px-8 py-3.5 text-center shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {generatingImg ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Generating...
              </span>
            ) : (
              '🚀 Generate Image'
            )}
          </button>
        </div>
        
        <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
          <p className="text-gray-700 text-sm mb-4">
            Once you've created the perfect image, share it with the community!
          </p>
          <button
            type="submit"
            disabled={!form.photo}
            className="text-white bg-gradient-to-r from-[#6469ff] to-[#9575ff] hover:from-[#7479ff] hover:to-[#a575ff] font-semibold rounded-xl text-sm w-full sm:w-auto px-8 py-3.5 text-center shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sharing...
              </span>
            ) : (
              '✨ Share with the community'
            )}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
