// "use client"

// import { useEffect } from "react"
// import { useCart } from "../context/CartContext"
// import { X } from "lucide-react"

// const CartNotification = () => {
//   const { showNotification, lastAddedItem, setIsCartOpen } = useCart()

//   // Add slide-in animation when notification appears
//   useEffect(() => {
//     if (showNotification) {
//       const notification = document.getElementById("cart-notification")
//       notification.classList.remove("translate-y-full")
//       notification.classList.add("translate-y-0")
//     }
//   }, [showNotification])

//   if (!showNotification || !lastAddedItem) return null

//   return (
//     <div
//       id="cart-notification"
//       className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 max-w-sm w-full transform transition-transform duration-300 translate-y-full"
//     >
//       <div className="flex items-start">
//         <div className="flex-shrink-0 mr-3">
//           <img
//             src={lastAddedItem.image || "/placeholder.svg?height=60&width=60"}
//             alt={lastAddedItem.name}
//             className="w-16 h-16 object-cover rounded"
//           />
//         </div>
//         <div className="flex-1">
//           <div className="flex justify-between items-start">
//             <h3 className="font-medium text-gray-900">{lastAddedItem.name}</h3>
//             <button className="text-gray-400 hover:text-gray-600">
//               <X size={16} />
//             </button>
//           </div>
//           <p className="text-sm text-gray-600 mt-1">Added to cart</p>
//           <div className="mt-3 flex justify-between">
//             <span className="text-green-600 font-medium">Rs {lastAddedItem.price}</span>
//             <button
//               onClick={() => setIsCartOpen(true)}
//               className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
//             >
//               View Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartNotification

