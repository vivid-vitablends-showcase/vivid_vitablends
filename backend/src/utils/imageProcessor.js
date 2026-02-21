import sharp from 'sharp';

export const processImage = async (buffer) => {
  return sharp(buffer)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
};

export const parseBase64Image = (base64Image) => {
  const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
  if (!matches) return null;
  return Buffer.from(matches[2], 'base64');
};
