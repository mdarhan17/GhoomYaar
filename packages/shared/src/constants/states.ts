export const REGIONS = [
  'North India', 'South India', 'East India', 'West India',
  'Northeast India', 'Central India',
] as const;

export type Region = (typeof REGIONS)[number];
export type StateOrUT = Readonly<{ name: string; region: Region; kind: 'state' | 'union-territory' }>;

// Geographic groupings are navigation labels, not administrative subdivisions.
export const INDIA_STATES: readonly StateOrUT[] = [
  { name: 'Andhra Pradesh', region: 'South India', kind: 'state' },
  { name: 'Arunachal Pradesh', region: 'Northeast India', kind: 'state' },
  { name: 'Assam', region: 'Northeast India', kind: 'state' },
  { name: 'Bihar', region: 'East India', kind: 'state' },
  { name: 'Chhattisgarh', region: 'Central India', kind: 'state' },
  { name: 'Goa', region: 'West India', kind: 'state' },
  { name: 'Gujarat', region: 'West India', kind: 'state' },
  { name: 'Haryana', region: 'North India', kind: 'state' },
  { name: 'Himachal Pradesh', region: 'North India', kind: 'state' },
  { name: 'Jharkhand', region: 'East India', kind: 'state' },
  { name: 'Karnataka', region: 'South India', kind: 'state' },
  { name: 'Kerala', region: 'South India', kind: 'state' },
  { name: 'Madhya Pradesh', region: 'Central India', kind: 'state' },
  { name: 'Maharashtra', region: 'West India', kind: 'state' },
  { name: 'Manipur', region: 'Northeast India', kind: 'state' },
  { name: 'Meghalaya', region: 'Northeast India', kind: 'state' },
  { name: 'Mizoram', region: 'Northeast India', kind: 'state' },
  { name: 'Nagaland', region: 'Northeast India', kind: 'state' },
  { name: 'Odisha', region: 'East India', kind: 'state' },
  { name: 'Punjab', region: 'North India', kind: 'state' },
  { name: 'Rajasthan', region: 'North India', kind: 'state' },
  { name: 'Sikkim', region: 'Northeast India', kind: 'state' },
  { name: 'Tamil Nadu', region: 'South India', kind: 'state' },
  { name: 'Telangana', region: 'South India', kind: 'state' },
  { name: 'Tripura', region: 'Northeast India', kind: 'state' },
  { name: 'Uttar Pradesh', region: 'North India', kind: 'state' },
  { name: 'Uttarakhand', region: 'North India', kind: 'state' },
  { name: 'West Bengal', region: 'East India', kind: 'state' },
  { name: 'Andaman and Nicobar Islands', region: 'East India', kind: 'union-territory' },
  { name: 'Chandigarh', region: 'North India', kind: 'union-territory' },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', region: 'West India', kind: 'union-territory' },
  { name: 'Delhi', region: 'North India', kind: 'union-territory' },
  { name: 'Jammu and Kashmir', region: 'North India', kind: 'union-territory' },
  { name: 'Ladakh', region: 'North India', kind: 'union-territory' },
  { name: 'Lakshadweep', region: 'South India', kind: 'union-territory' },
  { name: 'Puducherry', region: 'South India', kind: 'union-territory' },
];