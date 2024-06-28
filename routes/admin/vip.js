var express = require('express');
var router = express.Router();
var trucosModel = require('../../models/trucosModel');

router.get('/', async function (req, res, next) {
  var trucos = await trucosModel.getTrucos();

  res.render('admin/vip', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    trucos
  });
});

router.get('/eliminar/:id', async (req, res, next) => {
  const id = req.params.id;
  await trucosModel.deleteTrucosById(id);
  res.redirect('/admin/vip')
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  })
});

router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.usuario != "" && req.body.juego != "" && req.body.truco != "") {
      await trucosModel.insertTrucos(req.body);
      res.redirect('/admin/vip')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargó el Truco'
    })
  }
})

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var truco = await trucosModel.getTrucosById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    truco
  });
});

router.post('/modificar', async (req, res, next) => {
  try {
    var obj = {
      usuario: req.body.usuario,
      juego: req.body.juego,
      truco: req.body.truco
    }

    console.log(obj)
    await trucosModel.modificarTrucosById(obj, req.body.id);
    res.redirect('/admin/vip');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó el post'
    })
  }
});

module.exports = router;