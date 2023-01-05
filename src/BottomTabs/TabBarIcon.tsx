import { IconProps } from '@rneui/themed';
import { Icon } from '../component';
type TabBarIconProps = Pick<IconProps, 'name'>;
export function TabBarIcon({ name }: TabBarIconProps) {
  return <Icon name={name} />;
}
