import {ApplicationState} from './../bus/application/types';
import {combineReducers} from '@reduxjs/toolkit';

//types
import {UiState} from '@/bus/ui/types';
import {RoleState} from '@/bus/role/types';
import {AppState} from '@/bus/app/types';
import {AuthState} from '@/bus/auth/types';
import {FilterState} from '@/bus/filter/types';
import {UserState} from '@/bus/user/types';
import {OrderState} from '@/bus/order/types';
import {ExecutorState} from '@/bus/executor/types';
import {CategoryState} from '@/bus/category/types';
import {MessageState} from '@/bus/message/types';
import {PaymentState} from '@/bus/payment/types';
import {RoomState} from '@/bus/room/types';
import {SocketState} from '@/bus/socket/types';
import {FavoriteState} from '@/bus/favorite/types';
import {CurrenciesState} from '@/bus/currencies/types';
import {LinkState} from '@/bus/link/types';

//reducers
import {uiReducer} from '@/bus/ui';
import {roleReducer} from '@/bus/role';
import {appReducer} from '@/bus/app';
import {authReducer} from '@/bus/auth';
import {filterReducer} from '@/bus/filter';
import {userReducer} from '@/bus/user';
import {orderReducer} from '@/bus/order';
import {categoryReducer} from '@/bus/category';
import {executorReducer} from '@/bus/executor';
import {applicationReducer} from '@/bus/application';
import {paymentReducer} from '@/bus/payment';
import {messageReducer} from '@/bus/message';
import {roomReducer} from '@/bus/room';
import {socketReducer} from '@/bus/socket';
import {favoriteReducer} from '@/bus/favorite';
import {ReportState} from '@/bus/report/types';
import {reportReducer} from '@/bus/report';
import {reviewReducer} from '@/bus/review';
import {ReviewState} from '@/bus/review/types';
import {currenciesReducer} from '@/bus/currencies';
import {referralProgramReducer} from '@/bus/referral_program';
import {ReferralProgramState} from '@/bus/referral_program/types';
import {settingsReducer} from '@/bus/settings';
import {SettingsState} from '@/bus/settings/types';
import {linkReducer} from '@/bus/link';

const rootReducer = combineReducers({
  ui: uiReducer,
  role: roleReducer,
  app: appReducer,
  auth: authReducer,
  filter: filterReducer,
  user: userReducer,
  order: orderReducer,
  category: categoryReducer,
  executor: executorReducer,
  application: applicationReducer,
  payment: paymentReducer,
  message: messageReducer,
  room: roomReducer,
  socket: socketReducer,
  favorite: favoriteReducer,
  report: reportReducer,
  review: reviewReducer,
  currencies: currenciesReducer,
  referral_program: referralProgramReducer,
  settings: settingsReducer,
  link: linkReducer,
});

export type RootState = {
  ui: UiState;
  role: RoleState;
  app: AppState;
  auth: AuthState;
  filter: FilterState;
  user: UserState;
  order: OrderState;
  category: CategoryState;
  executor: ExecutorState;
  application: ApplicationState;
  payment: PaymentState;
  message: MessageState;
  room: RoomState;
  socket: SocketState;
  favorite: FavoriteState;
  report: ReportState;
  review: ReviewState;
  currencies: CurrenciesState;
  referral_program: ReferralProgramState;
  settings: SettingsState;
  link: LinkState;
};

export default rootReducer;
