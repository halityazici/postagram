export const PLATFORMS = {
  INSTAGRAM: {
    id: 'instagram',
    name: 'Instagram',
    formats: [
      { id: 'post', name: 'Post', width: 1080, height: 1080, aspect: '1/1' },
      { id: 'story', name: 'Story', width: 1080, height: 1920, aspect: '9/16' },
      { id: 'portrait', name: 'Portrait', width: 1080, height: 1350, aspect: '4/5' },
    ],
  },
  FACEBOOK: {
    id: 'facebook',
    name: 'Facebook',
    formats: [
      { id: 'post', name: 'Post', width: 1200, height: 630, aspect: '1.91/1' },
      { id: 'story', name: 'Story', width: 1080, height: 1920, aspect: '9/16' },
    ],
  },
  TWITTER: {
    id: 'twitter',
    name: 'Twitter',
    formats: [
      { id: 'post', name: 'Post', width: 1200, height: 675, aspect: '16/9' },
    ],
  },
  TIKTOK: {
    id: 'tiktok',
    name: 'TikTok',
    formats: [
      { id: 'video', name: 'Video', width: 1080, height: 1920, aspect: '9/16' },
    ],
  },
  PINTEREST: {
    id: 'pinterest',
    name: 'Pinterest',
    formats: [
      { id: 'pin', name: 'Pin', width: 1000, height: 1500, aspect: '2/3' },
    ],
  },
};

export const THEMES = [
  { id: 'modern-minimal', name: 'Modern Minimal' },
  { id: 'bold-contrast', name: 'Bold Contrast' },
  { id: 'soft-gradient', name: 'Soft Gradient' },
  { id: 'tech-neon', name: 'Tech Neon' },
  { id: 'editorial', name: 'Editorial' },
  { id: 'luxe-gold', name: 'Luxe Gold' },
  { id: 'noir-elegant', name: 'Noir Elegant' },
  { id: 'pastel-dream', name: 'Pastel Dream' },
  { id: 'cyber-glitch', name: 'Cyber Glitch' },
  { id: 'vintage-paper', name: 'Vintage Paper' },
  { id: 'glassmorphism-pro', name: 'Glassmorphism Pro' },
  { id: 'swiss-grid', name: 'Swiss Grid' },
  { id: 'nature-organic', name: 'Nature Organic' },
  { id: 'neon-night', name: 'Neon Night' },
  { id: 'magazine-cover', name: 'Magazine Cover' },
];

export const FONTS = [
  { id: 'inter', name: 'Inter', family: "'Inter', sans-serif" },
  { id: 'roboto', name: 'Roboto', family: "'Roboto', sans-serif" },
  { id: 'playfair-display', name: 'Playfair Display', family: "'Playfair Display', serif" },
  { id: 'montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif" },
  { id: 'oswald', name: 'Oswald', family: "'Oswald', sans-serif" },
  { id: 'lato', name: 'Lato', family: "'Lato', sans-serif" },
  { id: 'raleway', name: 'Raleway', family: "'Raleway', sans-serif" },
  { id: 'merriweather', name: 'Merriweather', family: "'Merriweather', serif" },

  /* Premium Serifs (Editorial/Luxury) */
  { id: 'cormorant-garamond', name: 'Cormorant Garamond', family: "'Cormorant Garamond', serif" },
  { id: 'cinzel', name: 'Cinzel', family: "'Cinzel', serif" },
  { id: 'bodoni-moda', name: 'Bodoni Moda', family: "'Bodoni Moda', serif" },
  { id: 'prata', name: 'Prata', family: "'Prata', serif" },
  { id: 'dm-serif-display', name: 'DM Serif Display', family: "'DM Serif Display', serif" },
  { id: 'libre-baskerville', name: 'Libre Baskerville', family: "'Libre Baskerville', serif" },
  { id: 'lora', name: 'Lora', family: "'Lora', serif" },

  /* Premium Sans (Modern/Tech) */
  { id: 'space-grotesk', name: 'Space Grotesk', family: "'Space Grotesk', sans-serif" },
  { id: 'syne', name: 'Syne', family: "'Syne', sans-serif" },
  { id: 'outfit', name: 'Outfit', family: "'Outfit', sans-serif" },
  { id: 'plus-jakarta-sans', name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif" },
  { id: 'manrope', name: 'Manrope', family: "'Manrope', sans-serif" },
  { id: 'tenor-sans', name: 'Tenor Sans', family: "'Tenor Sans', sans-serif" },
  { id: 'urbanist', name: 'Urbanist', family: "'Urbanist', sans-serif" },
  { id: 'unbounded', name: 'Unbounded', family: "'Unbounded', sans-serif" },

  /* Display & Script (Creative/Unique) */
  { id: 'abril-fatface', name: 'Abril Fatface', family: "'Abril Fatface', cursive" },
  { id: 'righteous', name: 'Righteous', family: "'Righteous', cursive" },
  { id: 'yeseva-one', name: 'Yeseva One', family: "'Yeseva One', cursive" },
  { id: 'allura', name: 'Allura', family: "'Allura', cursive" },
  { id: 'pinyon-script', name: 'Pinyon Script', family: "'Pinyon Script', cursive" },
];
