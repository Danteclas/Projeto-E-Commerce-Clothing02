//importando packages
const express = require('express');
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const path = require("path");

//firebase admin setup
let serviceAccount = require("./ecom-website-ab147-firebase-adminsdk-5yp0a-4c5335c6bc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

//declarando static path
let staticPath = path.join(__dirname, "public");

//inicializando express.js
const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//routes
//home route
app.get("/", (req, res)=>{
    res.sendFile(path.join(staticPath, "index.html"));
})

//signup route
app.get("/signup", (req, res)=>{
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post("/signup", (req, res) =>{
    let { nome, email, password, numero, tac, notification} = req.body;

    //validações do form
    if(nome.value.length < 3){
        return res.json({'alert': 'Nome precisa ter ao menos 3 letras'});
    }else if(!email.value.length){
        return res.json({'alert': 'Por favor, coloque o seu email'});
    }else if(password.value.length < 8){
        return res.json({'alert': 'A senha precisa de ao menos 8 caracteres'});
    }else if(!numero.value.length){
        return res.json({'alert': 'Por favor, coloque o seu celular'});
    }else if(!Number(numero.value) || numero.value.length < 9){
        return res.json({'alert': 'Número inválido, por favor, adicione um número de celular válido!'});
    }else if(!tac){
        return res.json({'alert': 'Você precisa aceitar os nossos termos e condições para continuar'});
    }

    //armazenar usuários no bd
    db.collection('users').doc(email).get()
    .then(user => {
        if(user.exists){
            return response.json({'alert': 'o email já existe'});
        }else{
            //criptografar o password antes de armarzenar
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(password, salt, (err, hash)=>{
                    req.body.password = hash;
                    db.collection('users').doc(email).set(request.body)
                    .then(data =>{
                        response.json({
                            nome: request.body.nome,
                            email: request.body.email,
                            seller: request.body.seller,
                        })
                    })
                })
            })
        }
    })

    response.json('dados recebidos');
})

//404 route
app.use("/404",(req, res)=>{
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res)=>{
    res.redirect("/404");
})

app.listen(3000, ()=>{
    console.log("A porta 3000 foi ativada...");
})