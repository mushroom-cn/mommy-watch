import { ListItem } from '@rneui/themed';
import TouchableScale from 'react-native-touchable-scale';
import { Icon } from '../../component';

type SettingItemProps = {
  id: string;
  icon: string;
  title: string;
  onPress: () => void;
};
export function SettingItem({ icon, title, id, onPress }: SettingItemProps) {
  return (
    <TouchableScale>
      <ListItem
        Component={TouchableScale}
        activeScale={0.99} //
        key={id}
        onPress={onPress}
        bottomDivider
      >
        <Icon name={icon} />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableScale>
  );
}
