// Features.jsx
export default function Features() {
    const features = [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-green-800">
            <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2.05 16.17l-4.24-4.24 1.41-1.41 2.83 2.83 6.01-6.01 1.41 1.41-7.42 7.42z"/>
          </svg>
        ),
        title: "Quality Guaranteed",
        text: "All products are carefully selected and tested for quality."
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-green-800">
            <path fill="currentColor" d="M19 7h-3V6c0-1.1-.9-2-2-2H8C6.9 4 6 4.9 6 6v1H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM8 6h6v1H8V6zm11 12H3V9h3v1h2V9h6v1h2V9h3v9zm-9-2l-4-4h3V10h2v2h3l-4 4z"/>
          </svg>
        ),
        title: "Fast Delivery",
        text: "Free shipping on orders over Rs 10000"
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 text-green-800">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            <path fill="currentColor" d="M15 9.5c0 .83-.67 1.5-1.5 1.5S12 10.33 12 9.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
          </svg>
        ),
        title: "100% Organic",
        text: "Certified organic products for your health"
      }
    ];
  
    return (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-2 bg-green-50 rounded-full border-2 border-green-100 group-hover:border-green-300 transition-colors">
                      {feature.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }