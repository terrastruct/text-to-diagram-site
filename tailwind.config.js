/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        "primary-light": "SourceSansProLight, Arial, Sans-Serif",
        "primary-regular": "SourceSansProRegular, Arial, Sans-Serif",
        "primary-italic": "SourceSansProItalic, Arial, Sans-Serif",
        "primary-medium": "SourceSansProSemiBold, Arial, Sans-Serif",
        "primary-bold": "SourceSansProBold, Arial, Sans-Serif",
        "primary-black": "SourceSansProBlack, Arial, Sans-Serif",
      },
      maxWidth: {
        hero: "1200px",
        blog: "780px",
      },
      boxShadow: {
        light: "0px 0px 8px rgba(31, 36, 58, 0.06)",
      },
      dropShadow: {
        card: "0px 0px 16px rgba(31, 36, 58, 0.15)",
        "card-small": "0px 0px 8px rgba(31, 36, 58, 0.06)",
        changelog: "0px 0px 25px rgba(223, 236, 255, 0.4)",
      },
      spacing: {
        "hero-bg-height": "640px",
        "hero-gradient-top": "440px",
        "hero-gradient-height": "200px",
        "other-bg-height": "400px",
        footer: "500px",
        "footer-mobile": "850px",
        92: "21rem",
        faq: "120px",
      },
      colors: {
        blue: {
          25: "#F7F8FE",
          50: "#EEF1FD",
          100: "#E0E7FF",
          200: "#bccaff",
          300: "#94abff",
          400: "#6b8afb",
          500: "#476CEF",
          600: "#234CDA",
          700: "#0d32b2",
          800: "#042597",
          900: "#021a74",
        },
        steel: {
          25: "#FBFBFD",
          50: "#F6F6FA",
          100: "#EFF1F7",
          200: "#DEE1EB",
          300: "#CACEDB",
          400: "#A6ABBC",
          450: "#9499AB",
          500: "#7D8295",
          550: "#6D7284",
          600: "#5B6072",
          700: "#4A4E5E",
          800: "#2E3346",
          850: "#1C2132",
          900: "#0A0F25",
        },
        alert: {
          100: "#ffbbc7",
          200: "#ff8096",
          300: "#f35471",
          400: "#d62852",
          500: "#be0b41",
          600: "#99001c",
        },
        success: {
          100: "#c2fff4",
          200: "#83fbec",
          300: "#4cebe1",
          400: "#28d6c1",
          500: "#16c1b7",
          600: "#089ea8",
          700: "#25435F",
        },
        button: {
          border: "rgba(27, 31, 35, 0.15)",
        },
        background: {
          about: "#8ac2ff",
          home: "#EEF1FD",
        },
      },
      backgroundImage: {
        "home-gradient": `
					radial-gradient(at 70% 0%, hsla(227,88%,63%,1) 0, hsla(227,88%,63%,0) 70%),
					radial-gradient(at 0% 50%, hsla(355,85%,93%,1) 0, hsla(355,85%,93%,0) 60%),
					radial-gradient(at 0% 75%, hsla(22,100%,77%,1) 0, hsla(22,100%,77%,0)51%),
					radial-gradient(at 100% 58%, hsla(198,53%,66%,1) 0, hsla(198,53%,66%,0) 80%),
					radial-gradient(at 94% 11%, hsla(261,80%,46%,1) 0, hsla(261,80%,46%,0) 53%),
					radial-gradient(at 0% 0%, hsla(171,100%,88%,1) 0, hsla(171,100%,88%,0)93%)`,
        "hero-gradient": "linear-gradient(89.27deg, #1339CA 0.15%, #8F5AFF 100.34%)",
        "dots-gradient":
          "radial-gradient(#ECF0FD 2px, transparent 2%",
        "about-gradient":
          "linear-gradient(to right, hsla(0, 100%, 89%, 1), hsla(250, 40%, 78%, 1), hsla(200, 94%, 72%, 1), hsla(225, 92%, 66%, 1))",
        "header-gradient":
          "linear-gradient(89.97deg, #FDD4BA 0.02%, #F5B7C5 15.12%, #ADA9EF 33.86%, #73B6FC 51.04%, #66B1FC 63.01%, #4F74F4 82.27%, #2E30EE 99.98%)",
        "about-grid": "url('/images/about_grid.svg')",
        "blog-gradient-1": "linear-gradient(180deg, #EBEDF5 0%, #E1E4EF 100%)",
        "blog-gradient-2": "linear-gradient(180deg, #E0E7FF 0%, #C9D4FF 100%)",
        "changelog-gradient":
          "linear-gradient(96.88deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.5) 100%)",
        "changelog-title-gradient":
          "radial-gradient(69.91% 92.41% at 69.91% 36.67%, #B49AFF 0%, #96ADFF 49.66%, #98AEFF 100%)",
        "blog-title-gradient":
          "radial-gradient(69.91% 92.41% at 69.91% 36.67%, #5C4FED 0%, #2D57ED 49.66%, #00A3FF 100%)",
        "compare-gradient":
          "linear-gradient(180.02deg, rgba(59, 97, 236, 0.4) 0.02%, rgba(255, 255, 255, 0.4) 180.88%)",
        "contact-gradient":
          "linear-gradient(180deg, rgba(59, 97, 236, 0.4) 0.02%, rgba(255, 255, 255, 0.4) 180.88%)",
        "customer-gradient-left":
          "linear-gradient(90deg, #F5F5FA 20.31%, rgba(245, 245, 250, 0) 100%)",
        "customer-gradient-right":
          "linear-gradient(270deg, #F5F5FA 20.31%, rgba(245, 245, 250, 0) 100%)",
        "customer-gradient-bottom":
          "linear-gradient(0deg, #F5F5FA 20.31%, rgba(245, 245, 250, 0) 100%)",
      },
    },
  },
  variants: {
    extend: {
      dropShadow: ["hover"],
    },
  },
  plugins: [],
};
