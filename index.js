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

    // Return success response with CORS headers
    return res.json({
      success: true,
      redirectUrl: 'https://anten.ir'
    }, 200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    });

  } catch (err) {
    // Log error properly
    error(`Error: ${err.message}`);
    
    // Return error response with CORS headers
    return res.json({
      success: false,
      error: err.message
    }, 500, {
      'Access-Control-Allow-Origin': '*'
    });
  }
};