export const normalizeMobileNumber = (mobileNumber: string): string | null => {
  // Regular expression to match and capture valid mobile number formats
  const regex = /^(?:0|98)?(9\d{9})$/;

  // Test if the mobile number matches the accepted formats
  const match = mobileNumber.match(regex);

  if (match) {
    // Extract the normalized 10-digit mobile number (9xxxxxxxxx)
    const normalized = match[1];

    // Convert to the first form (093xxxxxxxx)
    return `0${normalized}`;
  } else {
    // Return null or throw an error for invalid input
    return null;
  }
};
