//7QDLrvukdzYQIhj0SJQu
const express=require("express");
const cors=require("cors");
const mysql=require('mysql');

const app= express();

app.use(cors());
app.use(express.json());

const arr=[];

app.get("/",(req,res)=>{
    const db = mysql.createConnection({
        host: 'localhost', // Cambia a tu host si es necesario
        user: 'root', // Usuario de tu base de datos
        password: 'Andres07321', // Contraseña de tu base de datos
        database: 'hello_sql', // Nombre de tu base de datos
        port: 3307
    });

    db.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err.message);
            return;
        }
        //console.log('Conexión exitosa a la base de datos.');
        const query = 'SELECT * FROM users';
    
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error.message);
                return;
            }
            //console.log(results)
            const users=results
            res.status(200).json(users)  //.json(arr);
        })
    });
    
    
    
})

app.post("/",(req,res)=>{
    
    

    const db = mysql.createConnection({
        host: 'localhost', // Cambia a tu host si es necesario
        user: 'root', // Usuario de tu base de datos
        password: 'Andres07321', // Contraseña de tu base de datos
        database: 'hello_sql', // Nombre de tu base de datos
        port: 3307
    });


    db.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err.message);
            return;
        }
        
        // Inserción de datos directamente después de la conexión
        const query = 'INSERT INTO users (name, lastname, age, init_date, email) VALUES (?, ?, ?, ?, ?)';
        const values = [req.body.name, req.body.lastname, req.body.age, req.body.init_date, req.body.email]; // Valores a insertar
    
        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error al insertar datos:', err.message);
                db.end(); // Cerrar la conexión si hay un error
                return;
            }
            
            
            // Cerrar la conexión después de insertar los datos
            db.end((err) => {
                if (err) {
                    console.error('Error al cerrar la conexión:', err.message);
                    return;
                }
                res.status(200).end()
                
            });
        });
    });


})

app.delete("/:id",(req,res)=>{
    
    const id = req.params.id; // Recoge el ID desde la consulta
    //console.log('ID recibido:', id); // Imprime el ID en la consola del backend
    const db = mysql.createConnection({
        host: 'localhost', // Cambia a tu host si es necesario
        user: 'root', // Usuario de tu base de datos
        password: 'Andres07321', // Contraseña de tu base de datos
        database: 'hello_sql', // Nombre de tu base de datos
        port: 3307
    });

    db.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err.message);
            return;
        }
        //console.log('Conexión exitosa a la base de datos.');
        const query = `DELETE FROM users where users_id=${id}`;
    
        db.query(query, (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error.message);
                return;
            }
            return;
        })
        let query2 = `SELECT * FROM users`;
        db.query(query2, (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error.message);
                return;
            }
            const users=results
            res.status(200).json(users) 
            return;
        })
    });
    
})

app.put("/:id",(req,res)=>{
    const db = mysql.createConnection({
        host: 'localhost', // Cambia a tu host si es necesario
        user: 'root', // Usuario de tu base de datos
        password: 'Andres07321', // Contraseña de tu base de datos
        database: 'hello_sql', // Nombre de tu base de datos
        port: 3307
    });

    db.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err.message);
            return;
        }
        
        // Inserción de datos directamente después de la conexión
        const query = `
    UPDATE users 
    SET name = ?, lastname = ?, age = ?, init_date = ?, email = ?
    WHERE users_id = ?
`;
        console.log(req.params.id )
const values = [
    req.body.name,       // Valor para name
    req.body.lastname,   // Valor para lastname
    req.body.age,        // Valor para age
    req.body.init_date,  // Valor para init_date
    req.body.email,      // Valor para email
    req.params.id        // Valor para users_id (ID del usuario)
];

    
        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error al modificar datos:', err.message);
                db.end(); // Cerrar la conexión si hay un error
                return;
            }
            
            
            // Cerrar la conexión después de insertar los datos
            db.end((err) => {
                if (err) {
                    console.error('Error al cerrar la conexión:', err.message);
                    return;
                }
                
                res.status(200).json({
                 "message": `USUARIO EDITADO CORRECTAMENTE`
                })
                
            });
        });
    });

    
})


app.listen(4000)

