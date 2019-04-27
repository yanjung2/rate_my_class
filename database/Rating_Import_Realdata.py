#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pymysql
import csv

connection = pymysql.connect(host = 'us-cdbr-iron-east-03.cleardb.net', #host属性
                             user = 'bd2cc55611689c', #用户名 
                             password = '6fee58e8',  #此处填登录数据库的密码
                             db = 'heroku_b2e5fb7fc11f642' #数据库名
                             )

cur = connection.cursor()

csvFile = open("C:/Users/JAPO/Desktop/UIUC/database/project/rate data/Course_Evaluation.csv")
reader = csv.reader(csvFile)
cnt = 1
for line in reader:
    if reader.line_num == 1:
        continue
    str1 = 'insert into rating values ('
    time = line[0]
    if line[1][2] == ' ':
        cid = line[1][3:6]
    if line[1][2] != ' ':
        cid = line[1][2:5]
    comment = line[-2]
    interesting = line[3]
    usefulness = line[4]
    difficulty = line[5]
    name = line[2].split()[0].lower()
    str2 = 'select cid, title, professor from class where cid = ' + cid + ';'
    print(str2)
    cur.execute(str2)
    res = cur.fetchall()
    if len(res) < 1:
        continue
    title = res[0][1]
    professor = res[0][2]
    for x in res:
        if name in x[2].lower():
            professor = x[2]
            break
    uid = 'user' + str(cnt)
    cnt += 1
    str1 = str1 + cid + ',"' + professor + '","' + title + '","' + uid + '","' + time + '","' + comment + '",' + difficulty + ',' + interesting + ',' + usefulness + ');' 
    print(str1)
    cur.execute(str1)
    str3 = 'insert into users values("' + uid + '", 123);'
    cur.execute(str3)

connection.commit()
csvFile.close()


connection.close()
cur.close()

