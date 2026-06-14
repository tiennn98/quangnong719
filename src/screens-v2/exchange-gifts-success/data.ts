import { RedemptionSuccessData } from './types';

export const DEFAULT_SUCCESS_DATA: RedemptionSuccessData = {
  giftTitle: 'Áo mưa Quang Nông',
  giftPoints: 350,
  giftDescription:
    'Áo mưa tiện dụng, chống thấm tốt, đồng hành cùng bà con mùa mưa.',
  remainingPoints: 434,
  nextSteps: [
    {
      id: '1',
      step: 1,
      title: 'Đại lý xác nhận',
      description: 'Đại lý sẽ xác nhận đơn đổi quà của bạn.',
      icon: 'store',
    },
    {
      id: '2',
      step: 2,
      title: 'Chuẩn bị quà',
      description: 'Quà sẽ được chuẩn bị và đóng gói cẩn thận.',
      icon: 'box',
    },
    {
      id: '3',
      step: 3,
      title: 'Nhận tại cửa hàng hoặc giao cùng đơn',
      description:
        'Bạn có thể nhận tại cửa hàng hoặc nhận cùng đơn hàng khi giao hàng tiếp theo.',
      icon: 'truck',
    },
  ],
};
