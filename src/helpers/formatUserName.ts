type TArgs = {
  fullName: string;
};

export const formatUserName = ({fullName}: TArgs): string => {
  const arr = fullName.split(' ');

  if (arr.length) {
    return arr[0];
  }

  return '';
};
