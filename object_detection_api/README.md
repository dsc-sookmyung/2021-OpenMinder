# Object Detection API 사용방법
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