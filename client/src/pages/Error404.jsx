import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <div className="relative w-full h-screen">
      <iframe
        className="w-full h-full"
        src="https://lottie.host/embed/9df77584-7579-4450-a7f6-97b559d48590/Q9vMgUnVM6.lottie"
        title="404 Animation"
        frameBorder="0"
      ></iframe>

      <div className="absolute top-4/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-10">
        <Link to="/">
          <button className="btn btn-primary px-6 py-3 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-600">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}
