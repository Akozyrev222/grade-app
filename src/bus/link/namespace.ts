import {Environment} from './../../configs/env/base';

export namespace Link {
  export type Item = Environment['BASE_URL'] | Environment['BASE_URL_PROD'];
}
