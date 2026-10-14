import { INDIA_STATES, REGIONS, type Region } from '@ghoomyaar/shared';

export function listStates(query = '', region?: string) {
  const nameQuery = query.trim().toLowerCase();
  const filterRegion: Region | undefined = REGIONS.find(value => value === region);
  return INDIA_STATES.filter(item =>
    (!nameQuery || item.name.toLowerCase().includes(nameQuery)) &&
    (!region || (filterRegion && item.region === filterRegion))
  );
}