import * as crypto from "crypto";

// --- Hashing Configuration ---
const HASH_ALGORITHM = "sha256"; // Standard and secure hashing algorithm

function createHash(data: string): string {
  // We need hashing to verify data integrity or securely store passwords.
  // The same input MUST always produce the same output.
  // A tiny change in input MUST produce a completely different output.
  return crypto
    .createHash(HASH_ALGORITHM)
    .update(data) // Pass the data to the hashing function
    .digest("hex"); // Output the hash as a hexadecimal string
}

// --- Example Usage (Use Case: Password/File Integrity) ---

const originalData = "The secret meeting is at 10 PM.";
const originalHash = createHash(originalData);

const modifiedData = "The secret meeting is at 10 PM.."; // Only a tiny change (10 -> 11)
const modifiedHash = createHash(modifiedData);

console.log("--- 1. Hashing Example ---");
console.log(`Original Data: "${originalData}"`);
console.log(`Original Hash: ${originalHash}`); // e.g., 'a1b2c3...'

console.log(`\nModified Data: "${modifiedData}"`);
console.log(`Modified Hash: ${modifiedHash}`); // e.g., 'x9y8z7...' (Completely different!)

// Use Case: Password verification check
if (originalHash === createHash("The secret meeting is at 10 PM.")) {
  console.log("\nIntegrity Check: MATCH - Data is unchanged."); // This is how a login works.
} else {
  console.log("\nIntegrity Check: FAIL - Data has been tampered with.");
}
