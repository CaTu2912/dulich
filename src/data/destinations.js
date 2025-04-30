const destinations = [
    {
      name: "Vịnh Hạ Long",
      image: "https://static-images.vnncdn.net/files/publish/2022/7/27/ha-long-bay-1-852.jpg",
      description:
        "Vịnh Hạ Long, được UNESCO công nhận là Di sản Thiên nhiên Thế giới, nổi bật với hàng nghìn đảo đá vôi hùng vĩ giữa làn nước trong xanh",
      slug: "vhl", // <-- cần slug để định tuyến

    },
    {
      name: "Sapa",
      image: "https://mettavoyage.com/wp-content/uploads/2023/01/sapa3.jpg",
      description:
        "Sapa là một thị trấn vùng cao với khí hậu mát mẻ quanh năm, nổi bật với ruộng bậc thang trùng điệp, đỉnh Fansipan hùng vĩ và văn hóa đặc sắc của đồng bào dân tộc H'Mông, Dao. Đặc biệt, vào mùa đông, Sapa còn có tuyết rơi tuyệt đẹp.",
      location: "https://maps.google.com/?q=Sapa",
      slug: "Sapa",
    },
    {
      name: "Hà Nội",
      image: "https://halotravel.vn/wp-content/uploads/2020/08/ho-guom.jpg",
      description:
        "Hà Nội - thủ đô ngàn năm văn hiến của Việt Nam, nơi giao thoa giữa nét cổ kính và hiện đại. Điểm đến nổi bật gồm Hồ Hoàn Kiếm, Phố Cổ, Lăng Bác, Văn Miếu - Quốc Tử Giám. Ẩm thực phong phú với phở, bún chả, cà phê trứng.",
      location: "https://maps.google.com/?q=Hà+Nội",
    },
    {
      name: "Ninh Bình",
      image: "https://3.bp.blogspot.com/-z2eD4p6Bhq0/WcS4yo2MxhI/AAAAAAAAAfo/ij2S8xUCJQkKPH9ymOJqY6uzWpJDuUV5gCLcBGAs/s1600/voyage-de-ninh-binh.jpg",
      description:
        "Ninh Bình được ví như 'Vịnh Hạ Long trên cạn' với danh thắng Tràng An, Tam Cốc - Bích Động, Hang Múa. Đây là điểm đến lý tưởng để ngồi thuyền khám phá hệ thống hang động kỳ thú và tận hưởng khung cảnh thiên nhiên yên bình.",
      location: "https://maps.google.com/?q=Ninh+Bình",
    },
    {
      name: "Mộc Châu",
      image: "https://localvietnam.com/wp-content/uploads/2021/04/moc-chau-tea-plantation-1.jpg",
      description:
        "Mộc Châu là cao nguyên xanh mát với những đồi chè bát ngát, cánh đồng hoa cải, hoa mận rực rỡ vào mùa xuân. Ngoài ra, du khách có thể khám phá thác Dải Yếm, Ngũ Động Bản Ôn và thưởng thức sữa bò tươi nổi tiếng.",
      location: "https://maps.google.com/?q=Mộc+Châu",
    },
    {
      name: "Cát Bà",
      image: "https://kimlientravel.com.vn/upload/image/cat-ba/du-lich-cat-ba-choi-gi/du-lich-cat-ba(1).jpg",
      description:
        "Cát Bà là quần đảo với những bãi biển tuyệt đẹp như Cát Cò 1, 2, 3, rừng nguyên sinh phong phú. Đặc biệt, Vịnh Lan Hạ - viên ngọc ẩn giấu của Cát Bà - là địa điểm lý tưởng để chèo thuyền kayak.",
      location: "https://maps.google.com/?q=Cát+Bà",
    },
    {
      name: "Hồ Ba Bể",
      image: "https://dulichhobabe.com/UserFiles/image/tour/Thac-Ban-Gioc-Cao-Bang2.jpg",
      description:
        "Hồ Ba Bể là hồ nước ngọt lớn nhất Việt Nam, nằm giữa núi non hùng vĩ. Du khách có thể đi thuyền ngắm cảnh, khám phá động Puông, thác Đầu Đẳng và tìm hiểu văn hóa của người Tày bản địa.",
      location: "https://maps.google.com/?q=Hồ+Ba+Bể",
    },
    {
      name: "Đảo Cô Tô",
      image: "https://thuthuatnhanh.com/wp-content/uploads/2021/12/Hinh-anh-dao-Co-To-hoang-so-xinh-dep-thu-hut-moi-du-khach.jpg",
      description:
        "Cô Tô sở hữu những bãi biển đẹp hoang sơ như Hồng Vàn, Vàn Chảy. Ngoài ra, du khách có thể ghé thăm bãi đá Móng Rồng, ngọn hải đăng Cô Tô để ngắm hoàng hôn tuyệt đẹp.",
      location: "https://maps.google.com/?q=Đảo+Cô+Tô",
    },
    {
      name: "Mai Châu",
      image: "https://maichautourist.com/assets/uploads/tours/tour-du-lich-pu-luong-2-ngay-1-dem.jpg",
      description:
        "Mai Châu - thung lũng yên bình với những bản làng của người Thái, nổi bật với nhà sàn truyền thống, đồng lúa xanh mướt và không khí trong lành. Đây là điểm đến lý tưởng để nghỉ dưỡng và trải nghiệm văn hóa bản địa.",
      location: "https://maps.google.com/?q=Mai+Châu",
    },
    {
      name: "Hà Giang",
      image: "https://camnangdidulich.com/data/news/default/du-lich-ha-giang-co-gi-thu-vi-top-7-diem-den-hap-dan-tai-ha-giang.jpg",
      description:
        "Hà Giang - vùng đất địa đầu Tổ quốc với cảnh quan cao nguyên đá Đồng Văn, con đường Hạnh Phúc, đèo Mã Pí Lèng. Mùa hoa tam giác mạch vào tháng 10 - 11 tạo nên khung cảnh lãng mạn, hấp dẫn du khách.",
      location: "https://maps.google.com/?q=Hà+Giang",
    },
    {
      name: "Thung Nai",
      image: "https://ik.imagekit.io/tvlk/blog/2022/09/kinh-nghiem-du-lich-thung-nai-hoa-binh-4.jpg?tr=dpr-2,w-675",
      description:
        "Thung Nai (Hòa Bình) được ví như 'Hạ Long trên cạn' với lòng hồ sông Đà rộng lớn, thiên nhiên thơ mộng, thích hợp cho những chuyến du lịch cuối tuần tránh xa khói bụi thành phố.",
      location: "https://maps.google.com/?q=Thung+Nai",
    },
    {
      name: "Tam Đảo",
      image: "https://eviva.com.vn/wp-content/uploads/2021/05/Tour-Tam-Dao.jpg",
      description:
        "Tam Đảo là điểm đến lý tưởng với khí hậu mát mẻ quanh năm, nổi bật với Nhà Thờ Đá, Thác Bạc, Cổng Trời. Đây cũng là nơi để thưởng thức đặc sản su su và lẩu gà đồi thơm ngon.",
      location: "https://maps.google.com/?q=Tam+Đảo",
    },
    {
      name: "Bắc Hà",
      image: "https://tobeigo.com/wp-content/uploads/2020/02/gioi-thieu-du-lich-bac-ha-lao-cai-2.jpg",
      description:
        "Bắc Hà (Lào Cai) nổi tiếng với chợ phiên Bắc Hà nhộn nhịp vào chủ nhật hàng tuần, cung đường khám phá dinh Hoàng A Tưởng và mùa hoa mận trắng tuyệt đẹp vào tháng 3.",
      location: "https://maps.google.com/?q=Bắc+Hà",
    },
    {
      name: "Đồng Văn",
      image: "https://elitetour.com.vn/files/images/Blogs/pho-co-dong-van.jpg",
      description:
        "Cao nguyên đá Đồng Văn là một trong những vùng đất độc đáo với núi đá tai mèo, phố cổ Đồng Văn và cột cờ Lũng Cú – điểm cực Bắc của Việt Nam.",
      location: "https://maps.google.com/?q=Đồng+Văn",
    },
    {
        name: "Suối Giàng",
        image: "https://ims.baoyenbai.com.vn/NewsImg/2_2022/236800_coi-mo1(33).jpg",
        description:
          "Suối Giàng (Yên Bái) là quê hương của chè Shan Tuyết cổ thụ, nổi bật với cảnh sắc núi rừng yên bình và những bản làng người Mông.",
        location: "https://maps.google.com/?q=Suối+Giàng",
      },
      {
        name: "Lào Cai",
        image: "https://jato.vn/Upload/tintuc/tin-tuc-khac/lao-cai/lao-cai-3.jpg",
        description:
          "Lào Cai không chỉ có Sapa mà còn có cột mốc biên giới Lào Cai - Trung Quốc, cửa khẩu Hà Khẩu và các bản làng vùng cao đẹp như tranh.",
        location: "https://maps.google.com/?q=Lào+Cai",
      },
      {
        name: "Cao Bằng",
        image: "https://cdn.hanoijourney.com/wp-content/uploads/2017/08/cao-bang.jpg",
        description:
        "Cao Bằng là điểm đến lý tưởng với Thác Bản Giốc - thác nước lớn nhất Đông Nam Á, động Ngườm Ngao kỳ vĩ và di tích lịch sử Pác Bó - nơi gắn liền với Chủ tịch Hồ Chí Minh.",
        location: "https://maps.google.com/?q=Cao+Bằng",
      },
      {
        name: "Pù Luông",
        image: "https://puluongexcursions.com/wp-content/uploads/2018/02/puluong-cassa-resort1.jpg",
        description:
        "Pù Luông là khu bảo tồn thiên nhiên tuyệt đẹp với những thửa ruộng bậc thang uốn lượn, rừng rậm nguyên sinh và suối nước trong lành. Đây là điểm đến hoàn hảo cho những ai muốn hòa mình vào thiên nhiên.",
        location: "https://maps.google.com/?q=Pù+Luông",
      },
      {
        name: "Thác Mu",
        image: "https://vov2.vov.vn/sites/default/files/styles/large/public/2021-07/thac-mu-hoa-binh-dulichachau-1.jpg",
        description:
          "Thác Mu (Hòa Bình) là một thác nước hoang sơ với làn nước trong xanh, thích hợp cho những chuyến picnic và khám phá thiên nhiên.",
        location: "https://maps.google.com/?q=Thác+Mu",
      },
      {
        name: "Hồ Núi Cốc",
        image: "https://toplist.vn/images/800px/thac-ban-gioc-cao-bang-348521.jpg",
        description:
          "Hồ nước nhân tạo nổi tiếng của Thái Nguyên, gắn với truyền thuyết Chàng Cốc – Nàng Công.",
        location: "https://maps.google.com/?q=Hồ+Núi+Cốc",
      },
      {
        name: "Ba Vì",
        image: "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/du-lich-ba-vi-vuon-quoc-gia-2.jpg",
        description:
          "Vườn quốc gia Ba Vì với rừng thông xanh mát, đền Thờ Bác Hồ và nhà thờ Pháp cổ.",
        location: "https://maps.google.com/?q=Ba+Vì",
      },
      {
        name: "Cửa Lò",
        image: "https://songhongtourist.vn/upload/2022-11-21/tp-7-1673-5.jpg",
        description:
          "Bãi biển tuyệt đẹp của Nghệ An, nổi tiếng với hải sản tươi ngon và không khí trong lành.",
        location: "https://maps.google.com/?q=Cửa+Lò",
      },
      {
        name: "Yên Tử",
        image: "https://media.mia.vn/uploads/blog-du-lich/giai-ngo-voi-kinh-nghiem-di-chua-yen-tu-tu-a-z-khi-du-lich-ha-long-1641593873.jpg",
        description:
        "Yên Tử là ngọn núi linh thiêng gắn liền với Thiền phái Trúc Lâm, nơi có chùa Đồng nằm trên đỉnh núi. Du khách có thể leo núi hoặc đi cáp treo để tận hưởng phong cảnh hùng vĩ và không gian tâm linh.",
        location: "https://maps.google.com/?q=Yên+Tử",
      },
      {
        name: "Lũng Cú",
        image: "https://sacotravel.com/wp-content/uploads/2023/07/Cot-co-Lung-Cu3.jpg",
        description:
          "Cột cờ Lũng Cú - biểu tượng của cực Bắc Việt Nam, nơi có thể nhìn thấy Trung Quốc.",
        location: "https://maps.google.com/?q=Lũng+Cú",
      },
  ];
  export default destinations;
