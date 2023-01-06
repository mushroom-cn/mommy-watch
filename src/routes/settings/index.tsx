import { useNavigation } from '@react-navigation/native';
import { Card } from '@rneui/themed';
import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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
        name: t('language'),
        icon: 'language',
        title: t('language'),
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
        title: t('aboutMe!title'),
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
