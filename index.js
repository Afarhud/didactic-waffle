const { Client, Databases } = require('node-appwrite');

module.exports = async (req, res) => {
  try {
    // 1. Initialize Appwrite Client
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    // 2. Save execution time to DB
    const databases = new Databases(client);
    await databases.createDocument(
      '684aab9a0030ea5ac942',
      '684aabb50023d485ae3a',
      'unique()',
      {
        executionTime: new Date().toISOString(),
        status: "executed"
      }
    );

    // 3. Redirect to Google
    return res.redirect('https://www.google.com', 302);

  } catch (error) {
    console.error('Error:', error);
    
    // روش صحیح بازگرداندن خطا
    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown error'
    });
  }
};