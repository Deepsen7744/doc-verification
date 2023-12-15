import React, { useState, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import './Verification.css'
import Lottie from 'lottie-react'
import Girl from '../../assets/Qrhome.json'

const Verification = () => {
  const [scanResult, setScanResult] = useState(null)

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 340,
        height: 450,
      },
      fps: 5,
    })

    scanner.render(success, error)

    function success(result) {
      scanner.clear()
      setScanResult(result)
    }

    function error(err) {
      console.warn(err)
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-500">
      <div style={{ width: '28%' }}>
        <Lottie loop={true} animationData={Girl} />
      </div>

      <div className="bg-red-400 p-8 rounded-lg shadow-md border-2  border-black">
        <h1 className="text-2xl font-bold mb-4 text-center ">
          QR Code Scanning in React
        </h1>
        {scanResult ? (
          <div className="text-green-500 border-2  border-black">
            Success:
            <a
              className="text-blue-500 ml-2"
              href={scanResult}
              target="_blank"
              rel="noopener noreferrer"
            >
              {scanResult}
            </a>
          </div>
        ) : (
          <div
            className="w-full  h-96 bg-gray-100 rounded-lg overflow-hidden"
            id="reader"
          ></div>
        )}
      </div>
    </div>
  )
}

export default Verification
