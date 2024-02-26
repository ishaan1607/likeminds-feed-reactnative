import { convertToMentionValues } from "likeminds_feed_reactnative_ui/components/LMInputText/utils";

export const routeToMentionConverter = (content: string) => {
  return convertToMentionValues(
    `${content} `, // to put extra space after a message whwn we want to edit a message
    ({URLwithID, name}) => {
      if (!URLwithID) {
        return `@[${name}](${name})`;
      } else {
        return `@[${name}](${URLwithID})`;
      }
    },
  );
};
