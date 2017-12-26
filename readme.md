# KOA + MongoDB

### 安装&运行

安装npm包

```
npm install
```
启动

```
npm run run
```

### 项目目录
```
serverSide
├── DOC
├── index.js
├── package.json
├── package-lock.json
├── public
├── readme.md
├── server
│   ├── auth
│   ├── config
│   ├── controllers
│   │   ├── article
│   │   ├── comment
│   │   ├── tag
│   │   └── user
│   ├── db.js
│   ├── middleware
│   ├── models
│   ├── routes.js
│   └── utils
├── static
└── test
```

### 生成自己的ca证书

> // 私钥 \
>  openssl genrsa -out test-key.pem -des 1024 \
>  // csr \
>  openssl req -new -key test-key.pem -out ca-csr.pem \
>  // 证书 \
>  openssl x509 -req -in test-csr.pem -signkey ca-key.pem -out ca-cert.pem \