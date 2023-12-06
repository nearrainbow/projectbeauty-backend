const Order = require("../models/Order");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({'createdAt':-1});
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrderByIds = async (req, res) => {
    const ids = req.body.ids
    try {
      const orders = await Order.find().where('_id').in(ids).sort({'createdAt':-1});
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

const addOrder = async (req, res) => {
    try {

      const order =  await Order.create({
        ...req.body
        })
      
      var p = '';
      for(var product of order.products) {
        p += `${product.name}: ${product.count} ชิ้น\n`;
      }
      const message = `ชื่อลูกค้า: ${order.name}\nเบอร์โทร: ${order.tel}\nขนส่ง: ${order.logistic}\nที่อยู่: ${order.address}\nจำนวนเงิน: ${order.total} บาท\n${p}`
    
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

      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };


module.exports = {
    getOrders,
    addOrder,
    getOrderByIds
};
