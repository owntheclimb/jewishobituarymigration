import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Jewish Obituary - Honor Their Legacy';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fefefe',
          backgroundImage: 'linear-gradient(135deg, #fefefe 0%, #f5f0eb 100%)',
        }}
      >
        {/* Decorative top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #a80e9e 0%, #c41eb8 100%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
          }}
        >
          {/* Icon/Logo area */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(168, 14, 158, 0.1)',
              marginBottom: '24px',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a80e9e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#262523',
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Jewish Obituary
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: '#a80e9e',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            Honor Their Legacy
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 24,
              color: '#666666',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            Create beautiful memorials, search obituaries, and connect with Jewish communities
          </div>
        </div>

        {/* Bottom decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#999999',
            fontSize: 18,
          }}
        >
          <span>jewishobituary.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
