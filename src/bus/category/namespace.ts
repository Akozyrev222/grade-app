export namespace Category {
  export type Item = {
    id: number;
    title: string;
    children_count: number;
  };

  export type ReqFetchItems = {
    name: string;
  };

  export type ResFetchItems = {
    categories: Item[];
  };
}
