const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h1>Validate Fiscal Number-2</h1>
    <form method="post" action="/validate">
      <label for="fiscalNumber">Fiscal Number:</label>
      <input type="text" id="fiscalNumber" name="fiscalNumber" required>
      <button type="submit">Validate</button>
    </form>
  `);
});

app.post('/validate', (req, res) => {
  const schema = Joi.object({
    fiscalNumber: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const fiscalNumber = req.body.fiscalNumber;

  if (isValidFiscalNumber(fiscalNumber)) {
    res.send('Valid fiscal number!');
  } else {
    res.send('Invalid fiscal number.');
  }
});

function isValidFiscalNumber(fiscalNumber) {
    const fiscalNumberRegex = /^[0-9]{2}[0,1][0-9][0-3][0-9][0-9]{4}$/;
    
    if (fiscalNumberRegex.test(fiscalNumber)) {
        return true;
    } else {
        return false;
    }


}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});