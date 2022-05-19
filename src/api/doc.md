## login

### request

```json
{
    method: 'get',
    url: 'http://localhost:8000/login',
    params: {
        username: string,
        password: string,
        role: string
    },
    responseType: 'json'
}
```

### response

```json
//登入成功返回token
{
    status: '200'
    token: string
}
//登入失败
{
    status: '304'
}
```

## tokenAuth

### request

```json
{
    method: 'get',
    url: 'http://localhost:8000/tokenAuth',
    params: { token: string },
    responseType: 'json'
}
```

### response

```json
{
    status:'200',
    
}
```
