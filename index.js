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
      '684aab9a0030ea5ac942',      // جایگزینی با ID دیتابیس
      '684aabb50023d485ae3a',    // جایگزینی با ID کالکشن
      'unique()',           // Auto-generated Document ID
      {
        executionTime: new Date().toISOString(),
        status: "executed"
      }
    );

    // 3. Redirect to Google (کاربر را به گوگل هدایت می‌کند)
    res.setHeader('Location', 'https://www.google.com');
    return res.send('', 302);

  } catch (error) {
    console.error('Error:', error);
    return res.json({ error: error.message }, 500);
  }
};