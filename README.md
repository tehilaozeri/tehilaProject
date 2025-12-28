**README – Shopping List System**



מערכת קניות מלאה הכוללת צד לקוח (React + Redux), שרת Backend לניהול מוצרים וקטגוריות (.NET + SQL Server),

ושירות נוסף להזמנות (Express + Elasticsearch).



**מבנה הפרויקט**



project-root/

│── client/               ← React Frontend

│── server-dotnet/        ← .NET API (Products \& Categories) + SQL Server

│── server-express/       ← Express API (Orders) + Elasticsearch

└── database/             ← קבצי דאטה

&nbsp;   ├── elasticsearch/    ← mapping.json לאינדקס הזמנות

&nbsp;   └── sql/              ← schema.sql לטבלאות מוצרים/קטגוריות



**Frontend (client)**



התקנה והרצה:

1\. cd client

2\. npm install

3\. npm start



**Backend 1 (.NET + SQL)**



התקנה:

cd server-dotnet

dotnet restore



יצירת DB:

dotnet ef migrations add InitialCreate

dotnet ef database update



הרצה:

dotnet run



**Backend 2 (Express + Elasticsearch)**



cd server-express

npm install

npm start



Elasticsearch חייב לרוץ על http://localhost:9200







