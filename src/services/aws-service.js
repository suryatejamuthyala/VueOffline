import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.VUE_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY
  }
});

export async function getImageFromS3(bucketName, imagePath) {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: imagePath
    });
    
    // Generate presigned URL valid for 1 hour
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return signedUrl;
  } catch (error) {
    console.error('Error getting image from S3:', error);
    throw error;
  }
}

export async function checkImageExists(bucketName, imagePath) {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: imagePath
    });
    await s3Client.send(command);
    return true;
  } catch (error) {
    if (error.name === 'NoSuchKey') {
      return false;
    }
    throw error;
  }
}
