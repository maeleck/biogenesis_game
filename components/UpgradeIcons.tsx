

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
        <path d="M12,12 A3,3 0 0,1 9,15 A3,3 0 0,1 6,12 A3,3 0 0,1 9,9 A3,3 0 0,1 12,12" />
        <path d="M12,12 A5,5 0 0,1 7,17 A5,5 0 0,1 2,12 A5,5 0 0,1 7,7 A5,5 0 0,1 12,12" strokeDasharray="3 3" />
    </svg>
  ),
  hive_mind: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m-8-9H2m20 0h-2m-2.93-5.07l-1.414-1.414M5.64 18.36l-1.414-1.414m14.14-11.314l-1.414 1.414M5.64 5.64l-1.414 1.414" />
    </svg>
  ),
  interstellar_medium: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-.07.042m15.482 0l.07.042" />
      </svg>
  ),
  planetary_nebula: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m-7.07-7.07l1.414 1.414m11.314-11.314l-1.414 1.414m-11.314 0l1.414-1.414m11.314 11.314l-1.414-1.414" />
      </svg>
  ),
  gravitational_lensing: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2,8 C6,16 18,16 22,8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2,16 C6,8 18,8 22,16" strokeDasharray="3 3" />
      </svg>
  ),
  reionization: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <circle cx="12" cy="12" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 12v4m-8-9H2m20 0h-2m-3.9-3.9L4.2 4.2m15.6 15.6L15.9 15.9m0-7.8L4.2 19.8m15.6-15.6L8.1 8.1" />
      </svg>
  ),
  black_hole: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path d="M12,12 m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0" fill="currentColor" stroke="none" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 12a5 5 0 11-10 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12a7 7 0 11-14 0" />
      </svg>
  ),
  quasar: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path d="M12,12 m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0" fill="currentColor" stroke="none" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L22 2m-10 10L2 22M12 12L22 22M12 12L2 2" />
      </svg>
  ),
  dark_energy: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8V6a2 2 0 012-2h2M3 16v2a2 2 0 002 2h2m8 0h2a2 2 0 002-2v-2m0-8V6a2 2 0 00-2-2h-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4L5 8m10-4l4 4M9 20l-4-4m10 4l4-4" />
      </svg>
  ),
  cosmic_web: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <circle cx="5" cy="5" r="1.5" />
        <circle cx="19" cy="4" r="1.5" />
        <circle cx="6" cy="18" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5l6 6m1-7l-1 7m7-6l-6 6m-1 7l1-7m-6 6l-1-12m13-1l-7 13" />
      </svg>
  ),
  galactic_merger: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 12a8 8 0 00-4.8 1.6M14 12a8 8 0 014.8 1.6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6a4 4 0 00-2.4.8M12 6a4 4 0 012.4.8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9.5a6 6 0 00-2.5 1.5M16 9.5a6 6 0 012.5 1.5" />
      </svg>
  ),
  population_iii_stars: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L10 8h4l-2 6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 10l-2 6h4l-2-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 10l-2 6h4l-2-6" />
      </svg>
  ),
  late_heavy_bombardment: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 10a1 1 0 100-2 1 1 0 000 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 15a1 1 0 100-2 1 1 0 000 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-7 8" />
      </svg>
  ),
  magnetosphere: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-4 4-4 8 0 12m0-12c4 4 4 8 0 12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c-4-4-4-8 0-12m0 12c4-4 4-8 0-12" />
      </svg>
  ),
  tide_pools: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10c4-2 8-2 12 0s8 2 8 4H3v-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16a4 4 0 014-4h10a4 4 0 014 4" />
      </svg>
  ),
  banded_iron_formations: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 12h16M4 16h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4L4 8l8 4 8-4-8-4z" />
      </svg>
  ),
  continental_crust: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2 4 4 4-4 4 4 2-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 18l2-2 4 4 4-4 4 4 2-2" />
      </svg>
  ),
  snowball_earth: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 8l-4 4 4 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 8l4 4-4 4" />
      </svg>
  ),
  hadean_eon: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-4-4m4 4l4 4m-4-4l-4 4m4-4l4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 4l-4 8 4 8" />
      </svg>
  ),
  archean_eon: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8" />
      </svg>
  ),
  prokaryotic_cell: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 018-8h0a8 8 0 018 8v0a8 8 0 01-8 8h0a8 8 0 01-8-8v0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12a1 1 0 100-2 1 1 0 000 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
  ),
  horizontal_gene_transfer: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-4-4l4 4-4 4" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
      </svg>
  ),
  transposons: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16h8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V4M12 16v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4h8" />
      </svg>
  ),
  epigenetics: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9h15M4.5 15h15" />
        <circle cx="7" cy="9" r="1" />
        <circle cx="17" cy="15" r="1" />
      </svg>
  ),
  rna_interference: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75c0 4.5 3.75 9 3.75 9s3.75 4.5 3.75 9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l8 8m-8-8l8-8" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
      </svg>
  ),
  krebs_cycle: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 10-9-9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m-6 6l-6 6m6-6L9 9m6 6l6-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
  ),
  homeostasis: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
      </svg>
  ),
  sexual_reproduction: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <circle cx="8" cy="12" r="4" />
        <circle cx="16" cy="12" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l2 2-2 2" />
      </svg>
  ),
  hox_genes: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 12h16M4 16h16" />
        <rect x="6" y="6" width="4" height="12" />
        <rect x="14" y="6" width="4" height="12" />
      </svg>
  ),
  evolution_of_vision: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
  ),
  cephalization: () => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12l4-4m-4 4l4 4" />
        <circle cx="17" cy="12" r="2" />
      </svg>
  ),
  cellular_homeostasis: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l-2 2 2 2m8-4l2 2-2 2" />
    </svg>
  ),
  circadian_rhythm: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
    </svg>
  ),
  telomere_maintenance: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3.75h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 20.25h18" />
    </svg>
  ),
  antioxidant_defense: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-2-2.5-2 2.5 2 2.5 2-2.5z" />
    </svg>
  ),
  lipid_metabolism: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7l3 3-3 3 3 3" />
    </svg>
  ),
  glycogen_storage: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m-9-9.75l-4.5 2.625m18 0l4.5 2.625" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.25L7.5 14.875" />
    </svg>
  ),
  evolution_of_lungs: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12l-3 3m3-3l-3-3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l3 3m-3-3l3-3" />
    </svg>
  ),
  evolution_of_hearing: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 15.75c0-3.32 2.68-6 6-6s6 2.68 6 6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 11.25c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h1m16 0h1" />
    </svg>
  ),
  chemosensation: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V6m0 6l3 3m-3-3l-3 3" />
      <circle cx="6" cy="6" r="1" />
      <circle cx="18" cy="6" r="1" />
      <circle cx="9" cy="9" r="1" />
    </svg>
  ),
  protein_folding: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3C3 9 9 3 9 9s6-6 6 6-6 6-6 6-6-6-6-6" />
    </svg>
  ),
  ribosomes: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <circle cx="10" cy="14" r="4" />
      <circle cx="14" cy="10" r="5" />
    </svg>
  ),
  dna_repair: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9h5m5 0h5M4.5 15h15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9l-1 1.5 1 1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9l1 1.5-1 1.5" />
    </svg>
  ),
  transcription_factors: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9a3 3 0 016 0v6a3 3 0 01-6 0v-6z" />
    </svg>
  ),
  exoskeleton: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M8 8l-2 4 2 4M16 8l2 4-2 4" />
    </svg>
  ),
  endoskeleton: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M8 6h8M8 10h8M8 14h8M8 18h8" />
    </svg>
  ),
  circulatory_system: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.343c2.953-2.953 7.746-2.953 10.7 0 2.953 2.953 2.953 7.746 0 10.7L12 21.343l-10.7-10.3C-1.653 8.089-1.653 3.39.3 1.343c2.953-2.953 7.746-2.953 10.7 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V6h6v3" />
    </svg>
  ),
  adaptive_immunity: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12l-2 3-2-3" />
    </svg>
  ),
  heat_shock_proteins: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l3 3m-3-3l-3 3m3-3V7.5M12 12l-3-3m3 3l3-3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-3 3-3-3" />
    </svg>
  ),
  telomerase_enzyme: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 6h10M7 18h10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h3m7 0h3M4 18h3m7 0h3" />
    </svg>
  ),
  green_fluorescent_protein: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-2 3h4l-2-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m-6-6H3m18 0h-3" />
    </svg>
  ),
  crispr_cas9: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9h15M4.5 15h15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m-4-4l4 4-4 4" />
    </svg>
  ),
  p53_protein: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6m-6 4h6m-3-7v6" />
    </svg>
  ),
  opsins: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      <circle cx="9.5" cy="12" r="1.5" />
      <circle cx="14.5" cy="12" r="1.5" />
    </svg>
  ),
  hemoglobin: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="6" r="1.5" />
      <circle cx="12" cy="18" r="1.5" />
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
    </svg>
  ),
  collagen: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l4 4-4 4m6-8l4 4-4 4m6-8l4 4-4 4" />
    </svg>
  ),
  aquaporins: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12a9 9 0 0118 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v-2a2 2 0 00-4 0v2m4 0v2a2 2 0 01-4 0v-2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l.5 1.5m-.5-1.5l-.5 1.5m.5 16.5l.5-1.5m-.5 1.5l-.5-1.5" />
    </svg>
  ),
  histone_regulation: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75c1.5 4.5 1.5 12 1.5 16.5M15 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
      <circle cx="12" cy="8" r="2" />
      <circle cx="12" cy="16" r="2" />
    </svg>
  ),
  actin_cytoskeleton: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 8l6 8m0-8l-6 8M9 12h6" />
    </svg>
  ),
  myosin_motors: () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12V9a2 2 0 012-2h4a2 2 0 012 2v3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12v3a1 1 0 001 1h1m4-4v3a1 1 0 01-1 1h-1" />
    </svg>
  ),
};

export const UpgradeIcon: React.FC<{ iconId: string; className?: string }> = ({ iconId, className }) => {
  const IconComponent = icons[iconId] || icons.spark; // Fallback to spark
  return <IconComponent />;
};