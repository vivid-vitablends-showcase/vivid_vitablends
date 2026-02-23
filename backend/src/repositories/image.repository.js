import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config/s3.js';
import config from '../config/index.js';

export const uploadToS3 = async (buffer, key) => {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: config.r2.bucketName,
      Key: key,
      Body: buffer,
      ContentType: 'image/jpeg',
    })
  );
};
