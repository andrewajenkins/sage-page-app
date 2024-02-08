// Import MongoClient from the MongoDB driver
import { MongoClient } from "mongodb";
import {env} from "./env";

// Define your MongoDB connection details
const host = "docdb-2024-02-04-02-02-35.c1ci02igya52.us-east-1.docdb.amazonaws.com:27017";
const username = "dbroot";
const password = env.dbPassword; // Use environment variables or a secure method to handle the password
const sslCAFile = "../global-bundle.pem"; // Ensure this path is correct

// Create a new MongoClient instance
const url = `mongodb://${username}:${password}@${host}/?tls=true`;
const client = new MongoClient(url, {
    tlsCAFile: sslCAFile,
});

// Parse command-line arguments
const args = process.argv.slice(2);

async function listDatabases() {
    try {
        await client.connect();
        const databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } finally {
        await client.close();
    }
}

async function printAllDocuments(databaseName: string) {
    try {
        await client.connect();
        const db = client.db(databaseName);
        const collections = await db.collections();

        for (const collection of collections) {
            const documents = await collection.find({}).toArray();
            console.log(`Contents of ${collection.collectionName}:`);
            console.log(documents);
        }
    } finally {
        await client.close();
    }
}

// Check command-line flags and execute the corresponding function
if (args[0] === "--databases") {
    listDatabases();
} else if (args[0] === "--print-all" && args[1]) {
    printAllDocuments(args[1]);
} else {
    console.log("Usage: ts-node script.ts --databases | --print-all <databaseName>");
}
