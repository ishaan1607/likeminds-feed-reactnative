import AWS from 'aws-sdk';

export const AWS_REGION = "ap-south-1"
export const AWS_IDENTITY_POOL_ID = "ap-south-1:181963ba-f2db-450b-8199-964a941b38c2"
export const S3_BUCKET = "beta-likeminds-media"
export const S3_API_VERSION = "2006-03-01"

// aws configuration
export function getAWS() {  
  AWS.config.region = AWS_REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: `${AWS_IDENTITY_POOL_ID}`,
  });
  const s3 = new AWS.S3({
    apiVersion: S3_API_VERSION,
    params: {Bucket: S3_BUCKET},
  });
  return s3;
}
