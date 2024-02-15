import AWS from 'aws-sdk';

// aws configuration
export function getAWS() {
  AWS.config.region = 'ap-south-1';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: `ap-south-1:181963ba-f2db-450b-8199-964a941b38c2`,
  });
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'beta-likeminds-media'},
  });
  return s3;
}
