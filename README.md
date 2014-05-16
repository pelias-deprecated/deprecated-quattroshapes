
### pelias-quattroshapes

`pelias-geonames` comes with a command-line tool to make it easier to download/parse and import quattroshapes data in to Pelias.

### install

```bash
npm install
```

### importing data

You must download and unzip the quattroshapes data files in to the `/data` directory before starting an import.

To simplify this process & grab all the latest data files:

```bash
peter@manta:/var/www/pelias-quattroshapes$ ./bin/pelias-quattroshapes.js -d
 qs_adm0.zip                    [===================] 100% 0.0s
 qs_adm1.zip                    [===================] 100% 0.0s
 qs_adm2.zip                    [===================] 100% 0.0s
 qs_localadmin.zip              [===================] 100% 0.0s
 gn-qs_localities.zip           [===================] 100% 0.0s
 qs_neighborhoods.zip           [===================] 100% 0.0s
```

You can confirm the data files were successfully downloaded by executing `ls` on the `/data` directory:

```bash
peter@manta:/var/www/pelias-quattroshapes$ ls data
gn-qs_localities.cpg  qs_adm0.shp  qs_adm2.dbf        qs_localadmin.shx
gn-qs_localities.dbf  qs_adm0.shx  qs_adm2.prj        qs_neighborhoods.cpg
gn-qs_localities.prj  qs_adm1.cpg  qs_adm2.shp        qs_neighborhoods.dbf
gn-qs_localities.shp  qs_adm1.dbf  qs_adm2.shx        qs_neighborhoods.prj
gn-qs_localities.shx  qs_adm1.prj  qs_localadmin.cpg  qs_neighborhoods.shp
qs_adm0.cpg           qs_adm1.shp  qs_localadmin.dbf  qs_neighborhoods.shx
qs_adm0.dbf           qs_adm1.shx  qs_localadmin.prj
qs_adm0.prj           qs_adm2.cpg  qs_localadmin.shp
```