import { useEffect, useState } from 'react';
import { REGIONS, type StateOrUT } from '@ghoomyaar/shared';
import { apiRequest } from '../../../lib/api/client';

export function ExplorePage() {
  const [q, setQ] = useState('');
  const [region, setRegion] = useState('');
  const [data, setData] = useState<StateOrUT[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let current = true;
    const ctrl = new AbortController();
    setLoading(true); setError('');
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (region) params.set('region', region);
    const url = `/states${params.size ? `?${params.toString()}` : ''}`;
    apiRequest<{ data: StateOrUT[]; total: number }>(url, { signal: ctrl.signal })
      .then(result => { if (current) setData(result.data); })
      .catch(err => { if (current && !ctrl.signal.aborted) setError(err instanceof Error ? err.message : 'Unable to load destinations'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; ctrl.abort(); };
  }, [q, region]);
  return <section className="container section explore-page"><div className="section-heading"><span className="eyebrow">Begin your journey</span><h1>Explore India</h1><p>Start with any of India's 28 states and 8 union territories. Destination-level content arrives in Phase 2.</p></div>
    <div className="filterbar"><label><span>Search state or UT</span><input value={q} onChange={e => setQ(e.target.value)} placeholder="Try Kerala, Sikkim, Goa…" /></label><label><span>Travel region</span><select value={region} onChange={e => setRegion(e.target.value)}><option value="">All regions</option>{REGIONS.map(item => <option key={item}>{item}</option>)}</select></label></div>
    <div className="results-heading"><h2>Places to explore</h2><span>{loading ? 'Loading…' : `${data.length} locations`}</span></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {!loading && !error && data.length === 0 && <p>No matching locations. Try a different search.</p>}
    <div className="states-grid">{data.map(item => <article key={item.name} className="state-card"><span className="state-icon">⌖</span><strong>{item.name}</strong><small>{item.region}</small><span className="state-kind">{item.kind === 'state' ? 'State' : 'Union Territory'}</span></article>)}</div>
  </section>;
}