const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET || 'your-bucket-name');

module.exports = {
  uploadFile: async (filePath, destination) => {
    await bucket.upload(filePath, { destination });
    return `Plik ${destination} został przesłany.`;
  }
};
