// app/components/SideAds.tsx
'use client';

import AdSense from './AdSense';

export default function SideAds({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

      {/* Lewa reklama — tylko desktop */}
      <div
        style={{ width: '160px', flexShrink: 0, paddingTop: '80px' }}
        className="hidden xl:flex items-start justify-center"
      >
        <AdSense
          adSlot="9910159547"
          adFormat="vertical"
          style={{ width: '160px', minHeight: '600px' }}
        />
      </div>

      {/* Treść główna */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {children}
      </div>

      {/* Prawa reklama — tylko desktop */}
      <div
        style={{ width: '160px', flexShrink: 0, paddingTop: '80px' }}
        className="hidden xl:flex items-start justify-center"
      >
        <AdSense
          adSlot="3182923491"
          adFormat="vertical"
          style={{ width: '160px', minHeight: '600px' }}
        />
      </div>

    </div>
  );
}