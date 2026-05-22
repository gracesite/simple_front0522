// App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch('https://simple20260520-repo-simple20260515.onrender.com/products')
      .then(response => response.json())
      .then(json => setData(json.text))
      .catch(err => console.error(err));
  }, []);

  return (
    
       {data}
    
  );
}

export default App;
