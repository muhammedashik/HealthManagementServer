const  registrationmodel = require('../model/registrationmodel');

const appRouter = (app) => {
    app.post('/api/saveSignDAta', (req, res) => {
        registrationmodel.saveSignDAta(req.body, (error, result) => {
          if (error) {
            return res.status(400).send(error);
          }
          res.send(result);
        });
      });
    app.post('/api/login_user', (req, res) => {
      console.log('this data come here', req.body);
      registrationmodel.login(req.body, (error, result) => {
        if (error) {
          return res.status(400).send(error);
        }
        res.send(result);
      });
    });
    
    
    app.get('/api/getUserData', (req,res)=>{
      console.log('req.body',req.query)
      registrationmodel.getUserData(req.query,(error,result)=>{
        if(error){
          return res.status(400).send(error);
        }
        res.send(result);
      })
    });

    app.post('/api/saveDataPatient', (req, res) => {
      registrationmodel.saveDataPatient(req.body, (error, result) => {
        if (error) {
          return res.status(400).send(error);
        }
        res.send(result);
      });
    });
    app.get('/api/getPatientDetails', (req,res)=>{
      console.log('req.body',req.query)
      registrationmodel.getPatientDetails(req.query,(error,result)=>{
        if(error){
          return res.status(400).send(error);
        }
        res.send(result);
      })
    });
    
    app.get('/api/getTodayAppoinmentList', (req,res)=>{
      console.log('req.body',req.query)
      registrationmodel.getTodayAppoinmentList(req.query,(error,result)=>{
        if(error){
          return res.status(400).send(error);
        }
        res.send(result);
      })
    });
}

module.exports =appRouter