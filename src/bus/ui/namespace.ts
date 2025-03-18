export namespace Ui {
  export type FormName =
    | 'role'
    | 'language'
    | 'specialization'
    | 'distance'
    | 'sign_up'
    | 'logout'
    | 'code'
    | 'user'
    | 'verification'
    | 'order'
    | 'order_update'
    | 'user_update'
    | 'category'
    | 'executor'
    | 'application'
    | 'payment'
    | 'room'
    | 'message'
    | 'favorite'
    | 'report'
    | 'review'
    | 'order_action';

  export type Loader = {
    name: FormName;
    loading: boolean;
  };

  export type Error = {
    name: FormName;
    message: string;
  };

  export type Form = {
    name: FormName;
    reset: boolean;
  };

  export type Success = {
    name: FormName;
    message: string;
  };
}
