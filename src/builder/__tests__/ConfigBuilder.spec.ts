import { ConfigBuilder, PropertyChangeEventCallback } from '../ConfigBuilder';

type Setting = { name: string; id: string };
describe('ConfigBuilder Test', () => {
  test('when_set_config_expect_event_handler_was_called', () => {
    const builder = new ConfigBuilder<Setting>();
    const initConf = { id: '000', name: '000' };
    builder.setInit(initConf);
    const namePropertyChangeEventListenerMock: jest.MockedFn<
      PropertyChangeEventCallback<Setting>
    > = jest.fn();
    const anyPropertyChangeEventListenerMock: jest.MockedFn<
      Action<{ source: Setting }>
    > = jest.fn();
    builder.addPropertyChangeEventListener(
      'name',
      namePropertyChangeEventListenerMock
    );
    builder.addAnyPropertyChangeEventListener(
      anyPropertyChangeEventListenerMock
    );
    const newConf = { name: '111', id: '111' };
    builder.setProperties(newConf);
    expect(namePropertyChangeEventListenerMock).toBeCalledWith('name', '111', {
      source: newConf,
    });
    expect(anyPropertyChangeEventListenerMock).toBeCalledWith({
      source: newConf,
    });
    expect(builder.getAllProperties()).toEqual({ ...initConf, ...newConf });
  });
});
