const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'portfolio';

async function setupMongoDB() {
  console.log('🔗 Connecting to MongoDB...');
  console.log('URI:', MONGODB_URI);
  console.log('Database:', DATABASE_NAME);
  
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    console.log('✅ Connected to MongoDB successfully!');
    
    const db = client.db(DATABASE_NAME);
    
    // Create contacts collection if it doesn't exist
    const collections = await db.listCollections().toArray();
    const contactsExists = collections.some(col => col.name === 'contacts');
    
    if (!contactsExists) {
      await db.createCollection('contacts');
      console.log('📋 Created "contacts" collection');
    } else {
      console.log('📋 "contacts" collection already exists');
    }
    
    // Create index on createdAt for better query performance
    await db.collection('contacts').createIndex({ createdAt: -1 });
    console.log('🗂️  Created index on createdAt field');
    
    // Check existing documents
    const count = await db.collection('contacts').countDocuments();
    console.log(`📊 Current contact submissions: ${count}`);
    
    if (count > 0) {
      console.log('\n📝 Recent submissions:');
      const recent = await db.collection('contacts')
        .find({})
        .sort({ createdAt: -1 })
        .limit(3)
        .toArray();
      
      recent.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.name} (${contact.email}) - ${contact.subject}`);
      });
    }
    
    await client.close();
    console.log('\n🎉 MongoDB setup completed successfully!');
    console.log('\n📝 Your contact form is now ready to receive submissions!');
    console.log('🔗 Visit: http://localhost:3000 to test the contact form');
    console.log('👥 Admin dashboard: http://localhost:3000/admin (use admin key: demo-admin-key-123)');
    
  } catch (error) {
    console.error('❌ MongoDB setup failed:', error.message);
    process.exit(1);
  }
}

setupMongoDB();
