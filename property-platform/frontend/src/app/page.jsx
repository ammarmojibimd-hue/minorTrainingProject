'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';

// 12 PROPERTIES WITH OWNER DETAILS
const INITIAL_PROPERTIES = [
  { 
    id: 1, 
    title: 'Skyline Luxury Residency', 
    location: 'Bandra West, Mumbai, India', 
    price: 85000, 
    rating: 4.9, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 
    description: 'Premium 3BHK high-rise apartment in Bandra with sea view, modern fittings, and private elevator.', 
    amenities: ['Sea View', 'Gym & Spa', '24/7 Security', 'Covered Parking'],
    owner: { name: 'Rajesh Mehta', phone: '+91 98200 12345', email: 'rajesh.mehta@urbanhaven.in' }
  },
  { 
    id: 2, 
    title: 'Sea Breeze Apartments', 
    location: 'Juhu, Mumbai, India', 
    price: 95000, 
    rating: 4.8, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', 
    description: 'Beachfront luxury living with balcony view and walking access to Juhu Beach.', 
    amenities: ['Beach Front', 'Swimming Pool', 'Private Terrace', 'Valet Parking'],
    owner: { name: 'Sunita Kapoor', phone: '+91 98211 56789', email: 'sunita.k@urbanhaven.in' }
  },
  { 
    id: 3, 
    title: 'Tech Park Smart Villa', 
    location: 'Whitefield, Bengaluru, India', 
    price: 45000, 
    rating: 4.8, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 
    description: 'Modern smart villa near ITPL Whitefield with solar backup and clubhouse access.', 
    amenities: ['Private Garden', 'Clubhouse', 'Swimming Pool', 'EV Charging'],
    owner: { name: 'Vikram Reddy', phone: '+91 98450 99887', email: 'vikram.reddy@urbanhaven.in' }
  },
  { 
    id: 4, 
    title: 'Green Meadows Loft', 
    location: 'Koramangala, Bengaluru, India', 
    price: 52000, 
    rating: 4.7, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', 
    description: 'Spacious loft with high ceilings and smart home features in the heart of startup hub.', 
    amenities: ['Smart Locks', 'Rooftop Lounge', 'High-speed Fiber', 'Power Backup'],
    owner: { name: 'Ananya Rao', phone: '+91 98801 44332', email: 'ananya.rao@urbanhaven.in' }
  },
  { 
    id: 5, 
    title: 'Heritage Green Penthouse', 
    location: 'Golf Course Road, Gurgaon, Delhi NCR, India', 
    price: 120000, 
    rating: 4.9, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80', 
    description: 'Ultra-luxurious penthouse with private terrace pool and 360-degree green view.', 
    amenities: ['Terrace Pool', 'Concierge Service', 'Tennis Court', 'Smart Home Controls'],
    owner: { name: 'Sanjay Ahuja', phone: '+91 98100 88776', email: 'sanjay.ahuja@urbanhaven.in' }
  },
  { 
    id: 6, 
    title: 'Diplomatic Enclave Residency', 
    location: 'Vasant Vihar, New Delhi, India', 
    price: 110000, 
    rating: 4.9, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', 
    description: 'Elegant independent floor with lush green surroundings and maximum privacy.', 
    amenities: ['Private Garden', '24/7 Security', 'Modular Kitchen', 'Servant Quarter'],
    owner: { name: 'Kavita Verma', phone: '+91 98112 33445', email: 'kavita.v@urbanhaven.in' }
  },
  { 
    id: 7, 
    title: 'Cyber City Modern Flat', 
    location: 'Gachibowli, Hyderabad, India', 
    price: 38000, 
    rating: 4.7, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80', 
    description: 'Fully furnished 2BHK flat close to financial district, high-speed internet included.', 
    amenities: ['High-speed WiFi', 'Power Backup', 'Gated Community', 'Gym'],
    owner: { name: 'Venkat Rao', phone: '+91 99490 11223', email: 'venkat.rao@urbanhaven.in' }
  },
  { 
    id: 8, 
    title: 'Koregaon Park Luxury Studio', 
    location: 'Koregaon Park, Pune, India', 
    price: 32000, 
    rating: 4.6, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', 
    description: 'Trendy studio flat surrounded by cafes, lush greenery, and nightlife options.', 
    amenities: ['Balcony View', 'Cafeteria Access', 'Pet Friendly', 'Security'],
    owner: { name: 'Amit Kulkarni', phone: '+91 98220 55443', email: 'amit.k@urbanhaven.in' }
  },
  { 
    id: 9, 
    title: 'Sunset Beach Villa', 
    location: 'Candolim, Goa, India', 
    price: 65000, 
    rating: 4.9, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', 
    description: 'Peaceful beachfront villa with private lawn, walking distance to Candolim beach.', 
    amenities: ['Beachfront', 'Private Lawn', 'Full Kitchen', 'Housekeeping'],
    owner: { name: 'Joseph D\'Souza', phone: '+91 98230 66778', email: 'joseph.dsouza@urbanhaven.in' }
  },
  { 
    id: 10, 
    title: 'Royal Heritage Villa', 
    location: 'Vaishali Nagar, Jaipur, India', 
    price: 40000, 
    rating: 4.7, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80', 
    description: 'Traditional Rajasthani architecture combined with modern interior amenities.', 
    amenities: ['Courtyard', 'Private Parking', 'Air Conditioned', 'Security'],
    owner: { name: 'Mahendra Singh', phone: '+91 94140 77889', email: 'm.singh@urbanhaven.in' }
  },
  { 
    id: 11, 
    title: 'Marine Drive Bay Suite', 
    location: 'Ballygunge, Kolkata, India', 
    price: 35000, 
    rating: 4.6, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', 
    description: 'Cozy and elegant 3BHK flat located in a heritage neighborhood of South Kolkata.', 
    amenities: ['Elevator', 'Club House', 'Intercom', 'Power Backup'],
    owner: { name: 'Subhash Banerjee', phone: '+91 98300 22114', email: 'subhash.b@urbanhaven.in' }
  },
  { 
    id: 12, 
    title: 'ECE Waterfront Studio', 
    location: 'ECR Road, Chennai, India', 
    price: 42000, 
    rating: 4.8, 
    applied: false, 
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80', 
    description: 'Scenic sea-facing residential apartment along East Coast Road Chennai.', 
    amenities: ['Sea View', 'Covered Parking', 'Gated Security', 'Swimming Pool'],
    owner: { name: 'Karthik Subramanian', phone: '+91 98400 33221', email: 'karthik.s@urbanhaven.in' }
  }
];

