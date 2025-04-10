// export default function Pagination({ total, page, setPage }) {
//     const totalPages = Math.ceil(total / 12);
  
//     return (
//       <div className="flex justify-center mt-6">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={`mx-1 px-3 py-1 border ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100"}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     );
//   }
  