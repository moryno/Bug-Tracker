export const getAntTheme = (theme: any) => {
  return {
    colorPrimary: theme.palette.primary.main,
    colorLink: theme.palette.primary.main,
    colorText: theme.text.color,
    fontFamily: theme.font.family,
  };
};
