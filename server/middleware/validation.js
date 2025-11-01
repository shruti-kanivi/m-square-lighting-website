// Validation middleware for contact form
const validateContactForm = (req, res, next) => {
  const { name, email, projectType, message } = req.body;
  const errors = [];

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }

  // Project type validation
  const validProjectTypes = ['residential', 'commercial', 'outdoor', 'smart', 'architectural', 'other'];
  if (!projectType || !validProjectTypes.includes(projectType)) {
    errors.push('Please select a valid project type');
  }

  // Message validation
  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = {
  validateContactForm
};
