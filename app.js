// App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then(response => response.json())
      .then(json => setData(json.text))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Backend Response: {data}</h1>
    </div>
  );
}

export default App;
