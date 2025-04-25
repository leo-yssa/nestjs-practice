import { RegisterDeviceInputVO } from '../vo/input/register-device.vo';
import { RegisterDeviceResultVO } from '../vo/result/register-device.vo';

export interface IDeviceRepository {
  register(device: RegisterDeviceInputVO): Promise<RegisterDeviceResultVO>;
  getPublicKey(uniqueId: string): Promise<string>;
}
