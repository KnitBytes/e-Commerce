export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-400">
                Premium quality of local and organic food products and agricultural supplies for your needs.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Shop', 'About', 'Contact', 'Blog'].map((link, index) => (
                  <li key={index}><a href="#" className="text-gray-400 hover:text-white">{link}</a></li>
                ))}
              </ul>
            </div>
  
            <div>
              <h3 className="text-xl font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                {['Shipping Policy', 'Returns and Refunds', 'FAQ', 'Terms & Conditions'].map((service, index) => (
                  <li key={index}><a href="#" className="text-gray-400 hover:text-white">{service}</a></li>
                ))}
              </ul>
            </div>
  
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe us to receive updates and special offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 p-2 rounded-l-md text-gray-900"
                />
                <button className="bg-green-600 px-4 py-2 rounded-r-md hover:bg-green-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>© 2025 Dai Ko Pasal, all rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }