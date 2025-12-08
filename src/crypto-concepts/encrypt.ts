import * as crypto from "crypto";

// --- Symmetric Encryption Configuration ---
const SYMMETRIC_ALGORITHM = "aes-256-gcm"; // Advanced Encryption Standard, 256-bit key, Galois/Counter Mode (secure)
const ENCRYPTION_KEY = crypto.randomBytes(32); // 32 bytes = 256 bits, required for AES-256

/**
 * Encrypts plaintext using a secret key.
 * @param plaintext The data to be scrambled.
 * @returns An object containing the ciphertext and the initialization vector (IV).
 */
function encrypt(plaintext: string): {
  ciphertext: string;
  iv: string;
  tag: string;
} {
  // We need encryption to ensure confidentiality, so only the key-holder can read the data.
  const iv = crypto.randomBytes(16); // Initialization Vector: Must be unique for every encryption!
  const cipher = crypto.createCipheriv(SYMMETRIC_ALGORITHM, ENCRYPTION_KEY, iv);

  let ciphertext = cipher.update(plaintext, "utf8", "hex");
  ciphertext += cipher.final("hex"); // Finalize the cipher process

  // GCM provides an authentication tag (integrity check), which is crucial for security.
  const tag = cipher.getAuthTag().toString("hex");

  return { ciphertext, iv: iv.toString("hex"), tag };
}

/**
 * Decrypts ciphertext using the same secret key.
 * @param encryptedData The ciphertext, IV, and tag object.
 * @returns The original plaintext string.
 */
function decrypt(encryptedData: {
  ciphertext: string;
  iv: string;
  tag: string;
}): string {
  // Decryption is needed to restore the original, readable message.
  const iv = Buffer.from(encryptedData.iv, "hex");
  const tag = Buffer.from(encryptedData.tag, "hex");

  try {
    const decipher = crypto.createDecipheriv(
      SYMMETRIC_ALGORITHM,
      ENCRYPTION_KEY,
      iv
    );
    decipher.setAuthTag(tag); // Set the authentication tag for verification

    let plaintext = decipher.update(encryptedData.ciphertext, "hex", "utf8");
    plaintext += decipher.final("utf8"); // Finalize the decryption process
    return plaintext;
  } catch (error) {
    // If the key is wrong OR the ciphertext/tag was tampered with, decryption fails here.
    return "Decryption failed: Key or data is incorrect/tampered.";
  }
}

// --- Example Usage (Use Case: Secure Communication/VPN) ---

const originalMessage = "hi!, This is a secret text!";
const encryptedResult = encrypt(originalMessage);
const decryptedResult = decrypt(encryptedResult);

console.log("\n--- 2. Encryption/Decryption Example (Symmetric) ---");
console.log(`Original Message: ${originalMessage}`);
console.log(`Encrypted Data (Ciphertext): ${encryptedResult.ciphertext}...`); // Unreadable!
console.log(`Decrypted Result: ${decryptedResult}`); // Should match the original

// Example of Tampering (will fail due to GCM's tag check)
const tamperedData = { ...encryptedResult, ciphertext: "1234567890abcdef" };
const tamperedDecryption = decrypt(tamperedData);
console.log(`\nAttempted Tamper Decrypt: ${tamperedDecryption}`); // Shows decryption failure.
