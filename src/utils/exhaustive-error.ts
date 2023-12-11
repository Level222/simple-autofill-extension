class ExhaustiveError extends Error {
  constructor(value: never, message = `Unsupported value: ${value}`) {
    super(message);
  }
}

export default ExhaustiveError;
