#############################   Mô tả   #############################
## Khách hàng đăng nhập

@POST /api/uer/login: Đăng nhập tài khoản khách hàng

REQUEST_BODY: thông tin đăng nhập tài khoản
{ 
    "username": "<tên đăng nhập>", 
    "password": "<mật khẩu>",
}

RESPONSE_BODY:
case 1: Đăng nhập thành công:
header: {
    "Status Code": 200,
    "auth-token": "<Mã băm id khách hàng đăng nhập (dùng jsonwebtoken)>",
}
body: {
  "token": "<Mã băm id khách hàng đăng nhập (dùng jsonwebtoken)>"
} 


case 2: Đăng nhập thất bại
header: { "Status Code": 400 }
body: các loại thông báo trả về (string): 
    ""username" must only contain alpha-numeric characters"
    ""username" length must be at least 6 characters long"
    ""password" length must be at least 6 characters long"
    ""Username is not found"
    "Invalid password"
    ""password" is required"
    ""username" is required"


#############################   Ví dụ   #############################
 -- REQUEST --
POST http://localhost:3000/api/user/login
Content-Type: application/json
{
    "username" : "tranlongan",
    "password" : "123456"
}

 -- RESPONSE --
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWYxYWZkYjg0MTJmMzQxYzdmYmQ3MiIsImlhdCI6MTYyMTEzMjU2M30.DD8ensYk5lwgwDL5xfGYexsrqfe-cqzqm5hoYy-Utzo
Content-Type: application/json; charset=utf-8
Content-Length: 160
ETag: W/"a0-Nqt9OTq8gk/uGRI8NvqUBv1VE5k"
Date: Sun, 16 May 2021 02:36:03 GMT
Connection: close
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWYxYWZkYjg0MTJmMzQxYzdmYmQ3MiIsImlhdCI6MTYyMTEzMjU2M30.DD8ensYk5lwgwDL5xfGYexsrqfe-cqzqm5hoYy-Utzo"
}



###########################   Check đăng nhập   ###########################
Sử dụng module trong router/verifyToken:
ví dụ :
    const router = require("express").Router();
    const verify = require('./verifytoken');
    router.get('/', verify, () => {
        res.send("Login success");
    });