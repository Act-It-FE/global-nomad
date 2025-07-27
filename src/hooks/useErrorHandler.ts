export default function useErrorHandler(error: unknown, message: string) {
  if (error && typeof error === 'object' && 'response' in error) {
    return (
      (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message || message
    );
  }
  return message;
}
