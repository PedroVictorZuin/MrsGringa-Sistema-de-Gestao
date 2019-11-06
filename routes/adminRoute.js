const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../model/Category")
const Categoria = mongoose.model("category")
const flash = require("connect-flash")
const session = require("express-session")
require("../model/Product")
require("../model/Client")
const Produto = mongoose.model("product")
const Cliente = mongoose.model("client")
require("../model/NewNote")
const NovaNota = mongoose.model("note")
const cors = require("cors")
const bodyParser = require("body-parser")
require("../model/SaidaDeProdutoRelatorio")
const httpmsg = require("http-msgs")
const SaidaDeUmNovoProduto = mongoose.model("saidadeprodutorelatorio")
let urlencodedParser = bodyParser.urlencoded({extended:false})



// GET ROUTES  --------------------------------------------------------------

 


router.get('/' , (req,res) => {
    res.render('admin/index')
})



router.get('/listagemDeClientes' , (req,res) =>{
    res.render('admin/listagemClientes')
})


router.get('/cadastroClientes' , (req,res) =>{
    res.render('admin/cadastroClientes')
})




router.get("/cadastroProduto" , (req , res) => {
    Categoria.find().then((categoria) =>{
        res.render("admin/cadastroProduto" , {categoria : categoria})
    }).catch((err) =>{
        req.flash("error_msg" , "Houve um Erro ao listar as categorias exisentes")
        res.redirect("/admin/")
    })
})



router.get("/cadastroCategoria" , (req,res) => {
    res.render("admin/cadastroCategoria")
})


