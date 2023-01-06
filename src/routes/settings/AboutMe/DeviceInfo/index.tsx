import { Card } from '@rneui/base';
import { ListItem, Text } from '@rneui/themed';
import * as Device from 'expo-device';
import { useAsync, useTranslation } from '../../../../hooks';

import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Icon } from '../../../../component';
const renderItem = ({
  item: { key, title, value },
}: ListRenderItemInfo<any>) => {
  return (
    <ListItem key={key} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <Text>{value}</Text>
      </ListItem.Content>
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
        <FlatList
          scrollEnabled={true}
          style={styles.list}
          data={value}
          renderItem={renderItem}
        />
      )}
    </Card>
  );
}
const styles = StyleSheet.create({
  list: {
    // height: 100,
  },
});
