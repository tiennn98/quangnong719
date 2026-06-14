import { QrProfileData, UsageInfoItemData } from './types';

export const DEFAULT_QR_PROFILE: QrProfileData = {
  fullName: 'Quang Nông 719',
  phone: '0922982986',
  customerCode: '0922982986',
  memberLabel: 'Member',
  points: 784,
  qrValue: 'QN7190922982986',
  userCode: 'QN7190922982986',
};

export const USAGE_INFO_ITEMS: UsageInfoItemData[] = [
  {
    id: 'shopping',
    title: 'Sử dụng khi mua hàng',
    subtitle: 'Quét mã tại quầy để tích điểm và nhận ưu đãi',
    icon: 'shopping',
  },
  {
    id: 'checkin',
    title: 'Check-in sự kiện',
    subtitle: 'Quét mã để tham gia và nhận điểm sự kiện',
    icon: 'calendar',
  },
  {
    id: 'voucher',
    title: 'Nhận voucher & ưu đãi',
    subtitle: 'Nhận các ưu đãi dành riêng cho thành viên',
    icon: 'voucher',
  },
];
