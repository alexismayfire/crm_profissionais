import * as Colors from './colors';
import * as Themes from './themes';

export const createStyles = {
  screen: (theme = Themes.constants.primary) => screenContainer(theme),
  content: (theme = Themes.constants.primary) => contentContainer(theme),
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
};

const screenContainer = theme => ({
  flex: 1,
  justifyContent: 'center',
  ...Colors.background[theme],
});

const contentContainer = theme => ({
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  ...Colors.background[theme],
});
