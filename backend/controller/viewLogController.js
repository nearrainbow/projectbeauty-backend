const ViewLog = require("../models/ViewLog");

const formatDate = (date) => {

    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // month is zero-based
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formatted = dd + '/' + mm + '/' + yyyy;
    return formatted;
}


const get30daysView = async (req, res) => {
  try {
    const viewLogs = await ViewLog.find({});

    const date = [];
    const start = new Date();
    for(var i=0 ; i<30 ; i ++) {
        date.push(formatDate(start))
        start.setDate(start.getDate() - 1)
    }

    const views = Array(30).fill(0); ;
    viewLogs.forEach(view => {
        date.forEach((da,i) => {
            if(da == view.date) {
                views[i] = view.view;
            }
        })
    })

    const allViewLog = await ViewLog.findOne({date: 'all'});
    const allTimeView = !!!allViewLog ? 0: allViewLog.view;


    res.json({ 
        success: 1, 
        date: date.reverse(), 
        views: views.reverse(),
        allTimeView: allTimeView,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const addView = async (req, res) => {
    try {
      const date = new Date();
      const formatted = formatDate(date);
      const viewLog = await ViewLog.findOne({date: formatted});

      const allLog = await ViewLog.findOne({date: 'all'});

      if(!!!allLog) {
        await ViewLog.create({
            date: 'all',
            view: 1,
        })
      } else {
        await ViewLog.findOneAndUpdate(
            {date: 'all'},
            {view: allLog.view + 1}
        );
      }

      if(!!!viewLog) {
        await ViewLog.create({
            date: formatted,
            view: 1,
        })
        res.json({ success: 1, date: formatted, type: "create"});
      } else {
        await ViewLog.findOneAndUpdate(
            {date: formatted},
            {view: viewLog.view + 1},
            {upsert: true},
        );
        res.json({ success: 1, date: formatted, type: "update"});
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };


module.exports = {
    get30daysView,
    addView
};
