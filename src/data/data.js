// src/data/additionalHotelData.js

import { HouseDoor, KeyFill, Wifi, PersonWorkspace, Snow, Water, Tools, CarFront, CupHot, Tree } from "react-bootstrap-icons";

export const additionalHotelData = [
  {
    id: 2,
    name: "Studio ấm cúng gần Tháp Eiffel",
    location: "Paris, Pháp",
    images: { 
      main: "/images/hotel01.jpg",
      thumb1: "/images/hotel02.jpg",
      thumb2: "/images/hotel03.jpg",
      thumb3: "/images/hotel04.jpg",
      thumb4: "/images/hotel05.jpg",
    },
    details: {
      type: "Căn hộ studio",
      beds: 1,
      bedType: "giường sofa",
      bathroom: "Phòng tắm riêng",
      rating: 4.85,
      reviewCount: 152,
    },
    host: {
      name: "Sophie",
      avatar: "/images/hotel06.jpg", 
      isSuperhost: true,
      experienceYears: 5,
    },
    amenities: {
      propertyType: {
        icon: HouseDoor,
        title: "Toàn bộ căn hộ studio",
        description: "Bạn sẽ có toàn bộ không gian riêng tư cho mình."
      },
    },
    booking: {
      rarity: {
        level: "Nhiều người đang xem",
        description: "Địa điểm này đang được quan tâm"
      },
      price: {
        original: 2500000,
        discounted: 2350000,
        currency: "₫",
        unit: "đêm"
      },
      defaults: {
        checkin: "10/6/2025",
        checkout: "15/6/2025",
        guests: 1
      },
      maxGuests: 2,
    }
  },
  // --- Mẫu 2 ---
  {
    id: 3,
    name: "Loft hiện đại nhìn ra Shinjuku Gyoen",
    location: "Tokyo, Nhật Bản",
    images: { 
      main: "/images/hotel07.jpg",
      thumb1: "/images/hotel08.jpg",
      thumb2: "/images/hotel09.jpg",
      thumb3: "/images/hotel10.jpg",
      thumb4: "/images/hotel11.jpg",
    },
    details: {
      type: "Căn hộ gác mái",
      beds: 2,
      bedType: "giường queen",
      bathroom: "1 phòng tắm",
      rating: 4.92,
      reviewCount: 95,
    },
    host: {
      name: "Kenji",
      avatar: "/images/hotel12.jpg", 
      isSuperhost: false,
      experienceYears: 2,
    },
    amenities: {
      propertyType: {
        icon: HouseDoor,
        title: "Toàn bộ căn hộ gác mái",
        description: "Không gian độc đáo với tầm nhìn đẹp."
      },
      selfCheckIn: {
        icon: KeyFill,
        title: "Tự nhận phòng",
        description: "Nhận phòng dễ dàng với mã khóa thông minh."
      },
      workspace: {
        icon: PersonWorkspace,
        title: "Không gian làm việc riêng",
        description: "Bàn làm việc và ghế thoải mái."
      },
       
    },
    booking: {
      price: {
        discounted: 3800000,
        currency: "₫",
        unit: "đêm"
      },
      defaults: {
        checkin: "01/7/2025",
        checkout: "07/7/2025",
        guests: 2
      },
      maxGuests: 4,
    },
  },
   // --- Mẫu 3 ---
  {
    id: 4,
    name: "Biệt thự riêng tư có hồ bơi ở Ubud",
    location: "Ubud, Bali, Indonesia",
    images: { 
      main: "/images/hotel13.jpg",
      thumb1: "/images/hotel14.jpg",
      thumb2: "/images/hotel15.jpg",
      thumb3: "/images/hotel16.jpg",
      thumb4: "/images/hotel17.jpg",
    },
    details: {
      type: "Biệt thự",
      beds: 3,
      bedType: "giường king & đôi",
      bathroom: "2 phòng tắm riêng",
      rating: 4.98,
      reviewCount: 210,
    },
    host: {
      name: "Wayan & Ayu",
      avatar: "/images/hotel18.jpg", 
      isSuperhost: true,
      experienceYears: 6,
    },
    amenities: {
      propertyType: {
        icon: HouseDoor,
        title: "Toàn bộ biệt thự",
        description: "Không gian nghỉ dưỡng hoàn hảo."
      },
       pool: {
        icon: Water,
        title: "Hồ bơi riêng",
        description: "Thư giãn dưới làn nước trong xanh."
      },
       kitchen: {
        icon: Tools,
        title: "Bếp đầy đủ tiện nghi",
        description: "Tự do nấu nướng các món yêu thích."
      },
      airConditioning: {
        icon: Snow,
        title: "Điều hòa nhiệt độ",
        description: "Không khí mát mẻ khắp biệt thự."
      }
    },
    booking: {
       rarity: {
        level: "Một nơi nghỉ dưỡng được yêu thích",
        description: "Đặt sớm để giữ chỗ!"
      },
      price: {
        discounted: 6200000,
        currency: "₫",
        unit: "đêm"
      },
      defaults: {
        checkin: "15/8/2025",
        checkout: "22/8/2025",
        guests: 4
      },
      maxGuests: 6,
    },
  },
   // --- Mẫu 4 ---
   {
    id: 5,
    name: "Phòng sáng sủa ở khu Notting Hill",
    location: "London, Anh",
    images: { 
      main: "/images/hotel07.jpg",
      thumb1: "/images/hotel20.jpg",
      thumb2: "/images/hotel02.jpg",
      thumb3: "/images/hotel03.jpg",
      thumb4: "/images/hotel04.jpg",
    },
    details: {
      type: "Phòng riêng",
      beds: 1,
      bedType: "giường đôi",
      bathroom: "Phòng tắm chung",
      rating: 4.75,
      reviewCount: 55,
    },
    host: {
      name: "David",
      avatar: "/images/hotel05.jpg", 
      isSuperhost: false,
      experienceYears: 1,
    },
    amenities: {
       propertyType: {
        icon: HouseDoor,
        title: "Phòng riêng trong nhà",
        description: "Chia sẻ không gian chung với chủ nhà thân thiện."
      },
       selfCheckIn: {
        icon: KeyFill,
        title: "Tự nhận phòng",
        description: "Nhận phòng linh hoạt với hộp khóa."
      },
      wifi: {
        icon: Wifi,
        title: "Wifi",
        description: ""
      }
    },
    booking: {
      price: {
        discounted: 1800000,
        currency: "₫",
        unit: "đêm"
      },
      defaults: {
        checkin: "01/9/2025",
        checkout: "05/9/2025",
        guests: 1
      },
      maxGuests: 2,
    },
  },
  // --- Mẫu 5 ---
  {
    id: 6,
    name: "Căn hộ lịch sử gần Đấu trường La Mã",
    location: "Rome, Ý",
    images: { 
      main: "/images/hotel06.jpg",
      thumb1: "/images/hotel07.jpg",
      thumb2: "/images/hotel09.jpg",
      thumb3: "/images/hotel10.jpg",
      thumb4: "/images/hotel20.jpg",
    },
    details: {
      type: "Căn hộ",
      beds: 2,
      bedType: "giường đôi & đơn",
      bathroom: "1 phòng tắm",
      rating: 4.90,
      reviewCount: 115,
    },
    host: {
      name: "Marco",
      avatar: "/images/hotel01.jpg", 
      isSuperhost: true,
      experienceYears: 4,
    },
    amenities: {
      propertyType: {
        icon: HouseDoor,
        title: "Toàn bộ căn hộ",
        description: "Trải nghiệm cuộc sống La Mã đích thực."
      },
       kitchen: {
        icon: Tools,
        title: "Bếp",
        description: "Đầy đủ dụng cụ nấu ăn."
      },
      airConditioning: {
        icon: Snow,
        title: "Điều hòa",
        description: ""
      },
      wifi: {
        icon: Wifi,
        title: "Wifi",
        description: ""
      }
    },
    booking: {
      price: {
        original: 3500000,
        discounted: 3300000,
        currency: "₫",
        unit: "đêm"
      },
      defaults: {
        checkin: "12/10/2025",
        checkout: "17/10/2025",
        guests: 2
      },
      maxGuests: 3,
    },
  },
  // --- Mẫu 6 ---
   {
    id: 7,
    name: "Studio nghệ thuật ở Kreuzberg",
    location: "Berlin, Đức",
    images: { 
      main: "/images/hotel09.jpg",
      thumb1: "/images/hotel11.jpg",
      thumb2: "/images/hotel12.jpg",
      thumb3: "/images/hotel01.jpg",
      thumb4: "/images/hotel03.jpg",
    },
    details: {
      type: "Căn hộ studio",
      beds: 1,
      bedType: "giường queen",
      bathroom: "Phòng tắm riêng",
      rating: 4.88,
      reviewCount: 78,
    },
    host: {
      name: "Anna",
      avatar: "/images/hotel07.jpg", 
      isSuperhost: true,
      experienceYears: 3,
    },
    amenities: {
      propertyType: {
        icon: HouseDoor,
        title: "Toàn bộ căn hộ studio",
        description: "Không gian sáng tạo và đầy cảm hứng."
      },
      selfCheckIn: {
        icon: KeyFill,
        title: "Tự nhận phòng",
        description: "Linh hoạt với hộp khóa an toàn."
      },
      wifi: { icon: Wifi, title: "Wifi", description:"" },
      kitchenette: { icon: CupHot, title: "Bếp nhỏ", description:""}
    },
    booking: {
      price: {
        discounted: 2100000,
        currency: "₫",
        unit: "đêm"
      },
      defaults: {
        checkin: "05/11/2025",
        checkout: "10/11/2025",
        guests: 1
      },
      maxGuests: 2,
    },
  },
  // --- Mẫu 7 ---
   {
    id: 8,
    name: "Nhà gần biển Bondi",
    location: "Sydney, Úc",
    images: { 
      main: "/images/hotel01.jpg",
      thumb1: "/images/hotel09.jpg",
      thumb2: "/images/hotel08.jpg",
      thumb3: "/images/hotel11.jpg",
      thumb4: "/images/hotel15.jpg",
    },
    details: {
      type: "Nhà riêng",
      beds: 3,
      bedType: "giường queen & đơn",
      bathroom: "2 phòng tắm",
      rating: 4.95,
      reviewCount: 140,
    },
    host: {
      name: "Chris",
      avatar: "/images/hotel04.jpg", 
      isSuperhost: true,
      experienceYears: 5,
    },
    amenities: {
      propertyType: {
        icon: HouseDoor,
        title: "Toàn bộ nhà",
        description: "Tận hưởng không khí biển trong lành."
      },
      parking: {
        icon: CarFront,
        title: "Chỗ đỗ xe miễn phí",
        description: "Đỗ xe ngay trong khuôn viên."
      },
       kitchen: { icon: Tools, title: "Bếp", description:"" },
       wifi: { icon: Wifi, title: "Wifi", description:"" },
    },
    booking: {
      price: {
        discounted: 5500000,
        currency: "₫",
        unit: "đêm"
      },
      defaults: {
        checkin: "01/12/2025",
        checkout: "08/12/2025",
        guests: 4
      },
      maxGuests: 6,
    },
  },
  // --- Mẫu 8 ---
  {
    id: 9,
    name: "Phòng áp mái view kênh đào",
    location: "Amsterdam, Hà Lan",
    images: { 
      main: "/images/hotel01.jpg",
      thumb1: "/images/hotel04.jpg",
      thumb2: "/images/hotel05.jpg",
      thumb3: "/images/hotel09.jpg",
      thumb4: "/images/hotel20.jpg",
    },
    details: {
      type: "Phòng áp mái",
      beds: 1,
      bedType: "giường queen",
      bathroom: "Phòng tắm riêng",
      rating: 4.91,
      reviewCount: 102,
    },
    host: {
      name: "Lotte",
      avatar: "/images/hotel02.jpg", 
      isSuperhost: true,
      experienceYears: 4,
    },
    amenities: {
      propertyType: {
        icon: HouseDoor,
        title: "Phòng riêng áp mái",
        description: "Ngắm nhìn kênh đào Amsterdam thơ mộng."
      },
      wifi: { icon: Wifi, title: "Wifi", description:"" },
       breakfast: {
        icon: CupHot,
        title: "Bữa sáng được phục vụ",
        description: "Thưởng thức bữa sáng kiểu Hà Lan."
      }
    },
    booking: {
      rarity: {
        level: "Hiếm khi còn phòng!",
        description: "Phòng có view đẹp thường hết nhanh."
      },
      price: {
        original: 3200000,
        discounted: 2950000,
        currency: "₫",
        unit: "đêm"
      },
      defaults: {
        checkin: "10/1/2026",
        checkout: "15/1/2026",
        guests: 1
      },
      maxGuests: 2,
    },
  },
   // --- Mẫu 9 ---
  {
    id: 10,
    name: "Cabin gỗ giữa rừng thông",
    location: "Banff, Canada",
    images: { 
      main: "/images/hotel13.jpg",
      thumb1: "/images/hotel12.jpg",
      thumb2: "/images/hotel16.jpg",
      thumb3: "/images/hotel18.jpg",
      thumb4: "/images/hotel1.jpg",
    },
    details: {
      type: "Cabin",
      beds: 2,
      bedType: "giường đôi",
      bathroom: "1 phòng tắm",
      rating: 4.96,
      reviewCount: 188,
    },
    host: {
      name: "Michael",
      avatar: "/images/hotel09.jpg", 
      isSuperhost: true,
      experienceYears: 7,
    },
    amenities: {
      propertyType: {
        icon: Tree,
        title: "Toàn bộ cabin",
        description: "Hòa mình vào thiên nhiên hoang sơ."
      },
      selfCheckIn: {
        icon: KeyFill,
        title: "Tự nhận phòng",
        description: "Nhận chìa khóa dễ dàng."
      },
       fireplace: {
        icon: CupHot,
        title: "Lò sưởi",
        description: "Ấm cúng vào những đêm lạnh giá."
       },
       kitchen: { icon: Tools, title: "Bếp", description:"" },
    },
    booking: {
      price: {
        discounted: 4500000,
        currency: "₫",
        unit: "đêm"
      },
      defaults: {
        checkin: "20/2/2026",
        checkout: "25/2/2026",
        guests: 2
      },
      maxGuests: 4,
    },
  },
  // --- Mẫu 10 ---
  {
    id: 11,
    name: "Phòng đơn giản gần trung tâm",
    location: "Đà Nẵng, Việt Nam",
    images: { 
      main: "/images/hotel01.jpg",
      thumb1: "/images/hotel07.jpg",
      thumb2: "/images/hotel05.jpg",
      thumb3: "/images/hotel09.jpg",
      thumb4: "/images/hotel02.jpg",
    },
    details: {
      type: "Phòng riêng",
      beds: 1,
      bedType: "giường đơn",
      bathroom: "Phòng tắm chung",
      rating: 4.65,
      reviewCount: 35,
    },
    host: {
      name: "Linh",
      avatar: "/images/hotel02.jpg",
      isSuperhost: false,
      experienceYears: 1,
    },
    amenities: {
      propertyType: {
        icon: HouseDoor,
        title: "Phòng riêng trong nhà",
        description: "Lựa chọn tiết kiệm cho du khách."
      },
      wifi: { icon: Wifi, title: "Wifi", description:"" },
      airConditioning: { icon: Snow, title: "Điều hòa", description:"" },
    },
    booking: {
      price: {
        discounted: 550000,
        currency: "₫",
        unit: "đêm"
      },
      defaults: {
        checkin: "01/3/2026",
        checkout: "04/3/2026",
        guests: 1
      },
      maxGuests: 1,
    },
  }
];