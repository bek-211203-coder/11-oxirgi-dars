import React, { useState, useEffect } from 'react';
import image from "../public/vite.svg"

const DevelopersList = () => {
  const [developers, setDevelopers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const fetchDevelopers = () => {
    fetch(`https://json-api.uz/api/project/11-dars/developers?skip=${skip}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          if (data.data.length < limit) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          setDevelopers(prev => [...prev, ...data.data]);
        } else {
          setHasMore(false);
        }
      })
      .catch(error => {
        console.error("Ma'lumotni olishda xatolik yuz berdi:", error);
      });
  };

  useEffect(() => {
    fetchDevelopers();
  }, [skip]);

  const handleShowMore = () => {
    setSkip(prev => prev + limit);
  };

  const handleShowLess = () => {
    setSkip(0);
    setDevelopers([]);
    setHasMore(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl  font-bold mb-4 text-center "><span className='text-[#fc00ff]'>De</span><span className='text-[#fc00ff]'>ve</span><span className='text-[#00dbde]'>lo</span><span className='text-[#00dbde]'>pe</span><span className='text-[#00dbde]'>rs</span></h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {developers.length > 0 ? (
          developers.map((developer, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded-md shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
              <div className="p-4 bg-white rounded-lg">
                <div className="flex justify-center mb-4">
                  <img src={image || 'https://via.placeholder.com/150'} alt={developer.fullName} className="w-32 h-32 rounded-full object-cover" />
                </div>
                
                <h2 className="text-xl font-semibold text-center text-gray-800"><span className='text-red-500'>Name:</span> {developer.fullName}</h2>
                <h2 className="text-xl font-semibold text-center text-gray-800"><span className='text-red-500'>Major:</span> {developer.major}</h2>
                <h2 className="text-xl font-semibold text-center text-gray-800"><span className='text-red-500'>Gender:</span> {developer.gender}</h2>
                <p className="text-center text-gray-500"><span className='text-red-500'>Age: </span> {developer.age}</p>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">Ma'lumotlar yuklanmoqda...</p>
        )}
      </ul>

      <div className="mt-4 text-center">
        {hasMore ? (
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Show more 10
          </button>
        ) : (
          <button
            onClick={handleShowLess}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default DevelopersList;
