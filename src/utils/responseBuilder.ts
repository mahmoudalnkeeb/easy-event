export type R = {
  message: string;
  data: Object | null;
  success: boolean;
};

export default function buildResponse(
  message: string,
  data: Object | null,
  success: boolean
): R {

  return {
    message , data , success
  }
}
