import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

function HomePage() {
  const [url, setUrl] = useState('')
  const [qrValue, setQrValue] = useState('')

  const generateQRCode = () => {
    setQrValue(url)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">
          QR Code Generator
        </h1>

        <label className="block mb-4">
          Enter URL:
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          onClick={generateQRCode}
        >
          Generate QR Code
        </button>

        {qrValue && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">QR Code:</h2>
            <QRCode value={qrValue} />
          </div>
        )}

        {qrValue && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Share QR Code:</h2>
            <div className="flex space-x-2">
              <FacebookShareButton url={qrValue}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                  Share on Facebook
                </button>
              </FacebookShareButton>
              <TwitterShareButton url={qrValue}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                  Share on Twitter
                </button>
              </TwitterShareButton>
              <WhatsappShareButton url={qrValue}>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                  Share on WhatsApp
                </button>
              </WhatsappShareButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
