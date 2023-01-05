import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@rneui/themed';

export function Welcome() {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <View style={style.container}>
        <Text style={style.welcomeText} h1>
          {t('welcomeToMummyWatch')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const black = '#000';
const white = 'white';
const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: black,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  welcomeText: {
    color: white,
    textAlign: 'center',
  },
});
