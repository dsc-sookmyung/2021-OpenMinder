# 2021 Solution Challenge :  Everyone’s meal
* Team : Open Minder
* Members : Heyju Jun, Juyeon Lee, Haram Lee, Minhye Shin


## Demo video
* You can see demo video on YOUTUBE : [Everyone's Meal | Google DSC Solution Challenge 2021](https://youtu.be/9S_JYTBmbzo)


## How to run
> 1. Download this project
```
git clone https://github.com/dsc-sookmyung/2021-OpenMinder.git
```

> 2. Run Object detection REST API server
```
cd /path/to/2021-OpenMinder/object_detection_api/
```
(1) Setting up a python virtual environment (Choose one of the two)
* In anaconda prompt
```
conda create -n "test" python=3.7
conda activate test
```
* or in local environment
```
python -m venv myproject
cd /venvs/myproject/Scripts
activate
```

(2) Install libraries in virtual environment (Choose one of the two)
* Download using requirements.txt
```
pip install -r requirements.txt
```

* or download one by one
```
pip install flask
pip install flask-restful
pip install tensorflow==2.3.1
pip install pandas
pip install jsonify
pip install werkzeug
pip install pillow
```

(3) Run server
```
python api.py
```

> 3. Run Spring boot backend server
```
cd /path/to/2021-OpenMinder/emeal
```
(1) Create an application.yml file
```
# in emeal/src/main/resources/application.yml
# Make GCP SQL instance and enter the following items

spring:
  datasource:
    hikari:
      jdbc-url: [YOUR DB URL]
      username: [YOUR DB USERNAME]
      password: [YOUR DB PASSWORD]
      driver-class-name: com.mysql.cj.jdbc.Driver
  servlet:
    multipart:
      enabled: true
      file-size-threshold: 2KB
      max-file-size: 200MB
      max-request-size: 215MB
      location: C:/Temp

mybatis:
  type-aliases-package: openminder.emeal.mapper
  mapper-locations: mybatis/mapper/**/*.xml

file:
  upload_dir: ./static/upload/avatar
  upload_picture_dir: ./static/upload/picture
```

(2) Build and Run server


> 4. Run React-native frontend client
```
cd /path/to/2021-OpenMinder/emeal/src/main/frontend/
```
(1) Put your localhost IP address in the ipConfig.js file
```
export const LOCAL = 'http://[YOUR IP ADDRESS]:8080';
```

(2) Install android emulator
* If you don't have NDK version `21.0.6113669` in Android Studio SDK Tools, install it.

(3) Install packages
```
yarn install
yarn android
```

(4) Run client
```
react-native run-android
```


## Skill
Frontend - React Native, Redux<br>
Backend - SpringBoot, Flask
<br>

## Contributors
<div>
<a href="https://github.com/hrxorxm">
  <img src="https://github.com/hrxorxm.png" width="50" height="50" >
</a>
    <a href="https://github.com/hyeju1123">
  <img src="https://github.com/hyeju1123.png" width="50" height="50" >
</a>
    <a href="https://github.com/minn12">
  <img src="https://github.com/minn12.png" width="50" height="50" >
</a>
    <a href="https://github.com/juyonLee00">
  <img src="https://github.com/juyonLee00.png" width="50" height="50" >
</a>

