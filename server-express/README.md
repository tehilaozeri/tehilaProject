# Orders API Server

שרת Express.js לניהול הזמנות עם אינטגרציה ל-Elasticsearch.

## דרישות מערכת

- Node.js גרסה 14 ומעלה
- npm או yarn
- Elasticsearch גרסה 7.x ומעלה (רצה על http://localhost:9200)

## התקנה

```bash
npm install
```

## הפעלה

1. הפעל את Elasticsearch על פורט 9200
2. הפעל את השרת:

```bash
npm start
```

השרת יפעל על http://localhost:5000

תיעוד מלא זמין דרך Swagger UI:

http://localhost:5000/api-docs


## הערות

- השרת משתמש ב-Elasticsearch לאינדקס `orders`
- כל הזמנה מקבלת ID ייחודי: `o_` + timestamp
- השדה `email` הוא אופציונלי
- השדה `items` חייב להכיל לפחות פריט אחד

## פתרון בעיות

אם אתה מקבל שגיאת `ECONNREFUSED`:
1. וודא ש-Elasticsearch רץ
2. בדוק שהפורט 9200 פתוח
3. נסה לגשת ל-http://localhost:9200 בדפדפן
