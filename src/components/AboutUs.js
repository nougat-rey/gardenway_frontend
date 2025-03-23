// src/components/AboutUs.js
import React from 'react';
import './AboutUs.css';  // Import the updated CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2 className="about-title">Our Story</h2>
        <p className="about-description">
            This site was born from my love for plants and the beautiful flora I encountered during my travels. Along the way, I discovered unique plants that left a lasting impression—whether it was the vibrant greenery of Vietnam, the peaceful gardens of Japan, the rich diversity of Madeira, or the hardy beauty of Iceland’s wildflowers. Each place shaped my view of nature, and I wanted to share that inspiration with you.
        </p>
        <p className="about-description">
            At Gardenway, you’ll find plants and seeds influenced by these regions—each one telling its own story of resilience, beauty, and discovery. Whether you’re looking to recreate the tranquility of a Japanese garden or the boldness of Vietnam’s jungles, I hope you’ll find something that resonates with you.
        </p>
        <p className="about-description">
            Thanks for being part of this journey, and I hope these plants bring as much joy to your life as they’ve brought to mine.
        </p>
    </div>
  );
};

export default AboutUs;
