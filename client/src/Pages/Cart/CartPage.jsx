import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { Trash } from 'lucide-react';

const CartPage = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeItem, 
    getSubtotal 
  } = useCart();

  const shippingFee = 100;
  const total = getSubtotal() + shippingFee;

  // Remove all items handler
  const removeAllItems = () => {
    cartItems.forEach(item => removeItem(item.id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="md:col-span-2 bg-[#f5f0e6] rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <div className="flex items-center gap-4">
              <span className="font-medium">{cartItems.length} Item</span>
              {cartItems.length > 0 && (
                <button
                  onClick={removeAllItems}
                  className="flex items-center gap-1 text-red-600 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-full text-sm transition"
                >
                  <Trash size={20} />
                </button>
              )}
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Link to="/products" className="bg-black text-white px-6 py-2 rounded-md">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-500 text-sm">Spices/Food</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-sm"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-bold text-lg min-w-[100px] text-right">
                      Rs {item.price}
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1 text-red-600 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-full text-sm transition"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-[#f5f0e6] p-6 rounded-lg h-fit sm:mt-8 md:mt-0">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span>Subtotal (item {cartItems.length})</span>
              <span className="font-medium">Rs {getSubtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">Rs {shippingFee}</span>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs {total}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-black hover:bg-gray-800 text-white text-center py-3 rounded-md font-medium"
          >
            Proceed to Pay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
