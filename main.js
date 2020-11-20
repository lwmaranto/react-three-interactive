'use strict'

const {db} = require('./server/db')
const app = require('./server')
const PORT = 3000



const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log(`Your server, listening on port ${port}`);
})

/*db.sync() 
  .then(() => {
    //console.log('db synced')
    app.listen(PORT, () => console.log(`Your server, listening on port  ${PORT}`))
  })*/