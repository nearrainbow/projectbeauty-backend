require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const viewLogRoutes = require("./routes/viewLogRoutes");
const { connectDB } = require("./config/db");
const cors = require("cors");
const multer = require("multer");
const Order = require("./models/Order");

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// http://47.236.25.128/images/Icon%20design%20SVG.png


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, __dirname + '/public/images');
  },
  // Sets file(s) to be saved in uploads folder in same directory
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
  // Sets saved filename(s) to be original filename(s)
})
// Set saved storage options:
const upload = multer({ storage: storage })
app.post('/api/upload_image', upload.array("files"), (req, res) => {

  res.json({ 
    message: "File(s) uploaded successfullys", 
    path: '/api/images/' + req.files[0].originalname
  });
});

app.post('/api/test', async (req, res) =>  {
  try {
    const order = await Order.findOne({})
    var p = '';
    for(var product of order.products) {
      p += `${product.name}: ${product.count} ชิ้น\n`;
    }
    const message = `ชื่อลูกค้า: ${order.name}\nเบอร์โทร: ${order.tel}\nขนส่ง: ${order.logistic}\nที่อยู่: ${order.address}\nจำนวนเงิน: ${order.total}\n${p}`

    const body = {
      "to": "U248b556e2f8525e32432b9d3dd4b7c6d",
      "messages":[
        {
          "type": "text",
          "text": message
        }
      ]
    };
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + "KIHbKQBAVa51shj1QNACUp1kHHZbndMLj9L+YgdhWyUOsnSMFmD+v/8jIU6JVrfjgBr8uMLI85yKeig/P4m643JccAppxYnAcFufVE1ShLrbBNE4ILyIR8U7uzu1KeMhqpa3yrywTlE2AkfhAA5qVQdB04t89/1O/w1cDnyilFU=",
      },
      body: JSON.stringify(body),
    };
    fetch("https://api.line.me/v2/bot/message/push", params);
    res.json(message);
  } catch(e) {
    res.status(500).json({ message: "Server Error2" });
  }
  
});

// app.use(express.static('backend/public'))
app.use("/api/", express.static('backend/public'))

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});


app.get("/api/test", (req, res) => {
  res.json({ message: "API running..." });
});
app.get("/api/test/", (req, res) => {
  res.json({ message: "API running..." });
});
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/viewlog", viewLogRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
