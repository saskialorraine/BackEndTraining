const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    data: {
      requestedAt: req.requestTime,
      results: tours.length,
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params); //this property is an object containing properties mapped to the named route "parameter"
  const id = req.params.id * 1; //trick: string to number when multply w 1
  const tour = tours.find((el) => el.id === id);

  //find = java script function on array
  //loop through array, each of iterations element

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;

  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: newID, ...req.body };
  //The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      //201=created
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here..>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    //204 = delete status
    status: 'success',
    data: null,
  });
};
