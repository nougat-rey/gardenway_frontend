import React from 'react';
import './AboutUs.css';  // Import the updated CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2 className="about-title">My Story</h2>
      <p className="about-description">
        This site was born from my love for plants and the beautiful flora I encountered during my travels. Along the way, I discovered unique plants that left a lasting impression—whether it was the vibrant greenery of Vietnam, the peaceful gardens of Japan, the rich diversity of Madeira, the hardy beauty of Iceland’s wildflowers, or the awe-inspiring landscapes of Yosemite. Each place shaped my view of nature, and I wanted to share that inspiration with you.
      </p>
      <p className="about-description">
        At Gardenway, you’ll find plants and seeds influenced by these regions—each one telling its own story of resilience, beauty, and discovery. Whether you’re looking to recreate the tranquility of a Japanese garden or the striking landscapes of Iceland, I hope you’ll find something that resonates with you.
      </p>
      <p className="about-description">
        Thanks for being part of this journey, and I hope these plants bring as much joy to your life as they’ve brought to mine.
      </p>

      {/* Divider Line */}
      <div className="divider"></div>

      {/* Photo Gallery Section */}
      <div className="photo-gallery">
        <h3 className="gallery-title">Travel Photos</h3>
        <div className="gallery-grid">
          {/* Displaying all images from /public/images */}
          <div className="photo-item">
            <img src="/images/20190928_8.jpg" alt="Travel 1" />
          </div>
          <div className="photo-item">
            <img src="/images/20230909_124446.jpg" alt="Travel 2" />
          </div>
          <div className="photo-item">
            <img src="/images/20240502_171742.jpg" alt="Travel 3" />
          </div>
          <div className="photo-item">
            <img src="/images/20240905_142945.jpg" alt="Travel 4" />
          </div>
          <div className="photo-item">
            <img src="/images/IMG_2682.JPG" alt="Travel 5" />
          </div>
          <div className="photo-item">
            <img src="/images/20190930_5.jpg" alt="Travel 6" />
          </div>
          <div className="photo-item">
            <img src="/images/20240429_085038.jpg" alt="Travel 7" />
          </div>
          <div className="photo-item">
            <img src="/images/20240901_183915.jpg" alt="Travel 8" />
          </div>
          <div className="photo-item">
            <img src="/images/20240908_133542.jpg" alt="Travel 9" />
          </div>
          <div className="photo-item">
            <img src="/images/20191006_07.jpg" alt="Travel 10" />
          </div>
          <div className="photo-item">
            <img src="/images/20240429_100129.jpg" alt="Travel 11" />
          </div>
          <div className="photo-item">
            <img src="/images/20240901_184011.jpg" alt="Travel 12" />
          </div>
          <div className="photo-item">
            <img src="/images/20240914_094020.jpg" alt="Travel 13" />
          </div>
          <div className="photo-item">
            <img src="/images/20230509_134641.jpg" alt="Travel 14" />
          </div>
          <div className="photo-item">
            <img src="/images/20240502_095312.jpg" alt="Travel 15" />
          </div>
          <div className="photo-item">
            <img src="/images/20240904_164558.jpg" alt="Travel 16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
