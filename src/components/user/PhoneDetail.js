import ProductDetail from "./common/ProductDetail";

function PhoneDetail() {
    const datas = {
        id: 1,
         discountInfo : 'Giảm 10%',
         percent: 'Trả góp 0%',
         image: '/image/phoneIphone13.webp',
         title: 'Iphone 13 promax',
         price: 25000000,
         discount: 30000000,
         description: "Đang khuyến mãi dành cho giáo viên",
         dataImage: [
            { idImage: 1, url: "/image/item1.webp", titleItem: "Titan Đen"},
            { idImage: 2, url: "/image/item2.webp", titleItem: "Titan Tự Nhiên"},
            { idImage: 3, url: "/image/item3.webp", titleItem: "Titan Trắng"},
         ],
        versionProductDetail: [
            {idVerson: 1, name:"1TB"},
            {idVerson: 2, name:"512GB"},
            {idVerson: 3, name:"256GB"},
        ],
        specification: [
             {idSpecification: 1,
             nameSpecification: "Màn hình",
             detail: {
                screenFront: "6.9 inches",
                screenTech: "Super Retina XDR OLED",
                screenResolution: "2868 x 1320 pixels",
                scanningFrequency: "120Hz"}
            },
             {idSpecification: 2,
             nameSpecification: "Camera",
             detail: {
                backCamera: "Camera chính: 48MP, f/1.78, 24mm, 2µm",
                frontCamera: "12MP, ƒ/1.9, Tự động lấy nét theo pha Focus Pixels"}
            },
             {idSpecification: 3,
             nameSpecification: "Vi xử lý và đồ họa",
             detail: {
                chipset: "Apple A18 Pro",
                GPU: "GPU 6 lõi mới"},
            },
            {
              idSpecification: 4,
              nameSpecification:"Ram và lưu trữ",
              detail:{
                ram: "256GB",
                OperatingSystem: "iOS 18"
              } 
            },
            {
              idSpecification: 5,
              nameSpecification:"Kích thước và trọng lượng",
              detail:{
               Size: "163 x 77,6 x 8,25 mm",
                Weight: "227 gram"
              }   
            },
            {
              idSpecification: 6,
              nameSpecification:"Pin",
              detail:{
               com: "USB Type-C",
               timeUse: "32 tiếng"
              }    
            },
            {
              idSpecification: 7,
              nameSpecification:"Kết nối",
              detail:{
                WiFi: "Wi‑Fi 7 (802.11be) với 2x2 MIMO7",
                Bluetooth: "Bluetooth 5.3"
              }    
            },
        ]
        }; 
    return(
        <>  
            <ProductDetail
            data = {datas}
            />
        </>
    )
}
export default PhoneDetail;