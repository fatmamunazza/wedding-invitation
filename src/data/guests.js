// Add/edit guests here. The UI never depends directly on this object;
// guestResolver.js is the boundary that can later be replaced by an API.
export const guests = {
  abc123: {
    name: 'Ali & Family',
    events: ['haldi', 'baraat']
  },
  xyz456: {
    name: 'Fatima & Family',
    events: ['baraat']
  },
  ayesha: {
    name: 'Ayesha & Family',
    events: ['haldi']
  }
};
