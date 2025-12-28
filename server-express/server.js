/**
 * Orders API Server
 * שרת Express לניהול הזמנות עם Elasticsearch
 * 
 */

const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());
app.use(cors());

// ==================== הגדרת Swagger ====================
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Orders API',
      version: '1.0.0',
      description: 'API לניהול הזמנות עם Elasticsearch',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./server.js'], // נתיב לקובץ עם התיעוד
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const client = new Client({ node: 'http://localhost:9200' });

/**
 * @returns {Promise<void>}
 */
async function checkElasticsearchConnection() {
  try {
    const health = await client.cluster.health();
    console.log('Connected to Elasticsearch:', health);
  } catch (error) {
    console.error('Cannot connect to Elasticsearch:', error.message);
    console.error('Make sure Elasticsearch is running on http://localhost:9200');
  }
} 

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: יצירת הזמנה חדשה
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - address
 *               - items
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "יוסי כהן"
 *                 description: שם מלא של הלקוח
 *               address:
 *                 type: string
 *                 example: "רחוב הרצל 10, תל אביב"
 *                 description: כתובת למשלוח
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "yossi@example.com"
 *                 description: כתובת אימייל (אופציונלי)
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - name
 *                     - price
 *                     - qty
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "prod_123"
 *                     name:
 *                       type: string
 *                       example: "מוצר דוגמה"
 *                     price:
 *                       type: number
 *                       example: 99.90
 *                     qty:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: ההזמנה נוצרה בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order created successfully"
 *                 orderId:
 *                   type: string
 *                   example: "o_1234567890"
 *       400:
 *         description: שדות חובה חסרים
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields"
 *       500:
 *         description: שגיאת שרת
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: string
 */
// ==================== Routes ====================

/**
 * POST /api/orders
 * יצירת הזמנה חדשה
 * 
 * @route POST /api/orders
 * @param {Object} req.body - נתוני ההזמנה
 * @param {string} req.body.fullName - שם מלא של הלקוח (חובה)
 * @param {string} req.body.address - כתובת למשלוח (חובה)
 * @param {string} req.body.email - כתובת אימייל (אופציונלי)
 * @param {Array} req.body.items - רשימת מוצרים (חובה, מינימום 1)
 * @returns {Object} 201 - הזמנה נוצרה בהצלחה
 * @returns {Object} 400 - שדות חובה חסרים
 * @returns {Object} 500 - שגיאת שרת
 * @returns {Object} 503 - Elasticsearch לא זמין
 */
app.post("/api/orders", async (req, res) => {
  try {
    const { fullName, address, email, items } = req.body;

    if (!fullName || !address || !items || items.length === 0) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["fullName", "address", "items"]
      });
    }

    const totalPrice = items.reduce((sum, item) => {
      const itemPrice = Number(item.price) || 0;
      const itemQty = Number(item.qty) || 0;
      return sum + (itemPrice * itemQty);
    }, 0);

    const orderDocument = {
      id: `o_${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      address: address.trim(),
      email: email ? email.trim() : '',
      totalPrice: totalPrice,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: Number(item.price),
        qty: Number(item.qty)
      }))
    };

    const response = await client.index({
      index: 'orders',
      id: orderDocument.id,
      document: orderDocument
    });

    res.status(201).json({
      message: "Order created successfully",
      orderId: orderDocument.id,
      totalPrice: totalPrice
    });

  } catch (error) {
    console.error("Server Error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    if (error.message && error.message.includes('ECONNREFUSED')) {
      return res.status(503).json({ 
        message: "Elasticsearch service is not available", 
        error: "Please make sure Elasticsearch is running on http://localhost:9200" 
      });
    }
    
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message || String(error),
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// ==================== הפעלת השרת ====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(` Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`API Endpoint: http://localhost:${PORT}/api/orders`);
  await checkElasticsearchConnection();
});