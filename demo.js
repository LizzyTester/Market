def member_login():
    #引用需要修改的全局变量,更新
    global forntSession

    url = "http://s2-api.smarket.net.cn/member/login"

    payload = "{"tenantId":"110","url":"https://f.smarket.net.cn/s/template/078f097e0e29d7e56d5ad4a84a085df4/view/login.html"}"
    headers = {
        'Content-Type': "application/json",
        'Cache-Control': "no-cache",
        'Postman-Token': "db317e03-b56c-4150-abd3-cff16ca8836c"
    }

    response = requests.request("POST", url, data=payload, headers=headers)

    info = response.text
    infostr = "successful"
    if info.find(infostr, 0) == -1:
        forntSession = ''
        return u"fail"
    else:
        forntSession = response.json()['body']['content']['sess']
        base_dir = os.path.join(os.path.dirname(__file__), 'tokenfornt.md')
        with open(base_dir, 'w') as f:
            f.write(forntSession)
        return u"successful"
