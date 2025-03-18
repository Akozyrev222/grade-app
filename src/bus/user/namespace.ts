import {Payment} from '../payment';
import {Review} from '../review';
import {Role} from '../role';

export namespace User {
  export type Item = {
    id: number;
    address: string;
    description: string;
    email: string;
    user_role: 'executor' | 'customer';
    full_name: string;
    latitude: number | null;
    longitude: number | null;
    phone: string;
    phones: DinamycPhone[];
    customer: boolean;
    created_at: string;
    finished_task_count: string;
    avatar: Photo | null;
    role: Role.Item;
    favorite: boolean;
    referral_code?: string;
    executor: {
      specialities: Speciality[] | null;
      tags: Tag[];
      need_verification: boolean;
      approved: boolean;
      vip: VipStatus;
      top_end_time: string;
      vip_end_time: string;
      id: number;
    };

    online: boolean | string;
    last_online_time: string;

    chat_id: number;
    chat_ids: number[];
    auth_token?: string;
    rating: number;
    not_read_count: number;
    is_complete?: boolean;
    feedbacks: Review.Item[];
  };

  export type VipStatus = 'default' | Payment.VipStatus;

  export type Photo = {
    extra_small: {
      url: string;
    };
    large: {
      url: string;
    };
    normal: {
      url: string;
    };
    small: {
      url: string;
    };
    url: string;
    isOld?: boolean;
  };

  export type Speciality = {
    id: number;
    name: string;
  };

  export type Tag = {
    name: string;
    id: number;
  };

  export type ResFetchDetail = {
    user: Item;
  };

  export type ReqVerificate = FormData;

  export type ResVerificate = {
    message: string;
  };

  export type DinamycPhone = {
    value: string;
    id: number;
    _destroy?: boolean;
    code: string;
  };

  export type Phone = {
    value: string;
    id: number;
    _destroy?: boolean;
  };

  export type ReqUpdateDetail = {
    full_name: {
      value: string;
      isSkip: boolean;
    };
    description: string;
    address: string;
    executor_attributes?: {
      tags_array: string[];
      speciality: number | null;
      id: number;
    };
    phone: {
      value: string;
      isSkip?: boolean;
    };
    phones_attributes: Phone[];
    latitude: number | null;
    longitude: number | null;
    avatar: Asset | Photo | null;
  };

  export type ResUpdateDetail = {
    update_phone?: boolean;
  };

  export type Asset = {
    uri: string;
    type: string;
    name: string;
    isOld?: boolean;
  };

  export type UpdateDetailForm = {
    description: string;
    address: string;
    phone: string;
    phones_attributes: DinamycPhone[];
    avatar: Photo | Asset | null;
    latitude: number | null;
    longitude: number | null;
    full_name: string;
    tags: Tag[];
    specialities: Speciality[] | [];
  };

  export type ReqConfirmPhone = {
    phone: string;
    new_phone: string;
    password: string;
  };

  export type ResConfirmPhone = {
    success: true;
  };

  export type ReqUpdateDeviceToken = {
    device_token: string;
  };

  export type CreateExecutorForm<T = Tag, S = Speciality> = {
    tags_array: T[];
    speciality_ids: string[];
  };

  export type ReqCreateExecutor = {
    executor_attributes: CreateExecutorForm<string, number>;
  };

  export type PromoCode = {
    code: string;
    identifier: string;
    days?: number;
  };

  export type Image = {
    fileName: string;
    fileSize: number;
    height: number;
    width: number;
    type: string;
    uri: string;
  };
}
