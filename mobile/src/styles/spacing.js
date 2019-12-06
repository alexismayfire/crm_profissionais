export const SMALL = 10;
export const MEDIUM = 20;

export const smallPadding = {
  paddingHorizontal: SMALL,
  paddingVertical: SMALL,
};

export const smallMargin = {
  marginHorizontal: SMALL,
  marginVertical: SMALL,
};

export const mediumPadding = {
  paddingHorizontal: MEDIUM,
  paddingVertical: MEDIUM,
};

export const mediumMargin = {
  marginHorizontal: MEDIUM,
  marginVertical: MEDIUM,
};

export const smallSpacing = {
  ...smallMargin,
  ...smallPadding,
};

export const rounded = {
  borderRadius: 5,
};

export const smallPaddingRounded = {
  ...smallPadding,
  ...rounded,
};

export const smallMarginRounded = {
  ...smallMargin,
  ...rounded,
};

export const smallSpacingRounded = {
  ...smallSpacing,
  ...rounded
};