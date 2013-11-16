var module_race = require("../lib/modules/yorick");

exports.configure = function (app){
        app.get('/', function(req, res){
                res.render ('index.php', {title: 'Yorick'});
        });
}
