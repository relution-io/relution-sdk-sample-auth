#Relution Login Sample
Abhängigkeiten um dieses Tutorial nachzubauen
- [node >= 4.4](https://nodejs.org/en/)
- [typescript](http://www.typescriptlang.org/)
- [relution-cli](https://github.com/relution-io/relution-cli)




### 1. Neues Projekt anlegen
Erstellen Sie einen leeren Ordner am besten über den Terminal.

```bash
>: mkdir relution-sample-auth
```
nun wechseln Sie in den von Ihnen ertellten Ordner un legen Sie ein neues Projekt an. Weitere Information hierzu finden Sie im Develoepr Guide 1.1.

> Beachten Sie das Sie Ihre Applikation auf Ihren Relution Server veröffentlichen müssen.

### 2. Client anlegen

Wenn Sie die ionic cli erfolgreich installiert haben können Sie nun Ihre Client App anlegen.

```bash
> relution-sample-auth: ionic start client --v2 --ts
```

Nun müssen Sie Ihr Relution Projekt um Konfigurieren da nun nicht mehr Ihr www Ordner sondern der Ordner client/www veröffentlicht werden soll.

Hierzu tragen Sie als ersten folgendes in die Datei ```.relutionignore``` ein unm diese dateien auszugrenzen:
```json
    /client/node_modules
    /client/app
    /client/hooks
    /client/platforms
    /client/plugins
    /client/resources
    /client/typings
    /client/.gitignore
    /client/.*
    /client/*.*
    /client/config.xml
```
wechseln Sie nun in den client Ordner und starten Sie testweise das Projekt

```bash
> relution-sample-auth: cd client
> relution-sample-auth/client: ionic serve
```
Die Ausgabe sollte folgendem entsprechen:
```bash
[14:26:23] Starting 'clean'...
[14:26:23] Finished 'clean' after 10 ms
[14:26:23] Starting 'watch'...
[14:26:23] Starting 'sass'...
[14:26:23] Starting 'html'...
[14:26:23] Starting 'fonts'...
[14:26:23] Starting 'scripts'...
[14:26:24] Finished 'html' after 191 ms
[14:26:24] Finished 'scripts' after 192 ms
[14:26:24] Finished 'fonts' after 201 ms
[14:26:25] Finished 'sass' after 1.38 s
8.3 MB bytes written (5.79 seconds)
[14:26:34] Finished 'watch' after 11 s
[14:26:34] Starting 'serve:before'...
[14:26:34] Finished 'serve:before' after 14 μs

Running live reload server: http://localhost:35729
Watching: www/**/*, !www/lib/**/*
√ Running dev server:  http://localhost:8100
Ionic server commands, enter:
  restart or r to restart the client app from the root
  goto or g and a url to have the app navigate to the given url
  consolelogs or c to enable/disable console log output
  serverlogs or s to enable/disable server log output
  quit or q to shutdown the server and exit

ionic $ 
````

und Ihnen den Standardbrowsers Ihres Betriebssystems öffnen mit der ionic starter Tabs app.



