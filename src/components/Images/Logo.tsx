import React from 'react'

export function Logo() {
  return (
    <svg viewBox="0 0 784 600" width="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="a">
          <stop stopColor="#62D3EA" offset="0%" />
          <stop stopColor="#14A3E2" offset="100%" />
        </linearGradient>
        <linearGradient x1="97.295%" y1="50%" x2="0%" y2="50%" id="b">
          <stop stopColor="#74E9FF" offset="0%" />
          <stop stopColor="#1DA3CC" offset="100%" />
        </linearGradient>
        <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="c">
          <stop stopColor="#2966A3" offset="0%" />
          <stop stopColor="#1B417A" offset="100%" />
        </linearGradient>
        <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="d">
          <stop stopColor="#318BC4" offset="0%" />
          <stop stopColor="#1F5993" offset="100%" />
        </linearGradient>
        <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="e">
          <stop stopColor="#359DCC" offset="0%" />
          <stop stopColor="#236EA6" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          d="M100 400L300 0c110.457 0 200 89.543 200 200s-89.543 200-200 200H100z"
          fill="url(#a)"
          transform="translate(284)"
        />
        <path d="M100 400h400v200H0l100-200z" fill="url(#b)" transform="translate(284)" />
        <g>
          <path
            d="M245 0h145c55.228 0 100 44.772 100 100s-44.772 100-100 100H200v200H0V100C0 44.772 44.772 0 100 0h145z"
            fill="url(#c)"
          />
          <path
            d="M0 300c0-55.228 44.772-100 100-100h200c55.228 0 100 44.772 100 100s-44.772 100-100 100H200v100H0V300z"
            fill="url(#d)"
          />
          <path
            d="M200 500c0 55.228-44.772 100-100 100S0 555.228 0 500s44.772-100 100-100h100v100z"
            fill="url(#e)"
          />
        </g>
      </g>
    </svg>
  )
}
