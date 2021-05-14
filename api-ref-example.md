# Quản lý món ăn 

1. **@GET /api/food: Trả về tất cả các món ăn**
- RESPONSE_BODY: **list các món ăn**  { "name": "<tên món ăn>", "imageUrl": "<link ảnh>", 
"description": "<mô tả>", "price": "<giá tiền>" }

2. **@POST /api/food/add: Thêm món ăn mới**
- REQUEST_BODY: **món ăn cần thêm**  
{ 
    "name": "<tên món ăn>", 
    "imageUrl": "<link ảnh>", 
    "description": "<mô tả>", 
    "price": "<giá tiền>" 
}
- RESPONSE_BODY: **món ăn mới thêm** { "id": "<id>", name": "<tên món ăn>", "imageUrl": "<link ảnh>", "description": "<mô tả>", "price": "<giá tiền>" }

3. **@POST /api/food/edit: Sửa món ăn**
- REQUEST_BODY: **món ăn cần sửa** 
{ 
    "id": "<id món ăn cần sửa>", 
    "name": "<tên món ăn>", 
    "imageUrl": "<link ảnh>", 
    "description": "<mô tả>", 
    "price": "<giá tiền>" 
}
- RESPONSE_BODY: **món ăn mới sửa** 
{ 
    "id": "<id món ăn mới sửa>", 
    name": "<tên món ăn>", 
    "imageUrl": "<link ảnh>", 
    "description": "<mô tả>", 
    "price": "<giá tiền>" 
}