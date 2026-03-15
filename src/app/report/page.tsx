'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ReportIssuePage() {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-200 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="max-w-2xl w-full mb-8 flex items-center justify-between">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <span>&larr;</span> Back to Home
        </Link>
        <div className="text-xl font-bold text-blue-500">GovAlert</div>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl w-full bg-gray-900/80 backdrop-blur-sm p-8 border border-gray-800 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">Report an Issue</h1>
        <p className="text-gray-400 mb-8">
          Please provide as much detail as possible. This information will be sent directly to your local municipality.
        </p>

        <form className="space-y-6" action="#" method="POST">
          
          {/* Issue Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              Issue Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-3 bg-gray-950 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
              required
            >
              <option value="" disabled selected>Select a category...</option>
              <option value="pothole">Pothole / Road Damage</option>
              <option value="graffiti">Graffiti / Vandalism</option>
              <option value="streetlight">Broken Streetlight</option>
              <option value="trash">Illegal Dumping / Trash</option>
              <option value="code_violation">Property Code Violation</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter street address or cross streets"
                className="flex-grow px-4 py-3 bg-gray-950 border border-gray-700 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              <button 
                type="button"
                className="px-4 py-3 bg-gray-800 border border-gray-700 text-blue-400 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                title="Use current location"
              >
                📍
              </button>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Photo Evidence
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg hover:border-blue-500 transition-colors bg-gray-950/50 relative">
              <div className="space-y-1 text-center">
                <div className="text-4xl mb-3 text-gray-500">📸</div>
                <div className="flex text-sm text-gray-400 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                {fileName && (
                  <p className="text-sm text-green-400 mt-2 font-medium">Selected: {fileName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Provide any additional details that might help responders..."
              className="w-full px-4 py-3 bg-gray-950 border border-gray-700 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors shadow-lg shadow-blue-900/20"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}