/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'primary-light': 'SourceSansProLight, Arial, Sans-Serif',
        'primary-regular': 'SourceSansProRegular, Arial, Sans-Serif',
        'primary-italic': 'SourceSansProItalic, Arial, Sans-Serif',
        'primary-medium': 'SourceSansProSemiBold, Arial, Sans-Serif',
        'primary-bold': 'SourceSansProBold, Arial, Sans-Serif',
        'primary-black': 'SourceSansProBlack, Arial, Sans-Serif',
        'code-regular':
          'SourceCodeProRegular, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
        'code-bold':
          'SourceCodeProBold, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
      },
      maxWidth: {
        hero: '1200px',
        blog: '780px',
      },
      boxShadow: {
        light: '0px 0px 8px rgba(31, 36, 58, 0.06)',
      },
      dropShadow: {
        card: '0px 0px 16px rgba(31, 36, 58, 0.15)',
        'card-small': '0px 0px 8px rgba(31, 36, 58, 0.06)',
        changelog: '0px 0px 25px rgba(223, 236, 255, 0.4)',
      },
      spacing: {
        'hero-bg-height': '640px',
        'hero-gradient-top': '440px',
        'hero-gradient-height': '200px',
        'other-bg-height': '400px',
        footer: '500px',
        'footer-mobile': '850px',
        92: '21rem',
        faq: '120px',
      },
      colors: {
        blue: {
          25: '#F7F8FE',
          50: '#EEF1FD',
          100: '#E0E7FF',
          200: '#bccaff',
          300: '#94abff',
          400: '#6b8afb',
          500: '#476CEF',
          600: '#234CDA',
          700: '#0d32b2',
          800: '#042597',
          900: '#021a74',
        },
        violet: {
          900: '#2A118F',
        },
        steel: {
          25: '#FBFBFD',
          50: '#F8F8FB',
          100: '#EEF1F6',
          200: '#DEE1EB',
          300: '#CACEDB',
          400: '#A6ABBC',
          450: '#9499AB',
          500: '#7D8295',
          550: '#6D7284',
          600: '#5B6072',
          700: '#4A4E5E',
          800: '#2E3346',
          850: '#1C2132',
          900: '#0A0F25',
        },
        alert: {
          100: '#ffbbc7',
          200: '#ff8096',
          300: '#f35471',
          400: '#d62852',
          500: '#be0b41',
          600: '#99001c',
        },
        success: {
          100: '#c2fff4',
          200: '#83fbec',
          300: '#4cebe1',
          400: '#28d6c1',
          500: '#16c1b7',
          600: '#089ea8',
          700: '#25435F',
        },
        button: {
          border: 'rgba(27, 31, 35, 0.15)',
        },
        background: {
          about: '#8ac2ff',
          home: '#EEF1FD',
        },
      },
      backgroundImage: {
        'header-gradient':
          'linear-gradient(89.97deg, #FDD4BA 0.02%, #F5B7C5 15.12%, #ADA9EF 33.86%, #73B6FC 51.04%, #66B1FC 63.01%, #4F74F4 82.27%, #2E30EE 99.98%)',
        'hero-gradient':
          'linear-gradient(89.27deg, #1339CA 0.15%, #8F5AFF 100.34%)',
        'hero-shadow':
          'linear-gradient(180deg, rgba(10, 15, 37, 0) 0%, rgba(10, 15, 37, 0.05) 100%, rgba(10, 15, 37, 0.05) 100%)',
      },
      screens: {
        mobile: '576px',
      },
    },
  },
  variants: {
    extend: {
      dropShadow: ['hover'],
    },
  },
  plugins: [],
};
