const hasher = async (str: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    console.log("Error in hash function", error);
    return "";
  }
};

export default hasher;
