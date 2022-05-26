const { mssql, pool} = require('../dbCon/dbsql');

function registrationmodel(){}

registrationmodel.saveSignDAta = async (data, callback)=>{
try {
    console.log('da ta', data);
    const ssqlPool = await pool;
    const result = await ssqlPool.request()
    .input('frist_name', mssql.VarChar(200), data.first_name)
    .input('last_name', mssql.VarChar(200), data.last_name)
    .input('date_of_birth', mssql.VarChar(200), data.date_of_brith)
    .input('email', mssql.VarChar(200), data.email)
    .input('user_password', mssql.VarChar(300), data.password)
    .input('mobile_number', mssql.Numeric, data.mobile_No)
    .execute('sp_create_signUp');
    callback(null, {
        message: result,
        auth:true
      })
}catch(err){
    console.log('sql error', err.message);
    res.status(500);
    res.send(err.message);
  
}


}

registrationmodel.login = async (data, callback)=>{
    console.log('user data', data);
    try{
        const mssqlPool = await pool;
        const result = await mssqlPool.request().
        input('email', mssql.NVarChar, data.email)
        .input('password', mssql.NVarChar(200),data.password)
        .query('select email, user_password,frist_name,last_name,date_of_birth,mobile_number,id '
        + 'FROM signUp_page  '
        + 'WHERE email=@email and user_password = @password');
        if (result.recordset.length === 1) {
            console.log('result', result.recordsets);
            callback(null, {
                auth: true,
                user_data:result.recordsets
            })
        } else{
            callback(null, {
                auth: false,
                message: 'Invalid User Name or Password...!!'
              });
        }
        
    } catch(err){
        console.log('sql error', err.message);
        callback(null, {
            auth: false,
            message: 'Invalid User Name or Password...!!'
          });
    }
} 
registrationmodel.getUserData = async(params, callback)=>{
    console.log('res',params)
    try{
        const mssqlPool = await pool;
        const result = await mssqlPool.request().
        query(`select * from signUp_page where id ='${+ params.id}'  `)
        callback(null,{
            message: result.recordsets
        })
    }catch(err){
        console.log('sql error', err.message);
        res.send(err.message);
    }
}
registrationmodel.saveDataPatient = async (data,callback)=>{
    try{
        console.log('patient data', data);
        const ssqlPool = await pool;
    const result = await ssqlPool.request()
    .input('patientName', mssql.VarChar(200), data.Patient_name)
    .input('mobileNo', mssql.Numeric, data.mobile_No)
    .input('appointmentDate', mssql.VarChar(200), data.appointment_data)
    .input('patientAddress', mssql.VarChar(200), data.address)
    .input('user_id', mssql.Numeric, data.user_id)
    .execute('sp_create_patient');
    callback(null, {
        message: result,
      })
    }catch(err){
        console.log('sql error', err.message);
        res.send(err.message);
    }
}
registrationmodel.getPatientDetails = async(params, callback)=>{
    try{
        console.log('param',params)
        const mssqlPool = await pool;
        const result = await mssqlPool.request().
        query(`select * from patient_list where user_id ='${+ params.id}' and delete_bit = 0  `)
        callback(null,{
            message: result.recordsets
        })
    }
    catch(err){
        console.log('sql error', err.message);
        res.send(err.message);
    }
}

registrationmodel.getTodayAppoinmentList = async(params, callback)=>{
    try{
        console.log('param',params)
        const mssqlPool = await pool;
        const result = await mssqlPool.request().
        query(`select * from patient_list
        where cast(appointmentDate as Date) = cast(getdate() as Date) and  user_id ='${+ params.id}'`)
        callback(null,{
            message: result.recordsets
        })
    }
    catch(err){
        console.log('sql error', err.message);
        res.send(err.message);
    }
}
module.exports = registrationmodel