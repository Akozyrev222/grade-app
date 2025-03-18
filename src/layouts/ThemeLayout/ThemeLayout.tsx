import React, {ReactNode} from 'react';

import {StatusBar, View} from 'react-native';

//app themes
import {themes, ThemeContext, ThemesName} from '@/themes/';
import {useTheme} from '@/hooks/';

type PropTypes = {
  children: ReactNode;
};

export const ThemeLayout: React.FC<PropTypes> = (props: PropTypes) => {
  return (
    <ThemeContext.Provider value={themes[ThemesName.LIGHT]}>
      <ThemeLayoutContent {...props} />
    </ThemeContext.Provider>
  );
};

const ThemeLayoutContent: React.FC<PropTypes> = ({children}) => {
  const {statusBarStyle, pallete} = useTheme();

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      {children}
    </View>
  );
};