router.get("/listarCategorias" , (req,res) =>{
    Categoria.find().sort({date : "desc"}).then((categoria) => {
        res.render("admin/listarCategorias" , {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg" , "Houve um Erro ao Listar as Categorias")
        res.redirect(/admin/)
    })
    
})





router.get("/listarProdutos" , (req,res) =>{
    Produto.find().populate("category").sort({date: "desc"}).then((produto,categoria)=>{
        res.render("admin/listarProdutos" , {produto : produto})
    }).catch((err) =>{
        req.flash("error_msg" , "Erro ao Listar Produtos ! ")
        res.redirect("admin/listarProdutos")
    })
})


router.get("/entradaemProdutos" , (req,res) => {
    res.render("admin/entradaemProduto")
})


router.get("/entradaEmNota" , (req,res)=>{
    res.render("admin/lancarProdutoEmNota")
})

router.get("/novaVenda" , (req,res) =>{
    res.render("admin/novaVenda")
})





// END GET ROUTES  --------------------------------------------------------------
// POST ROUTES ------------------------------------------------------------------




router.post("/cadastroClientes/newClient" , (req,res)=>{

    let NewClient = req.body.client

    let nameComparation  = NewClient.name + " " + NewClient.otherName


console.log(nameComparation)
    
    Cliente.findOne({name : NewClient.name}).then((client)=>{

        if(client){

            let nameResult = client.name + " " + client.otherName
            if(nameComparation == nameResult){
                console.log("Cliente nao liberado para cadastro , nome ja existente em nosso sistema ")
                res.send("clientenaocadastrado")
            }
            else{
                new Cliente(NewClient).save().then(()=>{
                    res.send("clientecadastrado")
                }).catch((err)=>{
                  
                })
            }
        }
    })



    
})


router.post("/novaVenda/addProduct",urlencodedParser , (req,res)=>{
        const envioCliente = req.body.referencia

    Produto.findOne({reference : envioCliente}).then((productSale)=>{
        if(productSale){
            res.send(productSale)
        }else{
            res.send("false")
        }




    }).catch((err)=>{
        console.log("Nao encontramos produto com esta referencia ! ")
    })

})


router.post("/listarProdutos/saidadoproduto/exit" , (req,res)=>{

Produto.findOne({reference : req.body.reference}).then((produto)=>{

    const QuantidadeARetirar = req.body.quantidadeARetirar

    produto.quantity = produto.quantity - QuantidadeARetirar


    
    const saidaDeProduto = {
        referencia : req.body.reference,
        motivo : req.body.motivoSaida,
        desc : req.body.descSaida,
        quantidadeRetirada : QuantidadeARetirar,
        obs : req.body.obsSaida
    }

        produto.save().then(()=>{
        }).catch((err) => {
            req.flash("error_msg" , "Houve um erro ao Registrar a Saida do Produto" + err)
            res.redirect("/admin/listarProdutos")
        })

   new SaidaDeUmNovoProduto(saidaDeProduto).save().then(()=>{
       res.redirect("/admin/listarProdutos")
   }).catch((err) =>{
       req.flash("error_msg" , "Houve um erro ao Registrar o Relatorio de Saida de Produto" + err)
       res.redirect("/admin/listarProdutos")
   })

})

})


router.post("/listarProdutos/saidadoproduto" , (req,res)=>{

    Produto.findOne({reference : req.body.reference}).populate("category").then((produto)=>{
        res.render("admin/saidadeProduto" , {produto : produto})
    }).catch((err)=>{})

})


router.post("/lancarProdutoEmNota/enterone", (req,res)=>{
    res.send(req.body.nomeProduto)
})

router.post("/lancarProdutoEmNota/success" , (req,res)=>{

const Novanota = {
    numeroNota : req.body.NumeroDaNota,
    quantidadeDeItens : req.body.QuantidadeDeItens,
    nomeFornecedor : req.body.NomeFornecedor
}


Categoria.find().populate("category").sort({date: "desc"}).then((categoria)=>{
    res.render("admin/entradaViaNota" , {categoria : categoria , NovaNota : Novanota})


})


})

router.post("/success/ajaxRequest/entradaEmNota", urlencodedParser , (req,res)=>{
    res.send(req.body.name)
})


router.post("/lancarProdutoEmNota/success/onebyone", urlencodedParser , (req,res)=>{

    const data = req.body;


  

    console.log(data.ref)

    Produto.findOne({reference : data.ref}).then((produ)=>{

        if(produ){

            //bloco de comparacao do nome do produto !
            if(data.name != produ.name)
            {
                //Houve Divergencia , esta referencia esta cadastrada em outro produto !
                res.json({msg : false})
            }

            else {  
                // Produto Encontrado , Vamos dar Entrada nele  
                res.json({msg : "sucessoEntradaProduto"})

                var QuantidadeEntradaNota = produ.quantity + parseInt(data.qtd)


                produ.quantity = QuantidadeEntradaNota
                produ.save()
            }

        }
        else
        {
            //Produto nao encontrado , Vamos cadastrar um novo ...
            res.json({msg : "intermade"})
            
            const NewProduct = {
                name : data.name,
                desc : data.desc,
                reference : data.ref,
                color : data.color,
                quantity : data.qtd , 
                category : data.category,
                buyValue : parseFloat(data.buyValue) ,
                sellValue : parseFloat(data.saleValue)
            }
            Produto(NewProduct).save();
        }
    })


    let NewProduct = {
        name : data.name
    }


  
})


router.post("/listarProdutos/deletar" , (req,res) => {
        Produto.deleteOne({reference : req.body.reference}).then(()=> {
            res.redirect("/admin/listarProdutos")
        }).catch((err) => {
            req.flash("error_msg" , "Houve um Erro ao Deletar o Produto ! ")
            res.redirect("/admin/listarProdutos")
        })
})


router.post("/listarProdutos/pesquisaDaTabela" , (req,res) =>{

    const nomeProduto = req.body.nomeProduto
    const referenciaProduto = req.body.refProduto

    console.log(nomeProduto)
    console.log(referenciaProduto)

})


router.post("/entradaemProdutos/entrada" , (req,res) =>{

    Produto.findOne({_id : req.body.idProduto}).then((produto) =>{


        var QuantidadeAdd = produto.quantity + parseInt(req.body.valorAdd)

        produto.quantity = QuantidadeAdd

        //produto.quantity = produto.quantity + req.body.valorAdd
        


        
        produto.save().then(()=>{
            res.redirect("/admin/listarProdutos")
            
        }).catch((err) =>{
            req.flash("error_msg" , "Erro ao Adicionar quantidade ao sistema ! ")
            res.redirect("/admin/")
        })
    
        

    }).catch((err) =>{
        req.flash("error_msg" , "Produto nao encontrado ! " + err)
        res.redirect("/admin/")
    })



})


router.post("/novaVenda/endSale", urlencodedParser , (req,res)=>{
    let Sale = req.body.products
    let TotalSale = []

    
    for(let i = 0 ; i < Sale.length ; i++){
        Produto.findOne({reference : Sale[i]}).then((produ)=>{
            
            console.log(produ)

        }).catch((err)=>{
            console.log("Produto Nao Encontrado " + err)
        })
    }




})


router.post("/entradaemProdutos/new" , (req,res)=>{

    Produto.findOne({reference : req.body.referenciaProduto}).populate("category").then((produto)=>{
        res.render("admin/pesquisaDaEntradaemProduto" , {produto: produto} )
    }).catch((err)=>{
        req.flash("error_msg" , "Houve um erro ao adicionar o produto existente")
        res.redirect("/admin/")
    })


})




router.post("/cadastroCategoria/new" , (req,res)=>{

    const NewCategory = {
        name : req.body.categoryName,
        desc : req.body.categoryDesc,
    }

    new Categoria(NewCategory).save().then(() => {
            req.flash("success_msg" , "Categoria Cadastrada")
            res.redirect("/admin/")
            }).catch((err)=>{
            req.flash("error_msg" , "Erro ao Cadastrar Categoria       Descricao do Erro : " + err)
    })

})

router.post("/cadastroProduto/new" , (req,res,next) =>{

    var buyValue = parseFloat(req.body.buyValue)
    var sellValue = parseFloat(req.body.sellValue)

    const NewProduct = {
        name : req.body.productName,
        desc : req.body.productDesc,
        reference : req.body.productRef,
        color : req.body.productColor,
        quantity : req.body.quantityProduct,
        category : req.body.productCategory,
        buyValue : buyValue,
        sellValue : sellValue
    }


    
    new Produto(NewProduct).save().then(()=>{
        next
        res.redirect("/admin/listarProdutos")
    }).catch((err)=>{
        req.flash("error_msg" , "Houve uma falha ao cadastrar produto , Codigo do Erro : " + err )
        res.redirect("/admin/")
    })
    

})


router.post("/listarCategoria/deletar" , (req,res) =>{
    Categoria.deleteOne({_id : req.body.id}).then(()=>{
        res.redirect("/admin/listarCategorias")
    }).catch((err)=>{
        req.flash("error_msg" , "Houve um erro ao deletar a Categoria ! ")
        res.redirect("/admin/listarCategoria")
    })
})



// END POST ROUTES ------------------------------------------------------------------






module.exports = router