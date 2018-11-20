# Desafio Minutrade
## Vending Machine

## Backend

The backend initial setup was generated with [Expess Generator](https://github.com/expressjs/generator) version 4.16.0.
The database connection is made at [mLab](https://mlab.com), an external MongoDB cloud service. Since this project is not meant to production but only a development little test, i'm using the free tier mLab plan.

### Start server

Run `npm install` and then `npm start` for a dev server. The server will then start listening to `http://localhost:3000/`. In case you have changed your default express port, make sure to also update the frontend request address.

### Further help

To get more help on the express CLI go to the [Express Official Docs](http://expressjs.com/).

## Frontend

The frontend initial setup was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

### Development server

Run `npm install` and then `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build and `--aot` to use ahead of time compilation.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
