// Placeholder provider data. Real DentaQuest scrape pending — see DATA.md.
// Each provider must be marked clearly as a sample listing until verified.
// Shape: { id, name, practice, address, locality, zip, phone, acceptingNew }
export const placeholderProviders = [
  {
    id: 'sample-1',
    name: 'Sample Practice A',
    practice: 'Family Dental Group',
    address: '123 Main Street, Suite 200',
    locality: 'Leesburg',
    zip: '20176',
    phone: '(703) 555-0101',
    acceptingNew: true,
  },
  {
    id: 'sample-2',
    name: 'Sample Practice B',
    practice: 'Community Dental Associates',
    address: '456 Loudoun Avenue',
    locality: 'Sterling',
    zip: '20164',
    phone: '(703) 555-0102',
    acceptingNew: false,
  },
  {
    id: 'sample-3',
    name: 'Sample Practice C',
    practice: 'Pediatric & Family Dentistry',
    address: '789 Pacific Boulevard',
    locality: 'Ashburn',
    zip: '20147',
    phone: '(571) 555-0103',
    acceptingNew: true,
  },
  {
    id: 'sample-4',
    name: 'Sample Practice D',
    practice: 'Smiles Dental',
    address: '12 East Market Street',
    locality: 'Leesburg',
    zip: '20176',
    phone: '(703) 555-0104',
    acceptingNew: true,
  },
  {
    id: 'sample-5',
    name: 'Sample Practice E',
    practice: 'Premier Dental Center',
    address: '350 Edwards Ferry Road',
    locality: 'Leesburg',
    zip: '20176',
    phone: '(703) 555-0105',
    acceptingNew: false,
  },
  {
    id: 'sample-6',
    name: 'Sample Practice F',
    practice: 'Loudoun Community Health Center · Dental',
    address: '224 Cornwall Street NW',
    locality: 'Leesburg',
    zip: '20176',
    phone: '(703) 779-5400',
    acceptingNew: true,
  },
]

// Quick search by ZIP prefix or exact match. Real version will use geocoding
// + radius search; for placeholder we just match the ZIP string.
export function searchProviders(query) {
  const q = (query || '').trim()
  if (!q) return []
  return placeholderProviders.filter(
    (p) =>
      p.zip.startsWith(q) ||
      p.locality.toLowerCase().includes(q.toLowerCase()),
  )
}
