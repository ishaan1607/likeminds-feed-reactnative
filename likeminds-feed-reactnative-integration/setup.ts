import {LMFeedClient} from '@likeminds.community/feed-js';

export const initMyClient = (apiKey: string, versionCode: number) => {
  const lmFeedClient = LMFeedClient.Builder()
    .setApiKey(apiKey)
    .setPlatformCode('rn')
    .setVersionCode(versionCode)
    .build();

  return lmFeedClient;
};
