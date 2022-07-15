const shell = require('shelljs');
const fs = require("fs");
let d = new Date();

function backup_psql(
    test = false,
    dir = 'db',
    json_file = 'psql.json',
    su_fix = d.getFullYear() + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2) + "_" + ('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2)
) {
    JSON.parse(fs.readFileSync(json_file)).forEach(e => {
        d = new Date();
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        if (!fs.existsSync(dir + '/' + e.name + '/')) fs.mkdirSync(dir + '/' + e.name + '/');
        shell.echo('Descargando base de datos... ' + e.name + ' ' + su_fix + ' init:' + d.getTime());
        if (!test) shell.exec('pg_dump -s --dbname=' + e.db + ' > ' + dir + '/' + e.name + '/' + su_fix + '_' + e.name + '_schema.sql');
        if (!test) shell.exec('pg_dump -a --dbname=' + e.db + ' > ' + dir + '/' + e.name + '/' + su_fix + '_' + e.name + '_data.sql');
        shell.echo('Descarga de base de datos completada. ' + e.name + ' ' + su_fix + ' seg(s):' + (Date.now() - d.getTime()) / 1000);
    });
}

module.exports = { backup_psql }