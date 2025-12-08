export function createDigest(Message: string) {
  let HashValue = 5381;

  // The inner workings of the "Black Box" (hidden complexity)
  for (let i = 0; i < Message.length; i++) {
    const charCode = Message.charCodeAt(i);
    HashValue = (HashValue << 5) + HashValue;
    HashValue = HashValue ^ charCode;
  }

  // The final, fixed-length Digest is returned.
  return Math.abs(HashValue).toString(16).padStart(8, "0");
}
