"use client"
import { useState, useRef } from "react"
import { Calendar, Upload } from "lucide-react"




export default function ProductPage() {
  const [productImage, setProductImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProductImage(imageUrl)
    }
  }

  const handleRemoveImage = () => {
    setProductImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Product Management</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Image upload */}
        <div className="w-full md:w-2/5 lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              {productImage ? (
                <div className="relative aspect-square w-full">
                  <img src={productImage || "/placeholder.svg"} alt="Product" className="w-full h-full object-cover" />
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                  >
                    <Upload className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              ) : (
                <div
                  className="aspect-square w-full bg-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={triggerFileInput}
                >
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                    <Upload className="h-8 w-8 text-gray-500" />
                  </div>
                  <p className="text-gray-600 font-medium">Upload image</p>
                  <p className="text-gray-400 text-sm mt-1">Click to browse files</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            </div>

            <div className="p-5 border-t border-gray-100">
              <div className="flex gap-3">
                <button
                  onClick={handleRemoveImage}
                  className="flex-1 py-2.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors font-medium"
                >
                  Remove
                </button>
                <button className="flex-1 py-2.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium">
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Product details */}
        <div className="w-full md:w-3/5 lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Product Name</label>
              <input
                type="text"
                placeholder="Enter products name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Price</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter price of the product"
                    className="w-full p-3 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Stock Quantity</label>
                <input
                  type="number"
                  placeholder="Enter quantity in stock"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Unit of Measurement</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select unit of measurement
                  </option>
                  <option value="piece">Piece</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="l">Liter (L)</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                placeholder="Write product description...."
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium">
                Save Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
