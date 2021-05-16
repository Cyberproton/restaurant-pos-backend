#############################   Mô tả   #############################
Khách hàng đăng ký tài khoản

@POST /api/uer/register: đăng ký tài khoản khách hàng

REQUEST_BODY: thông tin đăng ký tài khoản
{ 
    "username": "<tên đăng nhập>", 
    "password": "<mật khẩu>",
    "repassword": "<nhập lại mật khẩu>",
    "fullname": "<họ và tên>",
    "phonenumber": "<số điện thoại>",
    "dateofbird": "<ngày sinh>",
}

RESPONSE_BODY:
case 1: Đăng ký thành công: 
header: { "Status Code": 200 }
body: { "user": "<_id của khách hàng>" }

case 2: Đăng nhập thất bại
header: { "Status Code": 400 }
body: các loại thông báo trả về (string): 
    ""username" must only contain alpha-numeric characters"
    ""username" length must be at least 6 characters long"
    ""password" length must be at least 6 characters long"
    "Username already exists"
    ""repassword" must be [ref:password]"
    ""password" is required"
    ""repassword" is required"
    ""username" is required"


#############################   Ví dụ   #############################
 -- REQUEST --
POST http://localhost:3000/api/user/register
Content-Type: application/json

{
    "username" : "usernameprovip123",
    "password" : "123456",
    "repassword" : "123456",
    "fullname" : "tran long an",
    "phonenumber" : "012345678",
    "dateofbird" : "10/05/2000"
}

 -- RESPONSE --
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-xWQl6CZniHZ6Zxt61wQ6jdYWCNc"
Date: Sun, 16 May 2021 02:40:18 GMT
Connection: close

{
  "user": "60a086123094161d98338ccd"
}