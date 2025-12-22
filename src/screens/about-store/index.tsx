import CAccordion, { AccordionProps } from '@/components/accordion';
import CText from '@/components/text';
import { Colors } from '@/themes/color';
import React, { useCallback, useMemo } from 'react';
import { Keyboard, SafeAreaView, View } from 'react-native';
import { fontScale } from 'react-native-utils-scale';
import { styles } from './style.module';

import CButton from '@/components/button';
import CDropdown, { DropdownItem } from '@/components/dropdown';
import CInput from '@/components/input';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

type ContactFormValues = {
  fullName: string;
  phone: string;
  topic: string;
  message: string;
};

const TOPIC_OPTIONS: DropdownItem<string>[] = [
  { label: 'Invoice & Payment', value: 'invoice_payment' },
  { label: 'Product Information', value: 'product_information' },
  { label: 'Technical Support', value: 'technical_support' },
  { label: 'Events & Workshops', value: 'events_workshops' },
  { label: 'Other', value: 'other' },
];

const FAQ_LIST: AccordionProps[] = [
  {
    question: 'Tôi thanh toán hóa đơn bằng cách nào?',
    answer:
      'Quý khách có thể thanh toán trực tiếp tại cửa hàng bằng tiền mặt, chuyển khoản hoặc quét mã QR theo hướng dẫn của nhân viên.',
    initialOpen: true,
  },
  {
    question: 'Tôi sử dụng voucher / phiếu ưu đãi như thế nào?',
    answer:
      'Khi mua hàng, quý khách chỉ cần mở voucher trên ứng dụng hoặc đưa mã voucher cho nhân viên. Hệ thống sẽ tự động kiểm tra điều kiện và áp dụng nếu hợp lệ.',
  },
  {
    question: 'Làm sao để đăng ký tham gia sự kiện, hội thảo?',
    answer:
      'Quý khách có thể đăng ký trực tiếp trên ứng dụng, website hoặc đăng ký tại cửa hàng. Sau khi đăng ký thành công, hệ thống sẽ lưu thông tin và nhắc lịch.',
  },
  {
    question: 'Tôi kiểm tra hạng khách hàng của mình ở đâu?',
    answer:
      'Hạng khách hàng (Silver, Gold, Platinum…) được hiển thị ngay trên ứng dụng hoặc có thể hỏi trực tiếp nhân viên cửa hàng để được hỗ trợ.',
  },
  {
    question: 'Mã khách hàng (QR code) dùng để làm gì?',
    answer:
      'Mã khách hàng dùng để tra cứu nhanh thông tin, xem lịch sử mua hàng, tích điểm, sử dụng ưu đãi và kiểm tra công nợ (nếu có).',
  },
  {
    question: 'Nếu tôi quên mang điện thoại thì có tích điểm được không?',
    answer:
      'Được. Quý khách chỉ cần cung cấp số điện thoại hoặc mã khách hàng để nhân viên hỗ trợ tra cứu và tích điểm.',
  },
];

