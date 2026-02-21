import { uploadImage } from './src/utils/r2.js';
import dotenv from 'dotenv';

dotenv.config();

const testBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

async function testR2Connection() {
  try {
    console.log('Testing R2 connection...');
    console.log('Account ID:', process.env.R2_ACCOUNT_ID);
    console.log('Bucket:', process.env.R2_BUCKET_NAME);
    
    const url = await uploadImage(testBase64, 'test.png');
    
    console.log('✅ Upload successful!');
    console.log('Image URL:', url);
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
  }
}

testR2Connection();
