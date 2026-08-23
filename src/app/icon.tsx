import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 48,
  height: 48,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d2238',
          borderRadius: '12px',
          border: '2px solid #00d9bc',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '10px',
            height: '28px',
            background: '#ef4444',
            borderRadius: '3px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '28px',
            height: '10px',
            background: '#ef4444',
            borderRadius: '3px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            background: '#ffffff',
            borderRadius: '2px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
