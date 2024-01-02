// post attachment types
export const ATTACHMENT_TYPE = {
  IMAGE: 1,
  VIDEO: 2,
  DOCUMENT: 3,
  LINK: 4,
};
// error messages
export const MEDIA_FETCH_ERROR = "An error occured while fetching the media";

// default maximum number of lines to be visible of the post content
export const MAX_DEFAULT_POST_CONTENT_LINES = 3;

// default maximum number of lines to be visible in post comments
export const MAX_DEFAULT_COMMENT_LINES = 3;

// comment levels
export const PARENT_LEVEL_COMMENT = 0;
export const CHILD_LEVEL_COMMENT = 1;

// min document count to display
export const MIN_DOCUMENT_ITEM = 2;

// view more text on pagination of replies of comment
export const VIEW_MORE_TEXT = "View more replies";

// error message for icon path type
export const ICON_PATH_VALIDATION_ERROR =
  "Property iconUrl and assetPath can not exist together.";
