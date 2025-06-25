exports.validateInput = (data, requiredFields) => {
  const missingFields = requiredFields.filter(field => !data[field]);
  if (missingFields?.length) {
    return `Missing required fields: ${missingFields.join(', ')}`;
  }
  if (data.email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))) {
    return 'Invalid email format';
  }
  if (data.password && data.password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  return null;
};