// "use client"

// import { useCart } from "../context/CartContext"
// import { X, Minus, Plus, ShoppingBag } from "lucide-react"
// import { Link } from "react-router-dom"

// const CartDrawer = () => {
//   const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart()

//   const handleClose = () => {
//     setIsCartOpen(false)
//   }

//   const cartCount = getCartCount()
//   const subtotal = getCartTotal()
//   const shipping = subtotal > 0 ? 100 : 0
//   const total = subtotal + shipping

//   return (
//     <>
//       {/* Overlay */}
//       {isCartOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose}></div>}

//       {/* Cart Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b">
//             <h2 className="text-xl font-bold">
//               Shopping Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
//             </h2>
//             <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100">
//               <X size={20} />
//             </button>
//           </div>

//           {/* Cart Items */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {cartItems.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-center">
//                 <ShoppingBag size={64} className="text-gray-300 mb-4" />
//                 <h3 className="text-lg font-medium text-gray-700">Your cart is empty</h3>
//                 <p className="text-gray-500 mt-2">Add items to your cart to see them here.</p>
//                 <button
//                   onClick={handleClose}
//                   className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//                 >
//                   Continue Shopping
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex border-b pb-4">
//                     <div className="w-20 h-20 flex-shrink-0">
//                       <img
//                         src={item.image || "/placeholder.svg?height=80&width=80"}
//                         alt={item.name}
//                         className="w-full h-full object-cover rounded"
//                       />
//                     </div>
//                     <div className="ml-4 flex-1">
//                       <div className="flex justify-between">
//                         <h3 className="font-medium">{item.name}</h3>
//                         <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
//                           <X size={16} />
//                         </button>
//                       </div>
//                       <p className="text-sm text-gray-500">{item.category}</p>
//                       <div className="flex justify-between items-center mt-2">
//                         <div className="flex items-center border rounded">
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                             className="px-2 py-1 hover:bg-gray-100"
//                           >
//                             <Minus size={14} />
//                           </button>
//                           <span className="px-2">{item.quantity}</span>
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             className="px-2 py-1 hover:bg-gray-100"
//                           >
//                             <Plus size={14} />
//                           </button>
//                         </div>
//                         <span className="font-medium">Rs {item.price * item.quantity}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           {cartItems.length > 0 && (
//             <div className="border-t p-4 bg-gray-50">
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Subtotal ({cartCount} items)</span>
//                   <span>Rs {subtotal}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>Rs {shipping}</span>
//                 </div>
//                 <div className="border-t pt-2 mt-2">
//                   <div className="flex justify-between font-bold">
//                     <span>Total</span>
//                     <span>Rs {total}</span>
//                   </div>
//                 </div>
//                 <Link
//                   to="/cart"
//                   onClick={handleClose}
//                   className="block w-full bg-green-600 text-white text-center py-3 rounded-md mt-4 hover:bg-green-700 transition-colors"
//                 >
//                   View Cart
//                 </Link>
//                 <button className="block w-full bg-black text-white text-center py-3 rounded-md mt-2 hover:bg-gray-800 transition-colors">
//                   Proceed to Checkout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default CartDrawer

