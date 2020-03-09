const express = require('express')
const router = express.Router()
const { validation, schema } = require('../validator/users')
const db = require('../config/db') // เรียกใช้งานเชื่อมกับ MySQL
const users = require('../mock-users') // ใช้งานข้อมูลจำลองจากไฟล์ mock-users.js
  
router.route('/users?')
    // .get((req, res, next) => { 
    //     // แสดงข้อมูลทั้งหมด
    //     db.connect();
    //     return res.json({})
    // })

    .get((req, res, next) => { 
        // ทำการแสดงข้อมูลทั้งหมด
        let sql = ' SELECT * FROM users '
        db.query(sql,(error, results, fields)=>{
            // เกิด error ในคำสั่ง sql
            if(error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            // แสดงข้อมูลกร๊ไม่เกิด error
            const result = {
                "status": 200,
                "data": results
            }
            return res.json(result)        
        })
    })

    .post(validation(schema),(req, res, next) => {   
        // เพิ่มข้อมูลใหม่เข้าไปในฐานข้อมูล และแสดงข้อมูลใหม่ที่เพิ่งเพิ่ม
        return res.json({})
    })
  
router.route('/users/:id')
    .all((req, res, next) => {// ทุกๆ Request มาที่ "/user/:id"
        // // หาว่า ใน users มี user.id ที่ตรงกับ params.id หรือไม่ ถ้ามี ก็เก็บ user นั้นๆ
        // let user = users.find( (user) => user.id === parseInt(req.params.id))
        // // ถ้าไม่มี ก็ส่งสถานะ 400 และข้อความกลับออกไป
        // if(!user) return res.status(400).json({"status":400,"message":"Not found user with the given ID"})
        // res.user = user // กรณีข้อมูล user ส่งต่อไปยังฟังก์ชั่นถัดไป
        next()
    })
    .get((req, res, next) => {// GET มาที่ path: "/user/:id" ใดๆ
        // ส่งข้อมูล user ที่หาเจอ และได้มาจากฟังก์ชั่นก่อนหน้า ส่งออกไป
        let sql = ' SELECT * FROM users where uid='+req.params.id;
        db.query(sql,(error, results, fields)=>{
            // เกิด error ในคำสั่ง sql
            if(error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            // แสดงข้อมูลกร๊ไม่เกิด error
            const result = {
                "status": 200,
                "data": results
            }

            return res.json(result)
        })
    })
    .put(validation(schema),(req, res, next) => {   
        // ทำการแก้ไขรายการข้อมูลของ id ข้อมูลที่ต้องการ จากฐานข้อมูล แล้วแสดงรายการข้อมูลที่แก้ไข
        return res.json({})
    })
    .delete((req, res, next) => { 
        // ทำการลบช้อมูลของ id ข้อมูลที่ต้องการ จากฐานข้อมูล แล้วแสดงข้อมูลที่เพิ่งลบ
        return res.json({})
    })
  
module.exports = router