const multer = require('multer')
const path = require('path')
const fs = require('fs')

const dirs = ['public/uploads/images', 'public/uploads/datapacks', 'public/uploads/resourcepacks']

const storage = multer.diskStorage(() => {
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    })

    return {
        destination: (req, file, cb) => {
            if(file.fieldname == 'image') cb(null, 'public/uploads/images')
            if(file.fieldname == 'datapack') cb(null, 'public/uploads/datapacks')
            if(file.fieldname == 'resourcepack') cb(null, 'public/uploads/resourcepacks')
        },
        filename: (req, file, cb) => {
            // cb(null, `${Date.now()}-${file.originalname}`)
            cb(null, `${req.body.title + path.extname(file.originalname)}`)
        }
    }
})

module.exports = multer({
    storage,
    limits: {fileSize: 1000000}
}).fields([{
    name: 'image', maxCount: 5
},{
    name: 'datapack', maxCount: 1
},{
    name: 'resourcepack', maxCount: 1
}])
