### -------------------- Đăng ký tài khoản mới --------------------

# REQUEST

POST http://localhost:3000/api/user/register
Content-Type: application/json
{
"username": <string: tên đăng nhập>,
"password": <string: mật khẩu>,
"repassword": <string: nhập lại mật khẩu>,
"fullname": <string: họ và tên>,
"phonenumber": <string: số điện thoại>,
"dateofbirth": <string: ngày sinh>
}

# RESPONSE

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: \*
Content-Type: application/json; charset=utf-8
Content-Length: 223
ETag: W/"df-NKza0dh8nBwQOWrSSi+yCi7dFhY"
Date: Sun, 30 May 2021 12:15:00 GMT
Connection: close

{
"\_id": <string: id tài khoản khách hàng>,
"username": <string: tên đăng nhập>,
"password": <string: mã băm mật khẩu>,
"fullname": <string: họ và tên>,
"phonenumber": <string: số điện thoại>,
"dateofbirth": <string: ngày sinh>
"\_\_v": 0
}

### -------------------- Đăng nhập --------------------

# REQUEST

POST http://localhost:3000/api/user/login
Content-Type: application/json

{
"username": <string: tên đăng nhập>,
"password": <string: mật khẩu>
}

# RESPONSE

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: \*
Set-Cookie: token_mama=<mã token>; Max-Age=300; Path=/; Expires=Mon, 24 May 2021 03:57:44 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 26
ETag: W/"1a-IecQ30fhMfiSsu6eq3fpJneKtRM"
Date: Mon, 24 May 2021 03:52:44 GMT
Connection: close

{
"msg": "Login successful"
}

### -------------------- Đăng xuất --------------------

# REQUEST

POST http://localhost:3000/api/user/logout
Content-Type: application/json

{
}

# RESPONSE

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: \*
Set-Cookie: token_mama=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 27
ETag: W/"1b-E7oeV7I/xfvOPSP6xqCc6E3alkw"
Date: Mon, 24 May 2021 03:54:50 GMT
Connection: close

{
"msg": "Logout successful"
}

### -------------------- Xóa tài khoản --------------------

DELETE http://localhost:3000/api/user/<id tài khoản khách hàng>

# REQUEST

Content-Type: application/json
{ }

# RESPONSE

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: \*
Set-Cookie: token_mama=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 26
ETag: W/"1a-+BFCXZBji7vrbkrwyE5s2YKViik"
Date: Mon, 24 May 2021 03:56:51 GMT
Connection: close

{
"message": "User deleted"
}

### -------------------- Lấy thông tin tài khoản --------------------

# REQUEST

GET http://localhost:3000/api/user/<id tài khoản khách hàng>
Content-Type: application/json

{
}

# RESPONSE

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: \*
Content-Type: application/json; charset=utf-8
Content-Length: 217
ETag: W/"d9-lnqD5nDjyd/O8/Lrjn4YL5EEGq8"
Date: Mon, 24 May 2021 03:58:26 GMT
Connection: close

{
"\_id": <id tài khoản khách hàng>,
"username": <string: tên đăng nhập>,
"password": <string: mật khẩu>,
"fullname": <string: họ và tên>,
"phonenumber": <string: số điện thoại>,
"dateofbirth": <string: ngày sinh>,
"\_\_v": 0
}

### -------------------- Sửa đổi thông tin tài khoản --------------------

# REQUEST

PUT http://localhost:3000/api/user/<id tài khoản khách hàng>
Content-Type: application/json
{
"username": <string: tên đăng nhập>,
"password": <string: mật khẩu>,
"fullname": <string: họ và tên>,
"phonenumber": <string: số điện thoại>,
"dateofbirth": <string: ngày sinh>,
}

# RESPONSE

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: \*
Content-Type: application/json; charset=utf-8
Content-Length: 25
ETag: W/"19-p16xjgGCPZa80hwXlm8PLYRO4xk"
Date: Mon, 24 May 2021 04:03:28 GMT
Connection: close

{
"message": "User Update"
}
