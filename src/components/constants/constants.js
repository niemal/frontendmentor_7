export const COLORS = {
  bright_blue: "hsl(220, 98%, 61%)",
  check_background_1: "hsl(192, 100%, 67%)",
  check_background_2: "hsl(280, 87%, 65%)",

  very_light_gray: "hsl(0, 0%, 98%)",
  very_light_gray_blue: "hsl(236, 33%, 92%)",
  light_gray_blue: "hsl(233, 11%, 84%)",
  dark_gray_blue: "hsl(236, 9%, 61%)",
  very_dark_gray_blue: "hsl(235, 19%, 35%)",

  very_dark_blue: "hsl(235, 21%, 11%)",
  very_dark_desat_blue: "hsl(235, 24%, 19%)",
  light_gray_blue_2: "hsl(234, 39%, 85%)",
  light_gray_blue_2_hover: "hsl(236, 33%, 92%)",
  dark_gray_blue_2: "hsl(234, 11%, 52%)",
  very_dark_gray_blue_2: "hsl(233, 14%, 35%)",
  very_dark_gray_blue_3: "hsl(237, 14%, 26%)",
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 1080,
  exclusiveWidth: 1285,
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  exclusiveWidth: `(max-width: ${BREAKPOINTS.exclusiveWidth / 16}rem)`,
};
