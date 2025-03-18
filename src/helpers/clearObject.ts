type TArgs = {
  obj: {
    [key: string]: any;
  };
  callback: (item: any) => boolean;
};

type TReturn = {
  [key: string]: any;
};

export const clearObject = ({obj, callback}: TArgs): TReturn => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => callback(value)),
  );
};
