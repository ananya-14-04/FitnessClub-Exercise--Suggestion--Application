export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  // credentials: 'include',
  method: 'GET',
  headers: {
    // 'Content-Type': 'application/json',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': 'add your own API key here',
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};

// export const fetchData = async (url, options) => {
//   try {
//     const res = await fetch(url, options);
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
