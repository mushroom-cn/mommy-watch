import { act, renderHook, waitFor } from '@testing-library/react-native';
jest.mock('expo-file-system', () => ({
  EncodingType: {},
  writeAsStringAsync: jest.fn(),
  readAsStringAsync: jest.fn(),
}));
import { writeAsStringAsync, readAsStringAsync } from 'expo-file-system';
import * as json5 from 'json5';
import { useLocalFile, UseLocalFileProps } from '../useLocalFile';

describe('useLocalFile test', () => {
  it('when_mount_expect_set_file_content_to_state', async () => {
    const mockConf = { conf: '123' };
    const mockReadAsStringAsync = jest.fn(() => json5.stringify(mockConf));
    const mockWriteAsStringAsync = jest.fn();

    (readAsStringAsync as jest.MockedFn<any>).mockImplementation(
      mockReadAsStringAsync
    );
    (writeAsStringAsync as jest.MockedFn<any>).mockImplementation(
      mockWriteAsStringAsync
    );
    const mockFileName = 'mockFileName.json';
    const initialProps: UseLocalFileProps = {
      file: mockFileName,
    };
    const { result } = renderHook((props) => useLocalFile(props), {
      initialProps,
    });
    // wait for async call in useEffect
    await waitFor(
      () => {
        return expect(result.current[0]).not.toEqual({});
      },
      {
        timeout: 400,
      }
    );
    expect(mockWriteAsStringAsync).toHaveBeenCalledTimes(0);
    expect(mockReadAsStringAsync).toHaveBeenCalledTimes(1);
    const [actualConf, setConf] = result.current;
    expect(actualConf).toEqual(mockConf);
    const newConf = { conf: 999 };
    act(() => {
      setConf(newConf);
    });
    const [actualConf2] = result.current;
    expect(actualConf2).toEqual(newConf);
    await waitFor(
      () => {
        return expect(mockWriteAsStringAsync).toHaveBeenCalledTimes(1);
      },
      { timeout: 400 }
    );
    expect(mockReadAsStringAsync).toHaveBeenCalledTimes(1);
  });

  it('when_change_file_name_expect_clear_state', async () => {
    const mockConf1 = { conf: '888' };
    const mockConf2 = { conf: '999' };
    const mockReadAsStringAsync1 = jest.fn(() => json5.stringify(mockConf1));
    const mockReadAsStringAsync2 = jest.fn(() => json5.stringify(mockConf2));
    const mockWriteAsStringAsync = jest.fn();
    (readAsStringAsync as jest.MockedFn<any>)
      .mockImplementationOnce(mockReadAsStringAsync1)
      .mockImplementationOnce(mockReadAsStringAsync2);
    (writeAsStringAsync as jest.MockedFn<any>).mockImplementation(
      mockWriteAsStringAsync
    );
    const mockFileName = 'mockFileName.json';
    const initialProps: UseLocalFileProps = {
      file: mockFileName,
    };
    const { result, rerender } = renderHook((props) => useLocalFile(props), {
      initialProps,
    });
    // wait for async call in useEffect
    await waitFor(
      () => {
        return expect(result.current[0]).toEqual(mockConf1);
      },
      {
        timeout: 400,
      }
    );
    expect(mockWriteAsStringAsync).toHaveBeenCalledTimes(0);
    expect(mockReadAsStringAsync1).toHaveBeenCalledTimes(1);
    expect(mockReadAsStringAsync2).toHaveBeenCalledTimes(0);
    // change file name should clear hook state
    const newMockFileName = 'newMockFileName.json';
    rerender({ file: newMockFileName });
    await waitFor(
      () => {
        return expect(result.current[0]).toEqual(mockConf2);
      },
      {
        timeout: 400,
      }
    );
    expect(mockWriteAsStringAsync).toHaveBeenCalledTimes(0);
    expect(mockReadAsStringAsync1).toHaveBeenCalledTimes(1);
    expect(mockReadAsStringAsync2).toHaveBeenCalledTimes(1);
  });

  it('when_unmount_then_set_file_content_expect_do_not_change', async () => {
    const mockConf1 = { conf: '888' };
    const mockConf2 = { conf: '999' };
    const mockReadAsStringAsync1 = jest.fn(() => json5.stringify(mockConf1));
    const mockReadAsStringAsync2 = jest.fn(() => json5.stringify(mockConf2));
    const mockWriteAsStringAsync = jest.fn();
    (readAsStringAsync as jest.MockedFn<any>)
      .mockImplementationOnce(mockReadAsStringAsync1)
      .mockImplementationOnce(mockReadAsStringAsync2);
    (writeAsStringAsync as jest.MockedFn<any>).mockImplementation(
      mockWriteAsStringAsync
    );
    const mockFileName = 'mockFileName.json';
    const initialProps: UseLocalFileProps = {
      file: mockFileName,
    };
    const { result, unmount } = renderHook((props) => useLocalFile(props), {
      initialProps,
    });
    // wait for async call in useEffect
    await waitFor(
      () => {
        return expect(result.current[0]).toEqual(mockConf1);
      },
      {
        timeout: 400,
      }
    );
    expect(mockWriteAsStringAsync).toHaveBeenCalledTimes(0);
    expect(mockReadAsStringAsync1).toHaveBeenCalledTimes(1);
    expect(mockReadAsStringAsync2).toHaveBeenCalledTimes(0);
    unmount();
    act(() => {
      result.current[1](mockConf2);
    });
    expect(result.current[0]).toEqual(mockConf1);
    expect(mockWriteAsStringAsync).toHaveBeenCalledTimes(0);
    expect(mockReadAsStringAsync1).toHaveBeenCalledTimes(1);
    expect(mockReadAsStringAsync2).toHaveBeenCalledTimes(0);
  });
});
