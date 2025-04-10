// export default function FilterSidebar({ products, setFilteredProducts }) {
//     const handleFilter = (e) => {
//       const category = e.target.value;
//       if (category === "all") {
//         setFilteredProducts(products);
//       } else {
//         setFilteredProducts(products.filter((p) => p.category === category));
//       }
//     };
  
//     return (
//       <div className="w-1/4 border-r p-4">
//         <h2 className="text-xl font-semibold mb-4">Categories</h2>
//         <select onChange={handleFilter} className="border p-2 w-full rounded">
//           <option value="all">All</option>
//           <option value="beverages">Beverages</option>
//           <option value="spices">Spices</option>
//           <option value="snacks">Snacks</option>
//         </select>
  
//         <h2 className="text-xl font-semibold mt-6 mb-2">Price</h2>
//         <input type="number" placeholder="Min" className="border p-2 w-full mb-2 rounded" />
//         <input type="number" placeholder="Max" className="border p-2 w-full rounded" />
  
//         <h2 className="text-xl font-semibold mt-6 mb-2">Brand</h2>
//         <label className="flex items-center mb-2">
//           <input type="checkbox" className="mr-2" /> Brand A
//         </label>
//         <label className="flex items-center">
//           <input type="checkbox" className="mr-2" /> Brand B
//         </label>
//       </div>
//     );
//   }
  