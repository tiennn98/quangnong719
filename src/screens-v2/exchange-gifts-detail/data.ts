import { GiftDetailData } from './types';

export const DEFAULT_GIFT_DETAIL: GiftDetailData = {
  id: '2',
  title: 'Áo mưa Quang Nông',
  points: 350,
  description:
    'Áo mưa cao cấp Quang Nông 719 – Bền bỉ, tiện lợi, đồng hành cùng bà con trong mùa mưa.',
  inStock: true,
  features: [
    {
      id: '1',
      title: 'Chất liệu cao cấp',
      description: 'Vải dù dày dặn, chống thấm nước tốt',
      icon: 'shield',
    },
    {
      id: '2',
      title: 'Thiết kế tiện lợi',
      description: 'Rộng rãi, thoáng mát, mặc dễ dàng',
      icon: 'droplet',
    },
    {
      id: '3',
      title: 'Bền bỉ, chắc chắn',
      description: 'Đường may chắc chắn, sử dụng lâu dài',
      icon: 'leaf',
    },
  ],
  methods: [
    {
      id: 'store',
      title: 'Nhận tại cửa hàng',
      description: 'Đến cửa hàng Quang Nông gần nhất để nhận quà',
      icon: 'store',
    },
    {
      id: 'delivery',
      title: 'Giao cùng đơn hàng',
      description: 'Giao quà cùng với đơn hàng sản phẩm tiếp theo của bạn',
      icon: 'truck',
    },
  ],
  stockRemaining: 126,
  stockTotal: 500,
  stockUpdatedAt: 'Cập nhật lúc 09:30 hôm nay',
  currentPoints: 784,
};
