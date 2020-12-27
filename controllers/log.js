const Log = require("../models/log");
exports.getLogs = async (req, res) => {
  const logs = await Log.find();
  res.status(200).json({
    status: "success",
    logs,
  });
};

exports.createLog = async (req, res) => {
  const { logMessage } = req.body;
  const newLog = new Log({
    logMessage: logMessage,
  });
  if (newLog.logMessage) {
    try {
      await newLog.save();
      res.status(200).json({
        status: "success",
        message: "Log Saved in DB",
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      status: "fail",
      message: "logMessage is required",
    });
  }
};

exports.getLogOfDate = async (req, res) => {
  const { date, month, year } = req.params;
  if (date && month && year) {
    try {
      const logs = await Log.find({
        dateTime: {
          $gte: new Date(`${year}-${month}-${date}T00:00:00.000Z`),
          $lt: new Date(`${year}-${month}-${parseInt(date) + 1}T00:00:00.000Z`),
        },
      });
      res.status(200).json({
        status: "success",
        logs,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      status: "fail",
      message: "Date, Month and Year all are required",
    });
  }
};

exports.updateLog = async (req, res) => {
  const { id } = req.params;
  const { logMessage } = req.body;
  if (id) {
    try {
      const oldLog = await Log.findById(id);
      const updatedLog = new Log({
        logMessage: logMessage ?? oldLog.logMessage,
        dateTime: oldLog.dateTime,
        _id: oldLog._id,
      });
      await Log.findByIdAndUpdate(id, updatedLog, { new: false });
      res.status(200).json({
        status: "success",
        updatedLog,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      status: "fail",
      message: "id is required",
    });
  }
};

exports.deleteLog = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      await Log.findByIdAndDelete(id);
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      status: "fail",
      message: "id is required",
    });
  }
};
