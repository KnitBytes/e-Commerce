"use client"

import { Heart } from "lucide-react"
import { useState } from "react"

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false)

  const handleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setLiked(!liked)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Add to cart functionality
    console.log("Added to cart:", product.id)
  }

  return (
    <div className="border-2 rounded-md overflow-hidden h-full">
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg?height=200&width=200"}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 rounded">Organic food</div>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold">Rs {product.price}</span>
          <div className="flex items-center gap-1">
            <button onClick={handleLike} className={`${liked ? "text-red-500" : "text-gray-400"} hover:text-red-500`}>
              <Heart size={16} className={liked ? "fill-current" : ""} />
            </button>
            <span className="text-xs">{product.likes || 0}</span>
          </div>
        </div>
        <button onClick={handleAddToCart} className="w-full bg-black text-white text-xs py-1 rounded">
          Add to cart
        </button>
      </div>
    </div>
  )
}

