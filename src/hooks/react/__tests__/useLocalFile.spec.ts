import { act, renderHook, waitFor } from '@testing-library/react-native';
jest.mock('../../../utils/fs');
import * as json5 from 'json5';
import * as fs from '../../../utils/fs';
import { useLocalFile, UseLocalFileProps } from '../useLocalFile';
const { readFileAsStringAsync, writeStringToFileAsync } = fs;
describe('useLocalFile test', () => {
  it('when_mount_expect_set_file_content_to_state', async () => {
    const mockConf = { conf: '123' };
    const mockReadFileAsStringAsync = jest.fn(() => json5.stringify(mockConf));
    const mockWriteStringToFileAsync = jest.fn();
    (readFileAsStringAsync as jest.MockedFn<any>).mockImplementation(
      mockReadFileAsStringAsync
    );
    (writeStringToFileAsync as jest.MockedFn<any>).mockImplementation(
      mockWriteStringToFileAsync
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
    expect(mockWriteStringToFileAsync).toHaveBeenCalledTimes(0);
    expect(mockReadFileAsStringAsync).toHaveBeenCalledTimes(1);
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
        return expect(mockWriteStringToFileAsync).toHaveBeenCalledTimes(1);
      },
      { timeout: 400 }
    );
    expect(mockReadFileAsStringAsync).toHaveBeenCalledTimes(1);
  });

  it('when_change_file_name_expect_clear_state', async () => {
    const mockConf1 = { conf: '888' };
    const mockConf2 = { conf: '999' };
    const mockReadFileAsStringAsync1 = jest.fn(() =>
      json5.stringify(mockConf1)
    );
    const mockReadFileAsStringAsync2 = jest.fn(() =>
      json5.stringify(mockConf2)
    );
    const mockWriteStringToFileAsync = jest.fn();
    (readFileAsStringAsync as jest.MockedFn<any>)
      .mockImplementationOnce(mockReadFileAsStringAsync1)
      .mockImplementationOnce(mockReadFileAsStringAsync2);
    (writeStringToFileAsync as jest.MockedFn<any>).mockImplementation(
      mockWriteStringToFileAsync
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
    expect(mockWriteStringToFileAsync).toHaveBeenCalledTimes(0);
    expect(mockReadFileAsStringAsync1).toHaveBeenCalledTimes(1);
    expect(mockReadFileAsStringAsync2).toHaveBeenCalledTimes(0);
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
    expect(mockWriteStringToFileAsync).toHaveBeenCalledTimes(0);
    expect(mockReadFileAsStringAsync1).toHaveBeenCalledTimes(1);
    expect(mockReadFileAsStringAsync2).toHaveBeenCalledTimes(1);
  });

  it('when_unmount_then_set_file_content_expect_do_not_change', async () => {
    const mockConf1 = { conf: '888' };
    const mockConf2 = { conf: '999' };
    const mockReadFileAsStringAsync1 = jest.fn(() =>
      json5.stringify(mockConf1)
    );
    const mockReadFileAsStringAsync2 = jest.fn(() =>
      json5.stringify(mockConf2)
    );
    const mockWriteStringToFileAsync = jest.fn();
    (readFileAsStringAsync as jest.MockedFn<any>)
      .mockImplementationOnce(mockReadFileAsStringAsync1)
      .mockImplementationOnce(mockReadFileAsStringAsync2);
    (writeStringToFileAsync as jest.MockedFn<any>).mockImplementation(
      mockWriteStringToFileAsync
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
    expect(mockWriteStringToFileAsync).toHaveBeenCalledTimes(0);
    expect(mockReadFileAsStringAsync1).toHaveBeenCalledTimes(1);
    expect(mockReadFileAsStringAsync2).toHaveBeenCalledTimes(0);
    unmount();
    act(() => {
      result.current[1](mockConf2);
    });
    expect(result.current[0]).toEqual(mockConf1);
    expect(mockWriteStringToFileAsync).toHaveBeenCalledTimes(0);
    expect(mockReadFileAsStringAsync1).toHaveBeenCalledTimes(1);
    expect(mockReadFileAsStringAsync2).toHaveBeenCalledTimes(0);
  });
});
