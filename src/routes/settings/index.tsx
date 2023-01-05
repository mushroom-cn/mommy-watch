import { useNavigation } from '@react-navigation/native';
import { Card } from '@rneui/themed';
import { cacheDirectory } from 'expo-file-system';
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../../hooks';
import { routes } from './routes';
import { SettingItem } from './SettingItem';
const renderItem = ({ item }: any) => {
  return <SettingItem {...item} />;
};

export function Settings() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const settingList = useMemo(
    () => [
      {
        id: 'language',
        name: t('setLanguage'),
        icon: 'language',
        title: t('setLanguage'),
        onPress: () => {
          navigation.navigate(routes.changeLanguageDetail.name);
        },
      },
      {
        id: 'configPath',
        name: t('configPath'),
        icon: 'document-outline',
        title: t('configPath'),
        onPress: () => {
          navigation.navigate(routes.configDetail.name);
        },
      },
      {
        id: 'aboutMe',
        name: t('aboutMe'),
        icon: 'information-circle-outline',
        title: t('aboutMe'),
        onPress: () => {
          navigation.navigate(routes.aboutMe.name);
        },
      },
    ],
    [navigation]
  );
  return (
    <SafeAreaView>
      <View>
        <Card containerStyle={styles.cardContainer}>
          <FlatList
            style={styles.listContainer}
            data={settingList}
            renderItem={renderItem}
          />
        </Card>
        <Text>{cacheDirectory}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    // paddingBottom: 5,
    // paddingLeft: 0,
    // paddingRight: 0,
    // paddingTop: 5,
  },
  listContainer: {
    borderRadius: 10,
  },
});
