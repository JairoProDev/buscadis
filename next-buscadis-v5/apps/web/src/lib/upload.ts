import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

export async function generateUploadUrl(key: string) {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Expires: 600,
  })

  return { url, fields }
} 