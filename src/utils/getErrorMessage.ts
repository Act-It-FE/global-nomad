import axios from 'axios';

export default function getErrorMessage(
  error: unknown,
  defaultMessage: string,
) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? defaultMessage;
  }
  return defaultMessage;
}