const AboutStoreScreen = () => {
  const methods = useForm<ContactFormValues>({
    defaultValues: { fullName: '', phone: '', topic: '', message: '' },
    mode: 'onChange',
  });

  const titleStyle = useMemo(
    () => ({ fontWeight: '600' as const, marginBottom: 8 }),
    []
  );

  const _renderInfoStore = useCallback(() => {
    return (
      <View style={styles.infoStoreContainer}>
        <CText style={titleStyle} fontSize={fontScale(24)} color={Colors.greenPrimary}>
          Thông tin cửa hàng:
        </CText>

        <CText style={titleStyle} fontSize={fontScale(20)} color={Colors.h2}>
          Cửa hàng Đại lý Quang Nông 719
        </CText>

        <CText color={Colors.h2} fontSize={fontScale(20)}>
          Đối tác đáng tin cậy của bà con trong nền nông nghiệp hiện đại.
          {'\n'}Chúng tôi cung cấp các sản phẩm nông nghiệp chất lượng cao, tư vấn kỹ thuật chuyên sâu và giải pháp hỗ trợ toàn diện cho bà con nông dân.
        </CText>

        <CText color={Colors.h2} fontSize={fontScale(20)}>
          Địa chỉ: 143 Thôn 8A, Eakly, Đắk Lắk
        </CText>

        <CText color={Colors.h2} fontSize={fontScale(20)}>
          Điện thoại: 0922.982.986
        </CText>
      </View>
    );
  }, [titleStyle]);

  const _renderFrequentlyAskedQuestions = useCallback(() => {
    return (
      <View style={styles.infoStoreContainer}>
        <CText style={titleStyle} fontSize={fontScale(24)} color={Colors.h1}>
          Câu hỏi thường gặp
        </CText>

        {FAQ_LIST.map(item => (
          <CAccordion
            key={item.question}
            question={item.question}
            answer={item.answer}
            initialOpen={item.initialOpen}
          />
        ))}
      </View>
    );
  }, [titleStyle]);

  const onSubmit = useCallback((values: ContactFormValues) => {
    Keyboard.dismiss();
    console.log('SEND MESSAGE:', values);
  }, []);

  const _renderSendMessageForm = useCallback(() => {
    return (
      <View style={styles.infoStoreContainer}>
        <CText style={titleStyle} fontSize={fontScale(24)} color={Colors.h1}>
          Gửi tin nhắn cho chúng tôi
        </CText>

        <CText fontSize={fontScale(14)} color={Colors.h2} style={{ marginBottom: 12 }}>
          Vui lòng điền form, chúng tôi sẽ phản hồi trong vòng 24 giờ.
        </CText>

        <CText fontSize={fontScale(14)} color={Colors.h2} style={{ marginBottom: 6 }}>
          Họ và tên
        </CText>
        <CInput
          name="fullName"
          placeholder="Nhập họ và tên"
          style={styles.subTitleHeader}
          returnKeyType="next"
          fontSize={fontScale(18)}
          onSubmitEditing={() => methods.setFocus('phone')}
        />

        <CText fontSize={fontScale(14)} color={Colors.h2} style={{ marginTop: 12, marginBottom: 6 }}>
          Số điện thoại
        </CText>
        <CInput
          name="phone"
          placeholder="Nhập 10 số điện thoại của bạn"
          keyboardType="phone-pad"
          maxLength={10}
          style={styles.subTitleHeader}
          returnKeyType="next"
          fontSize={fontScale(18)}
          onSubmitEditing={() => methods.setFocus('message')}
        />

        <CText fontSize={fontScale(14)} color={Colors.h2} style={{ marginTop: 12, marginBottom: 6 }}>
          Chủ đề
        </CText>
        <CDropdown
          name="topic"
          placeholder="Chọn chủ đề"
          items={TOPIC_OPTIONS}
          selectStyle={styles.subTitleHeader}
        />

        <CText fontSize={fontScale(14)} color={Colors.h2} style={{ marginTop: 12, marginBottom: 6 }}>
          Nội dung
        </CText>
        <CInput
          name="message"
          placeholder="Nhập nội dung cần hỗ trợ"
          style={[styles.subTitleHeader, { height: fontScale(120) }]}
          fontSize={fontScale(18)}
          multiline
          blurOnSubmit={false}
          returnKeyType="default"
        />

        <View style={{ marginTop: 16 }}>
          <CButton title="Gửi yêu cầu" onPress={methods.handleSubmit(onSubmit)} />
        </View>
      </View>
    );
  }, [methods, onSubmit, titleStyle]);

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <FormProvider {...methods}>
        <KeyboardAvoidingScrollView
            contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.contentContainer} />
          <CText style={styles.titleHeader}>Về cửa hàng của chúng tôi</CText>
          <CText style={styles.subTitleHeader}>
            Chúng tôi sẵn sàng hỗ trợ trả lời bất kỳ câu hỏi nào
          </CText>

          {_renderInfoStore()}
          {/* {_renderSendMessageForm()} */}
          {_renderFrequentlyAskedQuestions()}
        </KeyboardAvoidingScrollView>
      </FormProvider>
    </SafeAreaView>
  );
};

export default AboutStoreScreen;
