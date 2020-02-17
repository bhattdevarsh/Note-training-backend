import { ConnectedDeviceService } from './connected-device/connected-device.service';
import { ClientTokenManagerService } from './client-token-manager/client-token-manager.service';

export const AuthAggregates = [
  ConnectedDeviceService,
  ClientTokenManagerService,
];
