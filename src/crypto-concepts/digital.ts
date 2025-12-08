import * as crypto from "crypto";

// --- Digital Signature Configuration ---
// Generate a key pair (Public/Private) - This is usually done once per user.
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048, // Standard key size
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

/**
 * Creates a digital signature for a message using the sender's private key.
 */
function createDigitalSignature(message: string): string {
  // Step 1: Hashing - The message is first hashed (SHA256).
  // Step 2: Signing - The hash (digest) is encrypted using the SENDER'S PRIVATE KEY.
  // This signature proves the sender possesses the corresponding private key.
  const signer = crypto.createSign("SHA256");
  signer.update(message);
  return signer.sign(privateKey, "base64");
}

/**
 * Verifies a digital signature using the sender's public key.
 */
function verifyDigitalSignature(message: string, signature: string): boolean {
  // Step 1: Decrypt Signature - The verifier uses the SENDER'S PUBLIC KEY to decrypt the signature,
  // which yields the original hash (digest) created by the sender.
  // Step 2: Re-Hash - The verifier independently hashes the received message.
  // Step 3: Compare - If the decrypted hash matches the re-hashed message, the signature is valid.
  const verifier = crypto.createVerify("SHA256");
  verifier.update(message);
  return verifier.verify(publicKey, signature, "base64");
}

// --- Example Usage (Use Case: Authenticating a Software Update) ---

const contract = "I, Alice, agree to sell the car for $10,000.";

// Alice (the sender) signs the contract
const signature = createDigitalSignature(contract);
console.log("\n--- 3. Digital Signature Example (RSA/Asymmetric) ---");
console.log("Contract Signed by Alice.");
console.log(`Generated Signature: ${signature.substring(0, 30)}...`); // Long string

// Bob (the receiver) verifies the signature
const isVerified = verifyDigitalSignature(contract, signature);
console.log(
  `\nVerification Result (Original Contract): ${
    isVerified ? "✅ VALID" : "❌ INVALID"
  }`
);

// --- Tampering Example ---
const tamperedContract = "I, Alice, agree to sell the car for $1,000."; // Price changed!
const isTamperedVerified = verifyDigitalSignature(tamperedContract, signature);

console.log(
  `\nVerification Result (Tampered Contract): ${
    isTamperedVerified ? "✅ VALID" : "❌ INVALID"
  }`
);
