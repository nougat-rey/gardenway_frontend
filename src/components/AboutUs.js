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
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081424/20190928_8_iwhri9.jpg'} alt="Travel 1" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081394/20190930_5_rgibsn.jpg'} alt="Travel 2" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081393/20191006_07_o6dyu0.jpg'} alt="Travel 3" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081415/20230509_134641_rdx5x3.jpg'} alt="Travel 4" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081399/20230909_124446_bm1vpj.jpg'} alt="Travel 5" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081427/20240429_085038_bajt8i.jpg'} alt="Travel 6" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081423/20240429_100129_eur5wz.jpg'} alt="Travel 7" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081422/20240502_095312_ggjqvs.jpg'} alt="Travel 8" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081406/20240502_171742_lk4cyr.jpg'} alt="Travel 9" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081426/20240901_183915_q2gdbm.jpg'} alt="Travel 10" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081410/20240901_184011_hjn3m2.jpg'} alt="Travel 11" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081404/20240904_164558_hczdxx.jpg'} alt="Travel 12" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081405/20240905_142945_cegb1w.jpg'} alt="Travel 13" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081415/20240908_133542_cf3f7b.jpg'} alt="Travel 14" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081427/20240914_094020_ouhohq.jpg'} alt="Travel 15" />
          </div>
          <div className="photo-item">
            <img src={'https://res.cloudinary.com/dkyble7hi/image/upload/v1744081431/IMG_2682_ab8ybz.jpg'} alt="Travel 16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