// TENANT LEASES & MONTHLY PAYMENT DATA
const INITIAL_TENANT_LEASES = [
  {
    id: 'L1',
    propertyTitle: 'Skyline Luxury Residency #1402',
    location: 'Bandra West, Mumbai',
    ownerName: 'Rajesh Mehta',
    ownerPhone: '+91 98200 12345',
    rentAmount: 85000,
    currentStatus: 'Due',
    nextDueDate: 'Oct 1, 2026',
    history: [
      { month: 'September 2026', amount: 85000, status: 'Due', date: 'Due Sep 15' },
      { month: 'August 2026', amount: 85000, status: 'Paid', date: 'Paid on Aug 02' },
      { month: 'July 2026', amount: 85000, status: 'Paid', date: 'Paid on Jul 01' },
      { month: 'June 2026', amount: 85000, status: 'Paid', date: 'Paid on Jun 03' }
    ]
  },
  {
    id: 'L2',
    propertyTitle: 'Tech Park Smart Villa #08',
    location: 'Whitefield, Bengaluru',
    ownerName: 'Vikram Reddy',
    ownerPhone: '+91 98450 99887',
    rentAmount: 45000,
    currentStatus: 'Paid',
    nextDueDate: 'Oct 5, 2026',
    history: [
      { month: 'September 2026', amount: 45000, status: 'Paid', date: 'Paid on Sep 01' },
      { month: 'August 2026', amount: 45000, status: 'Paid', date: 'Paid on Aug 04' },
      { month: 'July 2026', amount: 45000, status: 'Paid', date: 'Paid on Jul 02' },
      { month: 'June 2026', amount: 45000, status: 'Paid', date: 'Paid on Jun 01' }
    ]
  },
  {
    id: 'L3',
    propertyTitle: 'Green Meadows Loft #204',
    location: 'Koramangala, Bengaluru',
    ownerName: 'Ananya Rao',
    ownerPhone: '+91 98801 44332',
    rentAmount: 52000,
    currentStatus: 'Due',
    nextDueDate: 'Sep 20, 2026',
    history: [
      { month: 'September 2026', amount: 52000, status: 'Due', date: 'Due Sep 20' },
      { month: 'August 2026', amount: 52000, status: 'Due', date: 'Overdue' },
      { month: 'July 2026', amount: 52000, status: 'Paid', date: 'Paid on Jul 05' },
      { month: 'June 2026', amount: 52000, status: 'Paid', date: 'Paid on Jun 02' }
    ]
  },
  {
    id: 'L4',
    propertyTitle: 'Cyber City Modern Flat #B-501',
    location: 'Gachibowli, Hyderabad',
    ownerName: 'Venkat Rao',
    ownerPhone: '+91 99490 11223',
    rentAmount: 38000,
    currentStatus: 'Paid',
    nextDueDate: 'Oct 10, 2026',
    history: [
      { month: 'September 2026', amount: 38000, status: 'Paid', date: 'Paid on Sep 02' },
      { month: 'August 2026', amount: 38000, status: 'Paid', date: 'Paid on Aug 01' },
      { month: 'July 2026', amount: 38000, status: 'Paid', date: 'Paid on Jul 03' },
      { month: 'June 2026', amount: 38000, status: 'Paid', date: 'Paid on Jun 04' }
    ]
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('browse');
  const [search, setSearch] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);

  const [tenantLeases, setTenantLeases] = useState(INITIAL_TENANT_LEASES);
  const [selectedLease, setSelectedLease] = useState(null);

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);

  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editLocation, setEditLocation] = useState('');

  const [applications, setApplications] = useState([
    { 
      id: 101, 
      applicantName: 'Rahul Sharma', 
      propertyTitle: 'Tech Park Smart Villa', 
      ownerName: 'Vikram Reddy',
      status: 'Pending' 
    }
  ]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/name/india')
      .then(res => res.json())
      .then(data => {
        if (data?.[0]) {
          setCountryInfo({
            name: data[0].name.common,
            flag: data[0].flag,
            currency: Object.keys(data[0].currencies)[0]
          });
        }
      })
      .catch(err => console.error('Country API fetch error:', err));
  }, []);

  const filteredProperties = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return properties;
    return properties.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.owner.name.toLowerCase().includes(query)
    );
  }, [search, properties]);

  const handleApply = useCallback((prop) => {
    setProperties(prev => prev.map(p => p.id === prop.id ? { ...p, applied: true } : p));
    
    setApplications(prev => [
      ...prev,
      { 
        id: Date.now(), 
        applicantName: 'Aarav Sharma (Tenant)', 
        propertyTitle: prop.title, 
        ownerName: prop.owner.name,
        status: 'Pending' 
      }
    ]);
  }, []);

  const openEditModal = useCallback((prop) => {
    setEditingProperty(prop);
    setEditTitle(prop.title);
    setEditPrice(prop.price);
    setEditLocation(prop.location);
  }, []);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setProperties(prev => prev.map(p => p.id === editingProperty.id ? {
      ...p,
      title: editTitle,
      price: Number(editPrice),
      location: editLocation
    } : p));
    setEditingProperty(null);
  };

  const handleStatusChange = useCallback((appId, newStatus) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
  }, []);

  const handlePayMonthRent = (leaseId, monthIndex) => {
    setTenantLeases(prevLeases => prevLeases.map(lease => {
      if (lease.id === leaseId) {
        const updatedHistory = lease.history.map((h, idx) => {
          if (idx === monthIndex) {
            return { ...h, status: 'Paid', date: 'Paid Just Now' };
          }
          return h;
        });

        const hasAnyDue = updatedHistory.some(h => h.status === 'Due');
        const updatedStatus = hasAnyDue ? 'Due' : 'Paid';

        const updated = { ...lease, history: updatedHistory, currentStatus: updatedStatus };
        setSelectedLease(updated);
        return updated;
      }
      return lease;
    }));
  };

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          🏢 UrbanHaven 
          {countryInfo && <span style={{fontSize: '14px', fontWeight: 'normal', marginLeft: '10px'}}>{countryInfo.flag} {countryInfo.name}</span>}
        </div>
        <div style={styles.navLinks}>
          <button style={activeTab === 'browse' ? styles.activeNavBtn : styles.navBtn} onClick={() => setActiveTab('browse')}>Browse Properties</button>
          <button style={activeTab === 'tenant' ? styles.activeNavBtn : styles.navBtn} onClick={() => setActiveTab('tenant')}>Tenant Dashboard</button>
          <button style={activeTab === 'owner' ? styles.activeNavBtn : styles.navBtn} onClick={() => setActiveTab('owner')}>
            Owner Dashboard {applications.length > 0 && <span style={styles.badge}>{applications.length}</span>}
          </button>
        </div>
      </nav>

      {/* SEARCH BAR */}
      {activeTab === 'browse' && (
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="🔍 Search city, title or owner name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      )}

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        {activeTab === 'browse' && (
          <div>
            <h1 style={styles.heading}>Explore Properties in India</h1>
            <p style={styles.subHeading}>
              Showing {filteredProperties.length} of {properties.length} properties {search && `for "${search}"`}
            </p>

            {filteredProperties.length === 0 ? (
              <div style={styles.noResults}>
                <h3>No properties found matching "{search}"</h3>
                <p>Try searching for <strong>Mumbai</strong>, <strong>Bengaluru</strong>, <strong>Delhi</strong>, <strong>Goa</strong> or clear search.</p>
              </div>
            ) : (
              <div style={styles.grid}>
                {filteredProperties.map((prop) => (
                  <div key={prop.id} style={styles.card}>
                    <img src={prop.image} alt={prop.title} style={styles.cardImage} loading="lazy" />
                    <div style={styles.cardContent}>
                      <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle}>{prop.title}</h2>
                        <span style={styles.ratingBadge}>★ {prop.rating}</span>
                      </div>
                      <p style={styles.location}>📍 {prop.location}</p>
                      <p style={styles.ownerBrief}>👤 Owner: <strong>{prop.owner.name}</strong></p>
                      <p style={styles.price}>₹{prop.price.toLocaleString('en-IN')} <span style={{fontSize: '12px', color: '#666'}}>/ month</span></p>

                      <div style={styles.btnRow}>
                        <button style={styles.viewBtn} onClick={() => setSelectedProperty(prop)}>View Details</button>
                        <button style={styles.editBtn} onClick={() => openEditModal(prop)}>✏️ Edit</button>
                      </div>

                      <button 
                        style={prop.applied ? styles.appliedBtn : styles.applyBtn} 
                        onClick={() => !prop.applied && handleApply(prop)}
                        disabled={prop.applied}
                      >
                        {prop.applied ? 'Applied ✔' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TENANT DASHBOARD WITH MULTIPLE PROPERTY CARDS */}
        {activeTab === 'tenant' && (
          <div>
            <h2 style={{fontSize: '22px', color: '#1e293b', marginBottom: '15px'}}>My Rented Properties ({tenantLeases.length})</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px'}}>
              {tenantLeases.map((lease) => (
                <div key={lease.id} style={styles.tenantCard}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div>
                      <h3 style={{margin: '0 0 6px 0', fontSize: '18px', color: '#0f172a'}}>{lease.propertyTitle}</h3>
                      <p style={{margin: 0, fontSize: '13px', color: '#64748b'}}>📍 {lease.location}</p>
                    </div>
                    <span style={lease.currentStatus === 'Paid' ? styles.statusPaidBadge : styles.statusDueBadge}>
                      {lease.currentStatus === 'Paid' ? 'Rent Paid' : 'Rent Due'}
                    </span>
                  </div>

                  <hr style={{margin: '12px 0', borderColor: '#e2e8f0'}} />

                  <p style={{fontSize: '13px', margin: '4px 0', color: '#334155'}}>👤 Owner: <strong>{lease.ownerName}</strong> ({lease.ownerPhone})</p>
                  <p style={{fontSize: '13px', margin: '4px 0', color: '#334155'}}>💰 Monthly Rent: <strong>₹{lease.rentAmount.toLocaleString('en-IN')}</strong></p>
                  <p style={{fontSize: '13px', margin: '4px 0 15px 0', color: '#334155'}}>🗓 Next Due Date: <strong>{lease.nextDueDate}</strong></p>

                  <button 
                    style={styles.historyBtn} 
                    onClick={() => setSelectedLease(lease)}
                  >
                    📊 View Past Payments & Status
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OWNER DASHBOARD */}
        {activeTab === 'owner' && (
          <div style={styles.dashboardCard}>
            <h2>Owner Dashboard - Applications ({applications.length})</h2>
            {applications.length === 0 ? (
              <p style={{color: '#666', marginTop: '15px'}}>No applications received yet.</p>
            ) : (
              <div style={{marginTop: '20px'}}>
                {applications.map((app) => (
                  <div key={app.id} style={styles.appRow}>
                    <div>
                      <strong style={{fontSize: '16px', color: '#0f172a'}}>{app.applicantName}</strong>
                      <p style={{fontSize: '13px', color: '#475569', margin: '4px 0'}}>
                        🏢 <strong>Building:</strong> {app.propertyTitle}
                      </p>
                      <p style={{fontSize: '13px', color: '#475569', margin: '2px 0 6px 0'}}>
                        👤 <strong>Owner:</strong> {app.ownerName}
                      </p>
                      <p style={{fontSize: '12px', fontWeight: 'bold', color: app.status === 'Approved' ? '#16a34a' : app.status === 'Rejected' ? '#dc2626' : '#d97706'}}>
                        Status: {app.status}
                      </p>
                    </div>
                    {app.status === 'Pending' && (
                      <div style={{display: 'flex', gap: '8px'}}>
                        <button style={styles.approveBtn} onClick={() => handleStatusChange(app.id, 'Approved')}>Approve</button>
                        <button style={styles.rejectBtn} onClick={() => handleStatusChange(app.id, 'Rejected')}>Reject</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* TENANT LEASE PAYMENT HISTORY MODAL */}
      {selectedLease && (
        <div style={styles.modalOverlay} onClick={() => setSelectedLease(null)}>
          <div style={styles.modalBody} onClick={(e) => e.stopPropagation()}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3 style={{margin: 0, fontSize: '18px'}}>{selectedLease.propertyTitle}</h3>
              <span style={selectedLease.currentStatus === 'Paid' ? styles.statusPaidBadge : styles.statusDueBadge}>
                {selectedLease.currentStatus}
              </span>
            </div>
            
            <p style={{fontSize: '13px', color: '#64748b', margin: '6px 0 15px 0'}}>
              Owner: {selectedLease.ownerName} • Rent: ₹{selectedLease.rentAmount.toLocaleString('en-IN')}/mo
            </p>

            <h4 style={{fontSize: '14px', marginBottom: '10px', color: '#1e293b'}}>📅 Past Months Payment Breakdown</h4>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {selectedLease.history.map((m, idx) => (
                <div key={idx} style={styles.monthRow}>
                  <div>
                    <strong style={{fontSize: '14px', color: '#0f172a'}}>{m.month}</strong>
                    <p style={{fontSize: '12px', color: '#64748b', margin: '2px 0 0 0'}}>₹{m.amount.toLocaleString('en-IN')} • {m.date}</p>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <span style={{
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      backgroundColor: m.status === 'Paid' ? '#dcfce7' : '#fee2e2',
                      color: m.status === 'Paid' ? '#15803d' : '#b91c1c'
                    }}>
                      {m.status}
                    </span>

                    {m.status === 'Due' && (
                      <button 
                        style={styles.payNowMiniBtn} 
                        onClick={() => handlePayMonthRent(selectedLease.id, idx)}
                      >
                        Pay ₹{m.amount.toLocaleString('en-IN')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button style={styles.closeBtn} onClick={() => setSelectedLease(null)}>Close Window</button>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {selectedProperty && (
        <div style={styles.modalOverlay} onClick={() => setSelectedProperty(null)}>
          <div style={styles.modalBody} onClick={(e) => e.stopPropagation()}>
            <img src={selectedProperty.image} alt={selectedProperty.title} style={styles.modalImg} />
            <h2>{selectedProperty.title}</h2>
            <p style={{color: '#4f46e5', fontWeight: 'bold', margin: '5px 0'}}>📍 {selectedProperty.location} • ₹{selectedProperty.price.toLocaleString('en-IN')}/month</p>
            <p style={{fontSize: '14px', color: '#475569', margin: '10px 0'}}>{selectedProperty.description}</p>
            
            <div style={styles.ownerBox}>
              <h4 style={{margin: '0 0 8px 0', color: '#1e293b'}}>👤 Owner Information</h4>
              <p style={styles.ownerText}><strong>Name:</strong> {selectedProperty.owner.name}</p>
              <p style={styles.ownerText}><strong>Phone:</strong> <a href={`tel:${selectedProperty.owner.phone}`} style={{color: '#4f46e5'}}>{selectedProperty.owner.phone}</a></p>
              <p style={styles.ownerText}><strong>Email:</strong> <a href={`mailto:${selectedProperty.owner.email}`} style={{color: '#4f46e5'}}>{selectedProperty.owner.email}</a></p>
            </div>

            <h4 style={{marginTop: '15px', marginBottom: '8px'}}>Amenities:</h4>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {selectedProperty.amenities.map((item, idx) => (
                <span key={idx} style={styles.chip}>✓ {item}</span>
              ))}
            </div>

            <button style={styles.closeBtn} onClick={() => setSelectedProperty(null)}>Close</button>
          </div>
        </div>
      )}

      {/* EDIT PROPERTY MODAL */}
      {editingProperty && (
        <div style={styles.modalOverlay} onClick={() => setEditingProperty(null)}>
          <div style={styles.modalBody} onClick={(e) => e.stopPropagation()}>
            <h2>Edit Property Details</h2>
            <form onSubmit={handleSaveEdit} style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px'}}>
              <div>
                <label style={styles.label}>Title</label>
                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={styles.input} required />
              </div>
              <div>
                <label style={styles.label}>Rent Price (₹/month)</label>
                <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} style={styles.input} required />
              </div>
              <div>
                <label style={styles.label}>Location</label>
                <input type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} style={styles.input} required />
              </div>
              
              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <button type="submit" style={styles.saveBtn}>Save Changes</button>
                <button type="button" style={styles.closeBtn} onClick={() => setEditingProperty(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  container: { fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', margin: 0, position: 'relative' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4f46e5', padding: '15px 40px', color: '#fff' },
  logo: { fontSize: '22px', fontWeight: 'bold' },
  navLinks: { display: 'flex', gap: '10px', alignItems: 'center' },
  navBtn: { background: 'transparent', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
  activeNavBtn: { background: '#3730a3', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  badge: { backgroundColor: '#ef4444', color: '#fff', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', marginLeft: '6px' },
  searchContainer: { display: 'flex', justifyContent: 'center', marginTop: '25px' },
  searchInput: { width: '450px', padding: '12px 20px', borderRadius: '25px', border: '2px solid #6366f1', fontSize: '14px', outline: 'none', boxShadow: '0 4px 10px rgba(99, 102, 241, 0.15)' },
  main: { maxWidth: '1200px', margin: '20px auto', padding: '0 20px' },
  heading: { fontSize: '24px', color: '#1e293b' },
  subHeading: { color: '#64748b', fontSize: '14px', marginBottom: '20px' },
  noResults: { backgroundColor: '#fff', padding: '40px', textAlign: 'center', borderRadius: '12px', color: '#64748b', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  card: { backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
  cardImage: { width: '100%', height: '180px', objectFit: 'cover' },
  cardContent: { padding: '18px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: '17px', margin: 0, color: '#0f172a' },
  ratingBadge: { backgroundColor: '#fef3c7', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' },
  location: { color: '#64748b', fontSize: '13px', margin: '6px 0' },
  ownerBrief: { color: '#334155', fontSize: '13px', margin: '4px 0 10px 0' },
  price: { fontSize: '20px', fontWeight: 'bold', color: '#4f46e5', marginBottom: '12px' },
  btnRow: { display: 'flex', gap: '8px', marginBottom: '10px' },
  viewBtn: { flex: 1, padding: '8px', backgroundColor: '#e0e7ff', color: '#4338ca', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
  editBtn: { padding: '8px 12px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
  applyBtn: { width: '100%', padding: '10px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  appliedBtn: { width: '100%', padding: '10px', backgroundColor: '#94a3b8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'not-allowed' },
  dashboardCard: { backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  
  // TENANT SPECIFIC STYLES
  tenantCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  statusPaidBadge: { backgroundColor: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  statusDueBadge: { backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  historyBtn: { width: '100%', padding: '10px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' },
  monthRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' },
  payNowMiniBtn: { backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' },

  appRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '12px 0' },
  approveBtn: { backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' },
  rejectBtn: { backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalBody: { backgroundColor: '#fff', padding: '25px', borderRadius: '12px', maxWidth: '480px', width: '90%', maxHeight: '90vh', overflowY: 'auto' },
  modalImg: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' },
  ownerBox: { backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px', margin: '15px 0' },
  ownerText: { margin: '4px 0', fontSize: '13px', color: '#334155' },
  chip: { backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', color: '#334155' },
  closeBtn: { marginTop: '15px', width: '100%', padding: '10px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  saveBtn: { flex: 1, padding: '10px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  input: { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px', boxSizing: 'border-box' },
  label: { fontSize: '12px', fontWeight: 'bold', color: '#334155' }
};