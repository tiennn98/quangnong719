import { EventDetailData } from './types';

export const DEFAULT_EVENT_DETAIL: EventDetailData = {
  id: '1',
  title: 'Hội thảo mùa mưa 2026',
  subtitle: 'Tư vấn kỹ thuật chuyên sâu – Nhận quà tặng hấp dẫn! 🎁',
  status: 'Sắp diễn ra',
  date: '20/06/2026 (Thứ Bảy)',
  time: '09:00 – 12:00',
  location: 'Quang Nông 719 – Krông Pắc',
  intro:
    'Cùng Quang Nông 719 cập nhật giải pháp canh tác hiệu quả trong mùa mưa – Phòng trừ sâu bệnh – Tăng năng suất – Tối ưu chi phí.',
  features: [
    { id: '1', label: 'Cập nhật kỹ thuật tiên tiến', icon: 'sprout' },
    { id: '2', label: 'Giải pháp phòng trừ sâu bệnh mùa mưa', icon: 'shield' },
    { id: '3', label: 'Tối ưu chi phí – tăng hiệu quả', icon: 'chart' },
    { id: '4', label: 'Giao lưu – hỏi đáp cùng chuyên gia', icon: 'message' },
  ],
  startTime: '09:00, Thứ Bảy, 20/06/2026',
  fullLocation:
    'Quang Nông 719 – Krông Pắc, Xã Ea Kly, Huyện Krông Pắc, Tỉnh Đắk Lắk',
  seatsRemaining: 64,
  seatsTotal: 120,
  giftsSummary: 'Nhiều phần quà hấp dẫn dành cho khách tham dự',
  mainContent: [
    'Tổng quan về kỹ thuật canh tác mùa mưa',
    'Tư vấn phân bón và dinh dưỡng cây trồng',
    'Giải pháp phòng trừ sâu bệnh hiệu quả',
    'Giao lưu, hỏi đáp trực tiếp cùng chuyên gia',
  ],
  speakers: [
    {
      id: '1',
      name: 'KS. Nguyễn Văn Hòa',
      title: 'Chuyên gia kỹ thuật canh tác',
    },
    {
      id: '2',
      name: 'ThS. Trần Minh Tuấn',
      title: 'Chuyên gia bảo vệ thực vật',
    },
    {
      id: '3',
      name: 'Quang Nông 719',
      title: 'Đơn vị tổ chức',
    },
  ],
  participationGifts:
    'Túi xách, chai thuốc BVTV, hộp quà tặng và voucher ưu đãi cho người tham dự.',
  conditions:
    'Dành cho nông dân, đại lý và khách hàng Quang Nông 719. Miễn phí tham dự, đăng ký trước để giữ chỗ.',
};
