var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var trucosModel = require('../models/trucosModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    var trucos = await trucosModel.getTrucos();
    res.render('index', { 
      title: 'Express',
      trucos: trucos
    });
  } catch (error) {
    next(error);
  }
});



router.post('/', async (req, res, next) => {
  try {
    const email = req.body.email;
    const nombre = req.body.nombre; 
    

    var transport = nodemailer.createTransport({
      host: process.env.smtp_host,
      port: process.env.smtp_port,
      auth: {
        user: process.env.smtp_user,
        pass: process.env.smtp_pass
      }
    })    

 // Definir el contenido del correo
 const mailOptions = {
  from: 'emmanuelpaz.91@gmail.com', // Cambia esto por tu dirección de correo
  to: 'emmanuelpaz.91@gmail.com', // Cambia esto por la dirección de correo de destino
  subject: 'Nuevo suscriptor',
  text: `Se enviará news a ${email} con nombre ${nombre}.`
};

// Enviar el correo
await transport.sendMail(mailOptions);

res.send(`
<script>
  alert('Datos recibidos y correo enviado correctamente');
  window.location.href = '/';
</script>
`);
} catch (error) {
next(error);
}
});

module.exports = router;