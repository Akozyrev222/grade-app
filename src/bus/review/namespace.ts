import {Asset} from 'react-native-image-picker';
import {User} from '../user';

export namespace Review {
  export type Item = {
    id: number;

    creator: User.Item;
    rating: number;
    text: string;

    feedback_images: Image[];
  };

  export type Image = {
    image: string;
  };

  export type ReqCreateItem = {
    text: string;
    recipient_id: number;

    rating: number;
    feedback_images_attributes: Asset[];
  };
}
