const primaryColor = 'blue';
const primaryContainerColor = 'white';
const primaryTextColor = 'black';
const secondaryColor = 'grey';
const secondaryTextColor = 'white';

const errorText = '#9f3a38';
const errorBackground = '#e0b4b4';
const successText = '#2c662d';
const successBackground = '#a3c293';

export const text = {
  primary: { color: primaryTextColor },
  primaryOutline: { color: primaryColor },
  secondary: { color: secondaryTextColor },
  error: { color: errorText },
  success: { color: successText },
};

export const background = {
  primary: { backgroundColor: 'white' },
  secondary: { backgroundColor: primaryColor },
  error: { backgroundColor: errorBackground },
  success: { backgroundColor: successBackground },
};

export const button = {
  primary: {
    backgroundColor: primaryColor,
    borderColor: primaryColor,
  },
  primaryOutline: {
    backgroundColor: primaryContainerColor,
    borderColor: primaryColor,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  primaryClear: {
    backgroundColor: primaryContainerColor,
    borderColor: primaryContainerColor,
  },
  secondary: {
    backgroundColor: secondaryColor,
    borderColor: secondaryColor,
  },
  secondaryOutline: {
    borderColor: secondaryColor,
  },
  secondaryClear: {

  },
  error: {
    backgroundColor: errorBackground,
    borderColor: errorBackground,
  },
};