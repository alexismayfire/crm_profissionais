import * as Colors from './colors';
import * as Themes from './themes';

export const createStyles = {
  screen: (theme = Themes.constants.primary) => screenContainer(theme),
};

const screenContainer = (theme) => ({
  flex: 1,
  justifyContent: 'center',
  ...Colors.background[theme],
});
