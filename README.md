# Sonar
## Основная идея проекта

Проект Sonar - сервис для прослушивания музыки, в котором пользователи могут загружать или импортировать треки с других сервисов и воспроизводить их.

## Функционал сервиса

* Пользователь имеет возможность регистрироваться на сервисе с помощью почты и пароля (минимум 6 символов)
* Пользователь имеет возможность загружать свои треки и импортировать их с youtube
* Пользователь имеет возможность создавать свои плейлисты
* Пользователь имеет возможность взаимодействовать с очередью:
    * Добавлять треки в очередь
    * Добавлять все треки из конкретного плейлиста в очередь
    * Перемешивать треки
    * Переключаться между треками
    * Очищать очередь
* Пользователь имеет возможность добавлять других пользователей в друзья и отображать их список, а также видеть, кто хочет добавить в друзья тебя и кого ты сам в друзья хочешь добавить.
* У пользователя есть 3 уровня доступа к своим трекам:
    * Закрытый доступ
    * Открытый доступ
    * Открытый доступ для друзей
* Пользователь имеет возможность загружать треки разных форматов:
    * Mp3
    * Wav
    * Aac
    * Ogg

## Запуск UI для Sonar

Здесь содержится краткая инструкция по тому, как запустить UI для проекта Sonar

### Подготовка к первому запуску

На машине, с которой происходит запуск, должен быть установлени Node.Js 

Для загругрузки зависимостей в папке с проектом необходимо выполнить команду

#### `npm install`

### Запуск React приложения

Перед началом нужно запустить все три модуля

* [UserProfile](https://github.com/is-tech-y24-1/team-4-1)
* [UserTracksManagement](https://github.com/is-tech-y24-1/team-4-2)
* [Player](https://github.com/is-tech-y24-1/team-4-3)

Скачать `ffmpeg` из интернета и закинуть `ffmpeg.exe` в папку `Sonar.Player\Sonar.Player.Api`

После этого запуск приложения происходит с помощью команды 

#### `npm start`

Через некоторое время по адресу `https://localhost:3000` будет доступно приложение. При изменении исходного кода оно автоматически обновится
