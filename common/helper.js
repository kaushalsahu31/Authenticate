const multer  = require('multer')

module.exports.validater = (res, search, data) => {
    for (let i = 0; i < search.length; i++) {
        if (data[search[i]] == "" || data[search[i]] == undefined || data[search[i]] == null) {
            return this.HandleRes(res, 400, search[i] + " invalid input");
        }
    }
};


module.exports.HandleRes = (res, status = 500, message = "Something went wrong", data = []) => {
    return res.status(status).json({ status, success: status < 400 ? true : false, message, data });
};


module.exports.getData = async (Model, id = '', condition = null, pages = { page: 1, limit: 10 }, include = [], order = null, attributes = null) => {
    try {
        let data;

        if (pages === 'all' || pages === 'single') {
            if (condition) {
                data = await Model.findAll({ where: condition, order, attributes, include });
            } else if (id !== '') {
                data = await Model.findByPk(id, { attributes, include });
            } else {
                data = await Model.findAll({ order, attributes, include });
            }
            return [true, pages === 'single' ? (data.length > 0 ? data[0] : {}) : data];
        }

        const offset = (pages.page - 1) * pages.limit;
        let count = 0;
        if (id !== '') {
            data = await Model.findByPk(id, { attributes, include });
            count = data ? 1 : 0;
        } else if (condition) {
            data = await Model.findAndCountAll({ where: condition, limit: pages.limit, offset, order, attributes, include });
            count = data.count;
        } else {
            data = await Model.findAndCountAll({ limit: pages.limit, offset, order, attributes, include });
            count = data.count;
        }
        return [true, { data: data.rows, count, currentPage: pages.page }];
    } catch (error) {
        return [false, error.message];
    }
};



module.exports.upload = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const ext = file.mimetype.split("/")[0];
      if (ext === "image") {
        cb(null, "uploads/images");
      } else {
        cb(null, "uploads/others");
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}.${file.originalname}`);
    },
  })
});

