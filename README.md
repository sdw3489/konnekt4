# Konnekt4

A fun online 2 player game of connect four.

Sign up and play at [konnekt4.seth-whitaker.com](http://konnekt4.seth-whitaker.com)

##  Install

#### Database

1. Import the `/_database/install.sql` into your database to set up the tables.
2. Update the `/www/app/config/database.php` with your connection information.


## Development

This project is developed with CodeIgniter as a backend framework. Development MVC files are located in the `/www/app/` folder.

#### SASS

To run sass open up terminal and navigate to the root of the project and run the following command:

```
compass watch
```

This will begin watching the sass partials located in `/www/css/sass/` folder and compile the css and css source maps on modification.

#### Scripts

The scripts in this project are written with BackboneJS models, views & collections. Each view & model is wrapped in a RequireJS AMD module format.

Each view, model, collection, event channel, router, classes & utilities are located in their respective folder within the `/www/js/` folder.
UnderscoreJS templates are located in `/www/templates/`. They are loaded in the AMD modules as dependencies using the RequireJS text plugin.

Third Party javascript libraries are located in `/www/js/libs/`