import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

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
          background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #10b981 100%)',
          borderRadius: '50%',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main pad (bottom) */}
          <ellipse cx="50" cy="65" rx="16" ry="14" fill="white"/>

          {/* Top left toe */}
          <ellipse cx="32" cy="42" rx="8" ry="11" fill="white" transform="rotate(-20 32 42)"/>

          {/* Top middle-left toe */}
          <ellipse cx="42" cy="35" rx="8" ry="11" fill="white" transform="rotate(-5 42 35)"/>

          {/* Top middle-right toe */}
          <ellipse cx="58" cy="35" rx="8" ry="11" fill="white" transform="rotate(5 58 35)"/>

          {/* Top right toe */}
          <ellipse cx="68" cy="42" rx="8" ry="11" fill="white" transform="rotate(20 68 42)"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
