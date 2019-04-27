#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import csv

csvFile = open("C:/Users/JAPO/Desktop/UIUC/database/project/inputdata.csv")
reader = csv.reader(csvFile)
dic = {}
for line in reader:
    if reader.line_num == 1:
        continue
    if line[3] != 'CS':
        continue
    course = (line[2],line[4],line[5]) ##course number, title, prof
    if course not in dic:
        dic[course] = line[6:]
        for n in range(len(dic[course])):
            dic[course][n] = int(dic[course][n])
        dic[course].append(1)
    else:
        old = dic[course]
        new = line[6:]
        new.append(1)
        for n in range(len(old)):
            old[n] = int(old[n]) + int(new[n])
## start calculate avg GPA
for x in dic:
    grade = dic[x][:-2]
    sum = 0
    cnt = 0
    for n in range(1,len(grade)):
        sum += grade[n]*(4 - 0.33*(n - 1))
        cnt += grade[n]
    sum += grade[0] * 4
    cnt += grade[0]
    capacity = int(cnt/dic[x][-1])
    avg = '%.2f' % (sum/cnt)    
    dic[x].append(avg)
    dic[x].append(capacity)

for x in dic:
    print(x,dic[x])
csvFile.close()

import pymysql
connection = pymysql.connect(host = 'us-cdbr-iron-east-03.cleardb.net', #host属性
                             user = 'bd2cc55611689c', #用户名 
                             password = '6fee58e8',  #此处填登录数据库的密码
                             db = 'heroku_b2e5fb7fc11f642' #数据库名
                             )
cur = connection.cursor()
for x in dic:
    str1 = 'insert into class values('
    str1 = str1 + x[0] + ',"'+ x[2] + '",' + dic[x][-2] + ',"' + x[1] + '",' + str(dic[x][-1]) + ');'
    cur.execute(str1)
connection.commit()
connection.close()
cur.close()

