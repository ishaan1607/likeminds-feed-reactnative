import { MentionData } from "likeminds_feed_reactnative_ui/components/LMInputText/types";

const mentionRegEx = /((.)\[([^[]*)]\(([^(^)]*)\))/gi;
// this function gives mention values from the route path
export const replaceMentionValues = (
  value: string,
  replacer: (mention: MentionData) => string,
) =>
  value.replace(mentionRegEx, (fullMatch, original, trigger, name, id) =>
    replacer({
      original,
      trigger,
      name,
      id,
    }),
  );
