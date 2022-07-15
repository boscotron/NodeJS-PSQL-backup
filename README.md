# NodeJS PSQL backup

  Script básico para hacer backups de base de datos de PosgresSQL separados en archivos por schema y data bajo  una lista indice de servidores en json.

## Instalar

``` bash
# npm install
```

## Configurar

Crea un archivo ```./psql.json``` con el siguente objeto

``` json
[
  {
    "name": "instance_db_name",
    "db": "postgres://postgres:password@localhost:5432/db_name" 
  }
]
```

Agrega varias instancias de psql.

## Ejecutar

``` shell
# npm start
``` 

### Repuesta

``` shell
> npm start

Descargando base de datos... instance_db_name 20220715_1239 init:1657910361307
Descarga de base de datos completada. instance_db_name 20220715_1239 seg(s):0.003

``` 

El cual generará por defecto el directorio  ```./db/instance_db_name/``` con los archivos .sql descargados en schema y data 


## Importación

```js
  
  const { backup_psql } = require('./backup_psql_simple.js');

  backup_psql(); 

``` 

## Configuración extra


```js
  
  const { backup_psql } = require('./simple.js');

  backup_psql(
    false, // modo prueba
    'db', // direcorio de descarga
    'psql.json', // archivo de configuracion en carpeta .config/
    'AAAAMMDD_HHMM', // sufijo con la fecha y hora de solicitud
  ); 

``` 