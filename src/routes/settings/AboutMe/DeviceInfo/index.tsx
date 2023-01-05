import { Card } from '@rneui/base';
import { ListItem } from '@rneui/themed';
import * as Device from 'expo-device';
import { useAsync, useTranslation } from '../../../../hooks';

import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../../../../component';
const renderItem = ({ key, title, value }: any) => {
  return (
    <ListItem key={key}>
      <ListItem.Title>{title}</ListItem.Title>
      <ListItem.Content>{value}</ListItem.Content>
    </ListItem>
  );
};
export default function DeviceInfo() {
  const { t } = useTranslation();
  const { value, loading, error } = useAsync(async () => {
    return [
      {
        key: 'deviceName',
        title: t('deviceName'),
        value: Device.deviceName,
      },
      {
        key: 'osName',
        title: t('osName'),
        value: Device.osName,
      },
      {
        key: 'osVersion',
        title: t('osVersion'),
        value: Device.osVersion,
      },
      {
        key: 'osBuildId',
        title: t('osBuildId'),
        value: Device.osBuildId,
      },
      {
        key: 'deviceType',
        title: t('deviceType'),
        value: t(`deviceType!${await Device.getDeviceTypeAsync()}`),
      },
    ];
  }, [t]);
  return (
    <Card>
      <Card.Title>{t('deviceInfo')}</Card.Title>
      <Card.Divider />
      {loading ? (
        <Icon name="refresh-outline" />
      ) : (
        <FlatList style={styles.list} data={value} renderItem={renderItem} />
      )}
    </Card>
  );
}
const styles = StyleSheet.create({
  list: {
    // height: 100,
  },
});
