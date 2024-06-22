import { findFolder } from './find-folder';

export const getAIGraphrFolder2: () => Promise<string | null> = (() => {
  let aigraphr: string | null | undefined = undefined;

  return async function() {
    if (aigraphr === undefined) {
      aigraphr = (await findFolder('.aigraphr', process.cwd())) ?? null;
    }
    return aigraphr;
  };
})();

export const getAIGraphrFolder = async () => {
  return (await findFolder('.aigraphr', process.cwd())) ?? null;
}
