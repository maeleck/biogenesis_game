

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
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
  ),
  kuiper_belt: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-2.25 0a2.25 2.25 0 104.5 0 2.25 2.25 0 10-4.5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0" strokeDasharray="4 4"/>
        <circle cx="4.5" cy="4.5" r="0.75" />
        <circle cx="19.5" cy="19.5" r="0.75" />
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.34 13.576C4.855 12.38 4.5 10.364 4.5 7.5 4.5 4.903 5.96 3 8.25 3c2.29 0 3.75 1.903 3.75 4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.66 10.424C19.145 11.62 19.5 13.636 19.5 16.5c0 2.597-1.46 4.5-3.75 4.5-2.29 0-3.75-1.903-3.75-4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    </svg>
  ),
  neutron_star_collision: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75l7.5 10.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75l-7.5 10.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l6-8.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-6 8.25" />
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.53 7.47a9 9 0 0110.01-4.72" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.54 2.75a9 9 0 018.04 8.04" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.42 13.12a9.004 9.004 0 0114.24-5.65" />
    </svg>
  ),
  late_heavy_bombardment: () => (
     <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l3-3m-1-1l-1 4 4-1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l3-3m-1-1l-1 4 4-1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6l-3 3m1-1l4 1-1 4" />
    </svg>
  ),
  magnetosphere: () => (
     <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path d="M12 2.1c3.22 0 6.13 1.48 8 3.73a14.88 14.88 0 000 12.34C18.13 20.42 15.22 21.9 12 21.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2.1c-3.22 0-6.13 1.48-8 3.73a14.88 14.88 0 000 12.34C5.87 20.42 8.78 21.9 12 21.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  tide_pools: () => (
     <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.5c1.5-1 3.5-1.5 4.5-1.5s3 .5 4.5 1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 10.5a.5.5 0 010 1 .5.5 0 010-1z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 11.5a.5.5 0 010 1 .5.5 0 010-1z" />
    </svg>
  ),
  banded_iron_formations: () => (
     <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 13.5h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 16.5h15" />
    </svg>
  ),
  continental_crust: () => (
     <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 9.75h16.5M3.75 12.75h16.5M3.75 15.75h16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.75C7.5 9 7.5 15 5.25 15.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 6.75c-2.25 2.25-2.25 6.75 0 9" />
    </svg>
  ),
  snowball_earth: () => (
     <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636l12.728 12.728M5.636 18.364L18.364 5.636" />
    </svg>
  ),
  hadean_eon: () => (
     <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.5c-2.02.94-3.5 3.06-3.5 5.5s1.48 4.56 3.5 5.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.25c-3.31 0-6 2.69-6 6s2.69 6 6 6" />
    </svg>
  ),
  archean_eon: () => (
     <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <circle cx="9" cy="10" r="1" />
      <circle cx="15" cy="14" r="1" />
      <circle cx="10" cy="15" r="1" />
    </svg>
  ),
  protein_folding: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75c0 .92.68 1.68 1.55 1.94l1.32.44a1.8 1.8 0 011.2 1.94l-.44 1.32a1.8 1.8 0 001.94 1.2l1.32-.44c.92-.3 1.94.38 1.94 1.2l-.44 1.32a1.8 1.8 0 001.2 1.94l1.32.44c.87.29 1.55 1.02 1.55 1.94" />
    </svg>
  ),
  ribosomes: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a6 6 0 00-6 6" />
    </svg>
  ),
  heat_shock_proteins: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a6 6 0 01-6 6" />
    </svg>
  ),
  green_fluorescent_protein: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 12a6 6 0 106 6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l-1.5 1.5M15 8.25l1.5-1.5" />
    </svg>
  ),
  dna_repair: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9h15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-1.5 1.5h3L12 15z" />
    </svg>
  ),
  transcription_factors: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a3 3 0 01-3 3m0 0a3 3 0 01-3 3m-3 0a3 3 0 01-3-3m0 0a3 3 0 01-3-3m-3 0a3 3 0 013-3m0 0a3 3 0 013 3m3 0a3 3 0 01-3 3" />
    </svg>
  ),
  p53_protein: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-4 0a4 4 0 108 0 4 4 0 10-8 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v-2M4 12H2m20 0h-2M6.34 6.34L4.93 4.93m14.14 14.14l-1.41-1.41M17.66 6.34L19.07 4.93m-14.14 14.14l1.41-1.41" />
    </svg>
  ),
  eukaryotic_cell: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
  ),
  circulatory_system: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25H6m-2.25 0H3M16.5 8.25h1.5m2.25 0h.75" />
    </svg>
  ),
  exoskeleton: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.793V12a9 9 0 10-9 9h.793m1.11-4.717a4.5 4.5 0 01-6.364-6.364M14.25 12a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    </svg>
  ),
  endoskeleton: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v10.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.75h13.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 17.25h13.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75l-4.125 4.125M12 6.75l4.125 4.125" />
    </svg>
  ),
  hive_mind: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m-9-9h2m14 0h2" />
    </svg>
  ),
  prokaryotic_cell: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm0 3a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" />
    </svg>
  ),
  horizontal_gene_transfer: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m6 0l-2-2m2 2l-2 2" />
    </svg>
  ),
  transposons: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9h5.25m4.5 0H19.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9V7.5l-1.5 1.5 1.5 1.5V9z" />
    </svg>
  ),
  epigenetics: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9h15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  ),
  rna_interference: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75c0 4.5 3.75 9 3.75 9s3.75 4.5 3.75 9M18 3.75c0 4.5-3.75 9-3.75 9s-3.75 4.5-3.75 9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5M3.75 14.25h16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L9.75 14.25" />
    </svg>
  ),
  crispr_cas9: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9h15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12l3-3m-3 0l3 3" />
    </svg>
  ),
  krebs_cycle: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25V12l2.25 2.25M12 8.25A3.75 3.75 0 008.25 12H12" />
    </svg>
  ),
  homeostasis: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h6m-3-3v6" />
    </svg>
  ),
  adaptive_immunity: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  sexual_reproduction: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21M10.5 10.5H3M10.5 10.5C10.5 12.4853 8.98528 14 7.00001 14C5.01472 14 3.5 12.4853 3.5 10.5C3.5 8.51472 5.01472 7 7.00001 7C8.98528 7 10.5 8.51472 10.5 10.5ZM13.5 10.5C13.5 12.4853 15.0147 14 17 14C18.9853 14 20.5 12.4853 20.5 10.5C20.5 8.51472 18.9853 7 17 7C15.0147 7 13.5 8.51472 13.5 10.5Z" />
    </svg>
  ),
  hox_genes: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.75v10.5" />
    </svg>
  ),
  evolution_of_vision: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639l4.43-8.86a1 1 0 011.632 0l4.43 8.86a1 1 0 010 .639l-4.43 8.86a1 1 0 01-1.632 0l-4.43-8.86z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.036 12.322a1.012 1.012 0 010-.639l4.43-8.86a1 1 0 011.632 0l4.43 8.86a1 1 0 010 .639l-4.43 8.86a1 1 0 01-1.632 0l-4.43-8.86z" />
    </svg>
  ),
  cephalization: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9a2.5 2.5 0 115 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v3m-4-3v3m8-3v3" />
    </svg>
  ),
  telomere_maintenance: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H4.5m15 0h-3M7.5 20.25H4.5m15 0h-3" />
    </svg>
  ),
  telomerase_enzyme: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75v16.5M15 3.75v16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75h2.25m1.5 0H15m-6 16.5h2.25m1.5 0H15" />
    </svg>
  ),
  antioxidant_defense: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
  ),
  lipid_metabolism: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5V12m0 1.5V15m-1.5 1.5h3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm0 4.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" />
    </svg>
  ),
  glycogen_storage: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l2.121 2.121m-4.242 0L12 12m0-4.242L9.879 9.879m4.242 0L12 12" />
    </svg>
  ),
  evolution_of_lungs: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-6 0a6 6 0 1012 0 6 6 0 10-12 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6a8 8 0 00-8 8h16a8 8 0 00-8-8z" />
    </svg>
  ),
  cellular_homeostasis: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l3.75-3.75M12 12l-3.75 3.75" />
    </svg>
  ),
  circadian_rhythm: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
  ),
  aquaporins: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.75a3 3 0 11-6 0m6 4.5a3 3 0 11-6 0" />
    </svg>
  ),
  histone_gene_regulation: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75v16.5M15 3.75v16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.75a2.25 2.25 0 014.5 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25a2.25 2.25 0 004.5 0" />
    </svg>
  ),
  actin_cytoskeleton: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75l16.5 16.5m-16.5 0L20.25 3.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
    </svg>
  ),
  myosin_motors: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 9.75l1.5-1.5 1.5 1.5m6 3l1.5 1.5 1.5-1.5" />
    </svg>
  ),
  opsin_proteins: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75s2.5-4.5 9.75-4.5 9.75 4.5 9.75 4.5" />
    </svg>
  ),
  hemoglobin: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75a2.25 2.25 0 013 0m-3 4.5a2.25 2.25 0 003 0m-6.75-2.25a2.25 2.25 0 010-3m4.5 3a2.25 2.25 0 000-3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-1.5 0a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0" />
    </svg>
  ),
  collagen_synthesis: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75c0 4.5 3.75 9 3.75 9s3.75 4.5 3.75 9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.75c0 4.5 3.75 9 3.75 9s3.75 4.5 3.75 9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3.75c0 4.5 3.75 9 3.75 9s3.75 4.5 3.75 9" />
    </svg>
  ),
  vibration_sensing: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5L4.5 12l7.5-7.5" />
    </svg>
  ),
  chemosensation: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15h.01" />
    </svg>
  ),
  liposomes: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
  ),
  myelination: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5" />
      <rect x="7" y="10.5" width="2" height="3" rx="1" />
      <rect x="11" y="10.5" width="2" height="3" rx="1" />
      <rect x="15" y="10.5" width="2" height="3" rx="1" />
    </svg>
  ),
  neural_crest_cells: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3.75 0a3.75 3.75 0 107.5 0 3.75 3.75 0 10-7.5 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25V6m0 12v-2.25m4.95-4.95H18m-12 0H6m4.95-4.95L8.46 4.8m7.08 7.08l1.49 1.49m-8.57-8.57L4.8 8.46m8.57 8.57l-1.49 1.49" />
    </svg>
  ),
  blood_clotting: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 5L4.5 8.5 10 12m4-7l5.5 3.5L14 12m-4 7v-5m4 5v-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10.5l4.5 2.5 4.5-2.5" />
    </svg>
  ),
  singularity: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-2.25 0a2.25 2.25 0 104.5 0 2.25 2.25 0 10-4.5 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5L12 12m0 0L7.5 7.5m4.5 4.5l-4.5 4.5m4.5-4.5l4.5 4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m-9-9h2m14 0h2" />
    </svg>
  ),
  interstellar_medium: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" strokeDasharray="2 2" />
      <circle cx="5.25" cy="5.25" r=".75" />
      <circle cx="18.75" cy="18.75" r=".75" />
      <circle cx="15" cy="8" r=".75" />
    </svg>
  ),
  planetary_nebula: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0" strokeDasharray="4 4"/>
    </svg>
  ),
  gravitational_lensing: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <circle cx="12" cy="12" r="1.5" />
      <path d="M3.52,15.22A9,9,0,0,1,12,4.5a9,9,0,0,1,8.48,10.72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
      <path d="M6.5,18.5S9,15,12,15s5.5,3.5,5.5,3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  reionization: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m6.364 1.636l-.707.707M21 12h-1m-1.636 6.364l-.707-.707M12 21v-1m-6.364-1.636l.707-.707M3 12h1m1.636-6.364l.707.707" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" strokeDasharray="2 2"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    </svg>
  ),
  black_hole: () => (
    <svg fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none">
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"/>
        <path d="M12,7a5,5,0,0,0-5,5,1,1,0,0,0,2,0,3,3,0,0,1,3-3,1,1,0,0,0,0-2Z"/>
    </svg>
  ),
  quasar: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-2.25 0a2.25 2.25 0 104.5 0 2.25 2.25 0 10-4.5 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L12 7M12 17L12 21" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12L7 12M17 12L21 12" />
    </svg>
  ),
  dark_energy: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l4-4m-4 4l4 4m14-4l-4-4m4 4l-4 4" />
    </svg>
  ),
  cosmic_web: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.25l7.5 4.5 7.5-4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18.75l7.5-4.5 7.5 4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v4.5" />
      <circle cx="4.5" cy="5.25" r="1.5" />
      <circle cx="19.5" cy="5.25" r="1.5" />
      <circle cx="4.5" cy="18.75" r="1.5" />
      <circle cx="19.5" cy="18.75" r="1.5" />
    </svg>
  ),
  galactic_merger: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.09,14.28A7.5,7.5,0,1,0,9.72,6.09" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.91,9.72A7.5,7.5,0,1,0,14.28,17.91" />
    </svg>
  ),
  population_iii_stars: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.502 2.873c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
    </svg>
  ),
  bacteriophage: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25l-2.25 2.25m0-4.5l2.25 2.25m4.5 0l2.25-2.25m0 4.5l-2.25-2.25M12 6.75l-2.25 2.25m0-4.5l2.25 2.25m4.5 0l2.25-2.25m0 4.5l-2.25-2.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25V6.75" />
    </svg>
  ),
  bacterium: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a4.5 4.5 0 01-4.5-4.5v-1.5a4.5 4.5 0 019 0v1.5a4.5 4.5 0 01-4.5 4.5z" />
    </svg>
  ),
  bacterium_strep: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <circle cx="8" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
    </svg>
  ),
  virus_influenza: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m-9-9h2m14 0h2m-2.929-7.071l-1.414 1.414m11.314 11.314l-1.414-1.414m0-11.314l1.414 1.414m-11.314 11.314l-1.414-1.414" />
    </svg>
  ),
   bacterium_ecoli: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a4.5 4.5 0 01-4.5-4.5v-1.5a4.5 4.5 0 019 0v1.5a4.5 4.5 0 01-4.5 4.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 6.75L3 4.5M16.5 6.75l4.5-2.25M7.5 17.25L3 19.5" />
    </svg>
  ),
  virus_hiv: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5l3 3m0-3l-3 3" />
    </svg>
  ),
  amoeba_proteus: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 11-9-9c0 1.44.34 2.8.95 4.02.34.68.88 1.29 1.5 1.8.6.5 1.25.83 2 1 .74.17 1.5.18 2.25.08 1.5-.2 2.5-1.12 3.5-2.4.5-.64 1-1.28 1.5-1.9.5-.63 1-1.27 1.5-1.9.75-.93 1.5-1.5 2.5-1.5s2 .75 2 2.25-.5 3.75-1.5 4.5-2.5 1-3.5 1h-3z" />
    </svg>
  ),
  c_elegans: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12C3.75 9.25 6.25 5 12 5s8.25 4.25 8.25 7-2.75 4-8.25 4S3.75 14.75 3.75 12z" />
    </svg>
  ),
  tardigrade: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5V12m0 1.5V15m3.75-4.5V12m0 1.5V15m3.75-4.5V12m0 1.5V15M4.5 9.75h15A2.25 2.25 0 0121.75 12v0a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 12v0A2.25 2.25 0 014.5 9.75z" />
    </svg>
  ),
  d_radiodurans: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <circle cx="9" cy="9" r="2.25" />
      <circle cx="15" cy="9" r="2.25" />
      <circle cx="9" cy="15" r="2.25" />
      <circle cx="15" cy="15" r="2.25" />
    </svg>
  ),
};

export const UpgradeIcon: React.FC<{ iconId: string }> = ({ iconId }) => {
  const IconComponent = icons[iconId] || icons.spark; // Default to spark icon
  return <IconComponent />;
};
