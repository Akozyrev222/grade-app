type TArgs = {
  neededLength?: number;
  value: string;
};

export const cutString = ({neededLength = 21, value}: TArgs) =>
  value.slice(0, neededLength);
