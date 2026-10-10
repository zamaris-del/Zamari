"use client";

import { useState, useEffect } from 'react';

// Simulated Apartment Data
const INITIAL_APARTMENTS = [
  {
    id: 1,
    title: "Luxury 2-Bedroom Urban Apartment",
    price: "\$2,500/mo",
    location: "Downtown Metropolis",
    description: "Spacious apartment with rooftop access and modern kitchen amenities.",
    images: [
      "https://unsplash.com",
      "https://unsplash.com"
    ],
    videos: [
      "https://w3schools.com" 
    ]
  },
  {
    id: 2,
    title: "Cozy Studio Near Transit",
    price: "\$1,400/mo",
    location: "Suburban Heights",
    description: "Perfect for students. All utilities included, 5 minutes from the train station.",
    images: [
      "https://unsplash.com"
    ],
    videos: []
  }
];

export default function Home() {
  // State variables for application filtering & forms
  const [newLocation, setNewLocation] = useState('');
  const [hasPool, setHasPool] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [apartments, setApartments] = useState(INITIAL_APARTMENTS);

  // Form states for inquiries
  const [formName, setFormName] = useState<{ [key: number]: string }>({});
  const [formEmail, setFormEmail] = useState<{ [key: number]: string }>({});
  const [formMessage, setFormMessage] = useState<{ [key: number]: string }>({});

  // Tawk.to Widget Integration
  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    
    // 💡 REMINDER: Replace this URL with your custom direct chat link from your tawk.to dashboard!
    s1.src = 'https://tawk.to'; 
    
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }
  }, []);

  // Handle email inquiry submissions locally
  const handleEnquirySubmit = (e: React.FormEvent, aptId: number) => {
    e.preventDefault();
    
    const name = formName[aptId] || '';
    const email = formEmail[aptId] || '';
    const message = formMessage[aptId] || '';

    if (!name || !email || !message) {
      alert("Please fill out all fields before sending.");
      return;
    }

    alert(`Success! Your inquiry for Property #${aptId} has been submitted.\nName: ${name}\nEmail: ${email}`);
    
    // Clear the individual form fields
    setFormName(prev => ({ ...prev, [aptId]: '' }));
    setFormEmail(prev => ({ ...prev, [aptId]: '' }));
    setFormMessage(prev => ({ ...prev, [aptId]: '' }));
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f6f8fa', minHeight: '100vh', padding: '20px', color: '#333' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* App Header */}
        <header style={{ background: '#006aff', color: 'white', padding: '30px', textAlign: 'center', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 4px 10px rgba(0, 106, 255, 0.2)' }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Zamarouse</h1>
          <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>Explore apartments, watch video tours, and chat instantly with agents.</p>
        </header>

        {/* Filter Controls (Connected to State Hooks) */}
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Filter by city or location..." 
            value={newLocation} 
            onChange={(e) => setNewLocation(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '200px' }}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="checkbox" checked={hasPool} onChange={(e) => setHasPool(e.target.checked)} />
            🏊‍♂️ Swimming Pool
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="checkbox" checked={hasParking} onChange={(e) => setHasParking(e.target.checked)} />
            🚗 Parking Lot
          </label>
        </div>

        {/* Apartment List Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {apartments
            .filter(apt => apt.location.toLowerCase().includes(newLocation.toLowerCase()))
            .map((apt) => (
              <div key={apt.id} style={{ background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                
                {/* Text Details */}
                <div>
                  <h2 style={{ margin: '0 0 10px 0', color: '#006aff' }}>{apt.title}</h2>
                  <div style={{ fontSize: '1.4em', fontWeight: 'bold', color: '#2e7d32', marginBottom: '10px' }}>{apt.price}</div>
                  <p style={{ margin: '5px 0' }}><strong>📍 Location:</strong> {apt.location}</p>
                  <p style={{ color: '#555', lineHeight: '1.5' }}>{apt.description}</p>
                </div>

                {/* Media Gallery (Pictures & Videos) */}
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginTop: '15px', paddingBottom: '10px' }}>
                  {apt.images.map((imgUrl, index) => (
                    <img 
                      key={index} 
                      src={imgUrl} 
                      alt={`Apartment view ${index + 1}`} 
                      style={{ width: '280px', height: '180px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ddd', flexShrink: 0 }} 
                    />
                  ))}
                  {apt.videos.map((videoUrl, index) => (
                    <video 
                      key={index}
                      src={videoUrl} 
                      controls 
                      muted 
                      style={{ width: '280px', height: '180px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ddd', flexShrink: 0, background: '#000' }}
                    />
                  ))}
                </div>

                {/* Email Inquiry Form */}
                <div style={{ background: '#f0f4f8', padding: '15px', borderRadius: '6px', marginTop: '15px', borderLeft: '5px solid #006aff' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>✉️ Send Email Enquiry</h3>
                  <form onSubmit={(e) => handleEnquirySubmit(e, apt.id)}>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={formName[apt.id] || ''} 
                      onChange={(e) => setFormName(prev => ({ ...prev, [apt.id]: e.target.value }))}
                      required 
                      style={{ width: '100%', padding: '8px', margin: '6px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email Address" 
                      value={formEmail[apt.id] || ''} 
                      onChange={(e) => setFormEmail(prev => ({ ...prev, [apt.id]: e.target.value }))}
                      required 
                      style={{ width: '100%', padding: '8px', margin: '6px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                    <textarea 
                      placeholder="What details would you like to request about this apartment?" 
                      value={formMessage[apt.id] || ''} 
                      onChange={(e) => setFormMessage(prev => ({ ...prev, [apt.id]: e.target.value }))}
                      rows={3} 
                      required 
                      style={{ width: '100%', padding: '8px', margin: '6px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical' }}
                    />
                    <button type="submit" style={{ background: '#006aff', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', marginTop: '5px' }}>
                      Submit Message
                    </button>
                  </form>
                </div>

              </div>
            ))}
        </div>

      </div>
    </div>
  );
}