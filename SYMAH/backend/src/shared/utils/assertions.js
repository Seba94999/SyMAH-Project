const { DomainError } = require("../errors/domain-error");

function assertCondition(condition, message, details = {}) {
  if (!condition) {
    throw new DomainError(message, details);
  }
}

function assertNonEmptyString(value, fieldName) {
  assertCondition(typeof value === "string", `${fieldName} must be a string`, {
    fieldName,
  });
  assertCondition(value.trim().length > 0, `${fieldName} is required`, {
    fieldName,
  });
}

function assertNumber(value, fieldName, { min = null, max = null } = {}) {
  assertCondition(
    Number.isFinite(value),
    `${fieldName} must be a valid number`,
    {
      fieldName,
    },
  );

  if (min !== null) {
    assertCondition(value >= min, `${fieldName} must be >= ${min}`, {
      fieldName,
      min,
    });
  }

  if (max !== null) {
    assertCondition(value <= max, `${fieldName} must be <= ${max}`, {
      fieldName,
      max,
    });
  }
}

function assertEnum(value, allowedValues, fieldName) {
  assertCondition(
    allowedValues.includes(value),
    `${fieldName} has invalid value`,
    {
      fieldName,
      allowedValues,
      received: value,
    },
  );
}

function assertIsoDate(value, fieldName) {
  assertNonEmptyString(value, fieldName);
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

  assertCondition(
    isoDatePattern.test(value),
    `${fieldName} must use YYYY-MM-DD format`,
    {
      fieldName,
    },
  );

  const date = new Date(`${value}T00:00:00.000Z`);
  assertCondition(
    !Number.isNaN(date.getTime()),
    `${fieldName} must be a valid date`,
    {
      fieldName,
    },
  );
}

function assertTime(value, fieldName) {
  assertNonEmptyString(value, fieldName);
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

  assertCondition(
    timePattern.test(value),
    `${fieldName} must use HH:mm format`,
    {
      fieldName,
    },
  );
}

module.exports = {
  assertCondition,
  assertNonEmptyString,
  assertNumber,
  assertEnum,
  assertIsoDate,
  assertTime,
};
