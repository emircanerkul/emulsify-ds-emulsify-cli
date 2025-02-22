jest.mock('../cache/copyItemFromCache', () => jest.fn());
jest.mock('../fs/findFileInCurrentPath', () => jest.fn());

import type { EmulsifySystem, EmulsifyVariant } from '@emulsify-cli/config';
import copyItemFromCache from '../cache/copyItemFromCache';
import findFileInCurrentPath from '../fs/findFileInCurrentPath';
import installGeneralAssetsFromCache from './installGeneralAssetsFromCache';

const findFileMock = (findFileInCurrentPath as jest.Mock).mockReturnValue(
  '/home/uname/Projects/cornflake/web/themes/custom/cornflake/project.emulsify.json'
);
const copyItemMock = (copyItemFromCache as jest.Mock).mockResolvedValue(true);

describe('installGeneralAssetsFromCache', () => {
  beforeEach(() => {
    copyItemMock.mockClear();
  });
  const system = {
    name: 'compound',
  } as EmulsifySystem;
  const variant = {
    directories: [
      {
        name: 'defaults',
        path: './components/00-base/00-defaults',
        destinationPath: './components/00-base/00-defaults',
      },
    ],
    files: [
      {
        name: 'style',
        path: './components/global.scss',
        destinationPath: './components/global.scss',
      },
    ],
  } as EmulsifyVariant;

  it('throws an error if the user is not within an Emulsify project', async () => {
    expect.assertions(1);
    findFileMock.mockReturnValueOnce(undefined);
    await expect(
      installGeneralAssetsFromCache(system, variant)
    ).rejects.toThrow(
      'Unable to find an Emulsify project to install assets into.'
    );
  });

  it('copies all general files and directories into the Emulsify project', async () => {
    expect.assertions(2);
    await installGeneralAssetsFromCache(system, variant);
    expect(copyItemMock).toHaveBeenNthCalledWith(
      1,
      'systems',
      ['compound', './components/00-base/00-defaults'],
      '/home/uname/Projects/cornflake/web/themes/custom/cornflake/components/00-base/00-defaults',
      true
    );
    expect(copyItemMock).toHaveBeenNthCalledWith(
      2,
      'systems',
      ['compound', './components/global.scss'],
      '/home/uname/Projects/cornflake/web/themes/custom/cornflake/components/global.scss',
      true
    );
  });

  it('defaults directories/variants to empty arrays', async () => {
    expect.assertions(1);
    await installGeneralAssetsFromCache(system, {} as EmulsifyVariant);
    expect(copyItemMock).not.toHaveBeenCalled();
  });
});
