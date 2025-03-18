export namespace Currencies {
  export type Item = {
    id: number;
    code: string;
    label: string;
    name: string;
  };

  export type ResFetchItems = {
    currencies: Item[];
  };
}
