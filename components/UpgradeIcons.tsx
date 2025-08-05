

import React from 'react';

// Simplified line-art icons for better performance and a consistent look.
const icons: Record<string, React.FC> = {
  spark: () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.953 2.05a.75.75 0 01.094 1.056l-1.5 2.25a.75.75 0 00.655 1.144h2.502a.75.75 0 01.655 1.144l-1.5 2.25a.75.75 0 01-1.09 0l-1.5-2.25a.75.75 0 00-.655-1.144H4.5a.75.75 0 01-.655-1.144l1.5-2.25a.75.75 0 011.09 0l1.5 2.25a.75.75 0 00.655 1.144h2.502a.75.75 0 01.655-1.144l1.5-2.25a.75.75 0 011.09 0l1.5 2.25a.75.75 0 00.655 1.144h2.502a.75.75 0 01.655 1.144l-1.5 2.25a.75.75 0 01-1.09 0l-1.5-2.25a.75.75 0 00-.655-1.144H13.5a.75.75 0 01-.655-1.144l1.5-2.25a.75.75 0 011.09 0z" />
    </svg>
  ),
  cosmic_microwave_background: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.25a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM15 15.75a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM15.75 10.5a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM8.25 15a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01z" />
    </svg>
  ),
  protostar: () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  nucleosynthesis: () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5a4.5 4.5 0 11-4.5 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4.5 4.5 0 004.5-4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4.5 4.5 0 014.5 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
  ),
  supernova: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 16.5v-2.25M6.346 17.654l1.59-1.59M17.654 6.346l-1.59 1.59M3 12h2.25m16.5 0H18.75M6.346 6.346l1.59 1.59M17.654 17.654l-1.59-1.59m-3.004-9.352a3.75 3.75 0 015.304 0 3.75 3.75 0 010 5.304 3.75 3.75 0 01-5.304 0 3.75 3.75 0 010-5.304z" />
    </svg>
  ),
  protoplanetary_disk: () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3.75 0a3.75 3.75 0 107.5 0 3.75 3.75 0 10-7.5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18" />
    </svg>
  ),
  planetary_accretion: () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h1.5v1.5h-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 15h1.5v1.5h-1.5z" />
    </svg>
  ),
  cometary_impact: () => (
     <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 12.5l7-7m-4-1l7-1 1 7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 15.5a.5.5 0 100-1 .5.5 0 000 1z" />
    </svg>
  ),
  abiogenesis: () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9.75l-4.5 3m4.5-3l4.5 3m-4.5 3l1.5 3" />
    </svg>
  ),
  atp: () => (
     <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  rna: () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75c0 4.5 3.75 9 3.75 9s3.75 4.5 3.75 9M18 3.75c0 4.5-3.75 9-3.75 9s-3.75 4.5-3.75 9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25h16.5" />
    </svg>
  ),
  protocell: () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  volcano: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12.75L12 3.75l8.25 9m-16.5 0h16.5m-16.5 0l3.75 3.75h9l3.75-3.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V6.75zm3.75 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V6.75z" />
    </svg>
  ),
  glycolysis: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 14.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.025 12.225L9 8.25m5.25 3.975L15 8.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75L9 8.25" />
    </svg>
  ),
  dna: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9h15M4.5 15h15" />
    </svg>
  ),
  // New Planetary & Biological Icons from previous step
  ozone_layer: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.53 7.47a12.002 12.002 0 0116.94 0" />
    </svg>
  ),
  magnetic_field: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10" />
    </svg>
  ),
  first_oceans: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 15.75c-1.5-1-3.5-1.5-4.5-1.5s-3 .5-4.5 1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75c-1.5-1-3.5-1.5-4.5-1.5s-3 .5-4.5 1.5" />
    </svg>
  ),
  moon_formation: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a5 5 0 100-10 5 5 0 000 10z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 5.5a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z" />
    </svg>
  ),
  photosynthesis: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m6.364 1.636l-.707.707M21 12h-1m-1.636 6.364l-.707-.707M12 21v-1m-6.364-1.636l.707-.707M3 12h1m1.636-6.364l.707.707" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6.5" />
    </svg>
  ),
  multicellularity: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="15.5" cy="13.5" r="1.5" />
      <circle cx="15.5" cy="10.5" r="1.5" />
      <circle cx="12" cy="9" r="1.5" />
      <circle cx="8.5" cy="10.5" r="1.5" />
      <circle cx="8.5" cy="13.5" r="1.5" />
    </svg>
  ),
  endosymbiosis: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  cambrian_explosion: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75l1.5 1.5-1.5 1.5-1.5-1.5 1.5-1.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12l1.5-1.5 1.5 1.5-1.5 1.5-1.5-1.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 12l-1.5-1.5-1.5 1.5 1.5 1.5 1.5-1.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-1.5-1.5 1.5-1.5 1.5 1.5-1.5 1.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l3.75-3.75m0 7.5L12 12m-3.75 3.75L12 12m-3.75-7.5L12 12" />
    </svg>
  ),
  nervous_system: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v6m0 8v6m-6-8h-4l-2-2 2-2h4m6 0h4l2 2-2 2h-4" />
    </svg>
  ),
  extinction_event: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15" />
    </svg>
  ),
  agb_star: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-6 0a6 6 0 1012 0 6 6 0 10-12 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0" />
    </svg>
  ),
  kuiper_belt: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-2.25 0a2.25 2.25 0 104.5 0 2.25 2.25 0 10-4.5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
  ),
  dark_matter: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeDasharray="4 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25h.008v.008H12v-.008z" />
    </svg>
  ),
  galaxy_formation: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5c-2.344 0-4.42 1.154-5.66 2.924M12 7.5v2.876M12 7.5c2.344 0 4.42 1.154 5.66 2.924M12 16.5c2.344 0 4.42-1.154 5.66-2.924M12 16.5v-2.876M12 16.5c-2.344 0-4.42-1.154-5.66-2.924" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.34 13.576C4.855 12.38 4.5 10.364 4.5 7.5 4.5 4.903 5.96 3 8.25 3c2.29 0 3.75 1.903 3.75 4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.66 10.424C19.145 11.62 19.5 13.636 19.5 16.5c0 2.597-1.46 4.5-3.75 4.5-2.29 0-3.75-1.903-3.75-4.5" />
    </svg>
  ),
  neutron_star_collision: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75c0 1.036-.84 1.875-1.875 1.875S4.5 7.786 4.5 6.75 5.34 4.875 6.375 4.875 8.25 5.714 8.25 6.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 17.25c0 1.036-.84 1.875-1.875 1.875s-1.875-.84-1.875-1.875.84-1.875 1.875-1.875 1.875.84 1.875 1.875z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 9.375l10.5 5.25m-10.5-5.25L9 3m3.75 11.625L21.75 9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l-3.375-3.375M12 3l3.375 3.375" />
    </svg>
  ),
  star_cluster: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l.966 2.338a.563.563 0 00.475.345h2.46a.563.563 0 01.329.958l-1.996 1.45a.563.563 0 00-.182.635l.756 2.268a.563.563 0 01-.844.622l-2.07-1.516a.563.563 0 00-.664 0l-2.07 1.516a.563.563 0 01-.844-.622l.756-2.268a.563.563 0 00-.182-.635L6.2 7.14a.563.563 0 01.329-.958h2.46a.563.563 0 00.475-.345l.966-2.338z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18a.5.5 0 01.5-.5h.5a.5.5 0 010 1H6.5A.5.5 0 016 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 16a.5.5 0 01.5-.5h.5a.5.5 0 010 1h-.5a.5.5 0 01-.5-.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a.5.5 0 01.5-.5h.5a.5.5 0 010 1h-.5a.5.5 0 01-.5-.5z" />
    </svg>
  ),
  planetary_differentiation: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-6 0a6 6 0 1012 0 6 6 0 10-12 0" />
    </svg>
  ),
  plate_tectonics: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21c-4.14-1.55-7-5.4-7-9.94" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.07c4.46 1.58 7.5 5.8 7.5 10.43" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 12l-5 1.5" />
    </svg>
  ),
  eukaryotic_cell: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 13.5h.01" />
    </svg>
  ),
  singularity: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-6 0a6 6 0 1012 0 6 6 0 10-12 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0" />
    </svg>
  ),
  hive_mind: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v6m0 8v6m-6-8h-4l-2-2 2-2h4m6 0h4l2 2-2 2h-4" />
    </svg>
  ),
  default: () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  ),
};

export const UpgradeIcon: React.FC<{ iconId: string }> = ({ iconId }) => {
  const IconComponent = icons[iconId] || icons.default;
  return <IconComponent />;
};