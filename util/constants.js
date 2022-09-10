const NONULL_VIOLATION_ERROR = {
  message: 'notNull Violation:',
  customMessage: 'Required field is missing',
  status: 400,
};

const USERNAME_ISEMAIL_VALIDATION_ERROR = {
  message: 'Validation error: Validation isEmail on username failed',
  customMessage: 'Username must be an email',
  status: 400,
};

const YEAR_ISAFTER_VALIDATION_ERROR = {
  message: 'Validation error: Validation isAfter on year failed',
  customMessage: 'Year must be between 1991 and current year',
  status: 400,
};

const YEAR_ISBEFORE_VALIDATION_ERROR = {
  message: 'Validation error: Validation isBefore on year failed',
  customMessage: 'Year must be between 1991 and current year',
  status: 400,
};

const customErrors = [
  NONULL_VIOLATION_ERROR,
  USERNAME_ISEMAIL_VALIDATION_ERROR,
  YEAR_ISAFTER_VALIDATION_ERROR,
  YEAR_ISBEFORE_VALIDATION_ERROR,
];

module.exports = { customErrors };
