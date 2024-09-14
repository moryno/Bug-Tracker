export const defaultTheme = {
  theme: {
    palette: {
      primary: { main: "#12CC1B", accentColor: "#1C2243" },
      secondary: { main: "#F0FDF4" },
      white: "#FFFFFF",
      black: "#000",
      gray: {
        25: "#FCFCFD",
        50: "#F9FAFB",
        100: "#F2F4F7",
        200: "#EAECF0",
        300: "#D0D5DD",
        400: "#98A2B3",
        500: "#667085",
        600: "#475467",
        900: "#111827",
      },
      grey: {
        "Cool Grey": {
          100: "#F3F4F6",
          200: "#E5E7EB", // border color
        },
      },
      green: {
        50: "#F0FDF4",

        600: "#16A34A",
        700: "#15803D",
        900: "#14532D",
      },
      orange: "#FF6400",
      background: {
        paper: "#FFFFFF",
        paperMobile: "#F8FAFC",
      },
      boxShadowColor: "rgba(0, 0, 0, 0.07)",
      status: {
        delayed: "#C5A070",
        active: "#2CC8BA",
        completed: "#4ED3E5",
        inProgress: "#08AEEA",
        onTrack: "#74CB80",
        inTesting: "#F6A96D",
        onHold: "#FBC11E",
        approved: "#A593FF",
        cancelled: "#F56B62",
        team: "#EF476F",
        planning: "#08AEEA",
        invoiced: "#B99897",
      },
    },
    text: {
      color: "#101828",
    },
    font: {
      family: "Barlow",
      size: {
        small: "12px",
        medium: "14px",
        large: "16px",
      },
    },
    headerMenu: {
      headerMenuSelectedBgColor: "#F3F4F6",
    },
    breadcrumbs: {
      height: 38,
    },
    icons: {
      fill: "#98A2B3",
    },
    breakpoints: {
      xxs: 360,
      xs: 480,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1600,
      xxxl: 2560,
    },
    header: {
      height: 56,
      heightWithMargin: 68,
    },
    mobileMenu: {
      height: 60,
    },
    betSlip: {
      collapseHeaderHeight: 51,
    },
  },
};
