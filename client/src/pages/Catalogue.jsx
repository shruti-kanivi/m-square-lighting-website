import React, { useEffect, useMemo, useState } from 'react';
import SEO from '../components/SEO';

const Catalogue = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [q, setQ] = useState('');
  const [wattage, setWattage] = useState('all');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/catalogue.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load catalogue.json (${res.status})`);
        const data = await res.json();
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError('Catalogue data not found. Please run: npm run generate:catalogue');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const wattageOptions = useMemo(() => {
    const set = new Set();
    items.forEach(i => { if (i.WATTAGE && i.WATTAGE !== 'NA') set.add(String(i.WATTAGE).trim()); });
    return ['all', ...Array.from(set).sort((a,b)=>a.localeCompare(b, undefined, { numeric: true }))];
  }, [items]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return items.filter(i => {
      const okW = wattage === 'all' || String(i.WATTAGE).trim() === wattage;
      const hay = [i.MODEL, i.MODEL_NUMBER, i.WATTAGE, i.DIAMETER, i.HEIGHT, i.CUTOUT]
        .filter(Boolean)
        .map(String)
        .join(' ')
        .toLowerCase();
      return okW && (!ql || hay.includes(ql));
    });
  }, [items, q, wattage]);

  return (
    <>
      <SEO 
        title="Catalogue - M Square Lighting | Product Dimensions"
        description="Browse models with images, wattage, diameter, height, and cutout details."
        keywords="lighting catalogue, downlight dimensions, LED wattage, cutout size, diameter, height"
      />
      <div className="catalogue">
        <div className="container">
          <h1>Product Catalogue</h1>
          <p className="catalogue-intro">
            Browse our complete range of lighting products with detailed specifications and images.
          </p>

          <div className="catalogue-filters">
            <input 
              type="text" 
              placeholder="Search by model, wattage, dimensions..." 
              value={q} 
              onChange={e=>setQ(e.target.value)}
              className="catalogue-search"
            />
            <select value={wattage} onChange={e=>setWattage(e.target.value)} className="catalogue-select">
              {wattageOptions.map(opt => (
                <option key={opt} value={opt}>{opt === 'all' ? 'All Wattages' : `${opt} Wattage`}</option>
              ))}
            </select>
          </div>

          {loading && <p className="loading-message">Loading catalogue...</p>}
          {error && !loading && <p className="error-message">{error}</p>}

          {!loading && !error && (
            <>
              <div className="catalogue-stats">
                Showing {filtered.length} of {items.length} models
              </div>
              
              <div className="catalogue-table-wrapper">
                <table className="catalogue-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Model Name</th>
                      <th>Wattage</th>
                      <th>Diameter</th>
                      <th>Height</th>
                      <th>Cutout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, idx) => {
                      const imgSrc = item.IMAGE_URL || (item.IMAGE_NAME ? `/catalogue-images/${item.IMAGE_NAME}` : undefined);
                      return (
                        <tr key={idx}>
                          <td className="image-cell">
                            {imgSrc ? (
                              <img src={imgSrc} alt={item.MODEL || 'Model'} className="catalogue-img" />
                            ) : (
                              <div className="image-placeholder">No Image</div>
                            )}
                          </td>
                          <td className="model-cell">
                            <strong>{item.MODEL || 'N/A'}</strong>
                          </td>
                          <td>{item.WATTAGE || '-'}</td>
                          <td>{item.DIAMETER || '-'}</td>
                          <td>{item.HEIGHT || '-'}</td>
                          <td>{item.CUTOUT || '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filtered.length === 0 && (
                <div className="no-results">
                  <p>No models found matching your search criteria.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Catalogue;
