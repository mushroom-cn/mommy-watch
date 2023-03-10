import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from './DeviceInfo';
import OpenSource from './OpenSource';
import Privacy from './Privacy';
export function AboutMe() {
  return (
    <SafeAreaView>
      <ScrollView>
        <DeviceInfo />
        <Privacy />
        <OpenSource />
      </ScrollView>
    </SafeAreaView>
  );
}
