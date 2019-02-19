# isuntvlive

陽光衛視直播網站，嵌入直播訊號源及呈現每週節目表

This is a react isomorphic template.
it's included below

1. react16.1.1

2. react-router4

3. redux3.6

4. i18next

5. webpack3


## Update program list

每週須更新節目表

將收到最新一週的節目表放在 /xls，檔名為 YYYYMMDDchinasuntv.xls

YYYYMMDD 為每週第一天(禮拜一)

```shell
pm2 deploy ecosystem.config.js production
```