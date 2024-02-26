import {detectMentions} from './detectMentions';
import {replaceMentionValues} from './replaceMentionValues';
import { extractPathfromRouteQuery } from './extractMentionPath';
import {mentionToRouteConverter} from './mentionToRouteConverter';
import {routeToMentionConverter} from './routeToMentionConverter';
import { replaceLastMention } from './replaceMentions';
import {timeStamp} from './timeStamp';
import {nameInitials} from './nameInitials';
import {requestStoragePermission} from './permissions';
import {postShare} from './postShare';
import {getAWS} from './AWSConfig';
import {uploadFilesToAWS} from './uploadFilesToAWS';
import {selectDocument, selectImageVideo} from './mediaSelection';
import {detectURLs} from './detectLinks';
import NetworkUtil from './NetworkUtil';

export {
  detectMentions,
  replaceMentionValues,
  extractPathfromRouteQuery,
  mentionToRouteConverter,
  routeToMentionConverter,
  replaceLastMention,
  timeStamp,
  nameInitials,
  requestStoragePermission,
  postShare,
  getAWS,
  uploadFilesToAWS,
  selectDocument,
  selectImageVideo,
  detectURLs,
  NetworkUtil
};
