----------------------------
departments
----------------------------
id      integer
name    text
============================

----------------------------
units
----------------------------
id      integer
name    text
abbr    text
============================

----------------------------
products
----------------------------
id      integer
name    text
unit    integer (fk)
============================


----------------------------
departments
----------------------------
id      integer
name    text
============================

----------------------------
employees
----------------------------
id          integer
name        text   
birth       date
employed    date
department  integer (fk)
============================

----------------------------
boiling
----------------------------
id          integer
datetime    datetime
product     integer (fk)
volume      decimal
duration    integer
temperature decimal
employee    integer (fk)
notes       text
============================

----------------------------
packaging
----------------------------
id          integer
datetime    datetime
product     integer (fk)
count       integer
line        integer
weight      integer
employee    integer (fk)
notes       text
============================

----------------------------
separation
----------------------------
id          integer
datetime    datetime
product     integer (fk)
volume      decimal
fat         decimal
temperature decimal
equipment   integer
employee    integer (fk)
notes       text
============================


Варка (Keitto): время, дата, продукт (напр. йогурт), объём (л), длительность (мин), температура, исполнитель, примечания .


Упаковка (Pakkaamo): время, дата, продукт, кол-во упаковок (шт), линия (№), общий вес (кг), упаковщик, примечания .


Сепарирование (Separointi): время, дата, объём (л), жирность (%), температура (°C), оборудование (№ сепаратора), сепараторщик, примечания