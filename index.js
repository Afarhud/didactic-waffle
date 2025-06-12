const { Client, Databases } = require('node-appwrite');

module.exports = async ({ req, res, log, error }) => {
  try {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

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

    // Simple response
    return res.json({
      success: true,
      redirectUrl: 'https://yahoo.com'
    });

  } catch (err) {
    error(`Error: ${err.message}`);
    return res.json({
      success: false,
      error: err.message
    }, 500);
  }
};