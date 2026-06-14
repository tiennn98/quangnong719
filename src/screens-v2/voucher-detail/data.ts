import { VoucherDetailData } from './types';

export const DEFAULT_VOUCHER_DETAIL: VoucherDetailData = {
  id: '1',
  badge: 'VOUCHER',
  title: 'Giảm 50.000đ đơn từ 1.000.000đ',
  subtitle: 'Dành cho đơn hàng từ 1.000.000đ trở lên',
  expiryLabel: 'Còn 3 ngày',
  conditions: [
    {
      id: '1',
      text: 'Áp dụng cho đơn hàng từ 1.000.000đ trở lên',
      type: 'check',
    },
    {
      id: '2',
      text: 'Không áp dụng đồng thời với các voucher khác',
      type: 'info',
    },
  ],
  products: [
    { id: '1', label: 'Phân bón', icon: 'leaf' },
    { id: '2', label: 'Thuốc BVTV', icon: 'bottle' },
    { id: '3', label: 'Dinh dưỡng lá', icon: 'leaf' },
  ],
  startDate: '12/05/2025 • 00:00',
  endDate: '18/05/2025 • 23:59',
  usageSteps: [
    {
      id: '1',
      step: 1,
      title: 'Chọn sản phẩm',
      description: 'Thêm sản phẩm vào giỏ hàng',
    },
    {
      id: '2',
      step: 2,
      title: 'Nhập voucher',
      description: 'Chọn hoặc nhập mã voucher ở trang thanh toán',
    },
    {
      id: '3',
      step: 3,
      title: 'Giảm giá tự động',
      description: 'Hệ thống sẽ áp dụng ưu đãi cho đơn hàng',
    },
  ],
};
