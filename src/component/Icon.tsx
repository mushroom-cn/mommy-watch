import { Icon as BaseIcon, IconProps } from '@rneui/themed';
export function Icon(props: Omit<IconProps, 'type'>) {
  return <BaseIcon {...props} type="ionicon" />;
}
