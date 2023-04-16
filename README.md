# Запуск приложения
Для запуска введите команду `npm run start:dev`
# Запуск внутри Docker-контейнера
1. ` docker build . -t <your username>/node-web-app `
2. `docker run -p 49160:8080 -d <your username>/node-web-app`