import { MentionData } from "@likeminds.community/feed-rn-ui/components/LMInputText/types";

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
