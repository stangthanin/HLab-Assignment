export class ResponseDto<T = any> {
  message: string;
  data?: T;
}

export const getResponse = <T>(data: T = undefined, message: string | string[] = '') => {
  return {
    message,
    data,
  } as ResponseDto<T>;
};
