const { Client, Databases } = require('node-appwrite');

module.exports = async ({ req, res, log, error }) => {
  try {
    // Initialize Appwrite Client
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    // Save execution time to DB
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

    // اضافه کردن هدرهای CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Appwrite-Project');

    // Return success response
    return res.json({
      success: true,
      message: "تابع با موفقیت اجرا شد",
      redirectUrl: 'https://anten.ir'
    });

  } catch (err) {
    // Log error properly
    error(`Error: ${err.message}`);
    
    // اضافه کردن هدرهای CORS برای خطا هم
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.json({
      success: false,
      error: err.message
    }, 500);
  }
};