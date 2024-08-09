


import React from 'react';
import home from '../Assests/home.jpg'; // Ensure this path is correct
import '../App.css'; // Import custom CSS

export default function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${home})`, // Use the imported image
  };

  return (
    <div className="background-style" style={backgroundStyle}>
      <h2 className="heading">BEING TOGETHER</h2>
    </div>
  );
}
