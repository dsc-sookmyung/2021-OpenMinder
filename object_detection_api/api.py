from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
import werkzeug, os, json

import numpy as np
import pandas as pd
import tensorflow as tf
from PIL import Image
import urllib

app = Flask(__name__)
api = Api(app)
UPLOAD_FOLDER = 'static'
parser = reqparse.RequestParser()
parser.add_argument('file',type=werkzeug.datastructures.FileStorage, location='files')


def predict_food(model_path, file_path):
    # 예측
    # Load the TFLite model and allocate tensors.
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    # Get input and output tensors.
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    # Make Input data
    input_shape = input_details[0]['shape']
    image_size = (input_shape[1], input_shape[2])
    img = Image.open(file_path)
    img = img.resize(image_size)
    num_img = np.array(img)
    num_img = num_img.reshape(input_shape)
    interpreter.set_tensor(input_details[0]['index'], num_img)
    interpreter.invoke()
    # Make Output data
    output_data = interpreter.get_tensor(output_details[0]['index'])
    num_det = int(interpreter.get_tensor(output_details[3]['index']))
    boxes = interpreter.get_tensor(output_details[0]['index'])[0][:num_det]
    classes = interpreter.get_tensor(output_details[1]['index'])[0][:num_det]
    scores = interpreter.get_tensor(output_details[2]['index'])[0][:num_det]
    # Return values
    label_names = ['김밥', '양념치킨', '짜장면']
    en_label_names = ['Gimbap', 'Chicken', 'Black-bean-sauce noodles']
    scores_arr = np.array(scores)
    max_idx = np.argmax(scores_arr)
    my_score = scores[max_idx]
    my_label = label_names[int(classes[max_idx])]
    my_en_label = en_label_names[int(classes[max_idx])]

    label_dict = {'ko_label': my_label, 'en_label': my_en_label, 'score': my_score}
    return label_dict


def predict_nut(foodname):
    with open('secret.json') as json_file:
        json_data = json.load(json_file)
    accesskey = json_data['accesskey']
    encoding_foodname = urllib.parse.quote(foodname)

    url = "http://openapi.foodsafetykorea.go.kr/api/"+accesskey+"/I2790/json/1/21/DESC_KOR="+encoding_foodname

    response = urllib.request.urlopen(url)
    json_str = response.read().decode("utf-8")
    json_object = json.loads(json_str)

    df = pd.json_normalize(json_object['I2790']['row'])
    
    # 순서대로 음식명 열량 / 탄수화물 / 단백질 / 지방 / 당류 / 나트륨 / 콜레스테롤 / 포화지방산 / 트랜스지방
    nut_names = ['calorie', 'carbohydrate', 'protein', 'fat', 'saccharide', 'sodium', 'cholesterol', 'saturated fatty acid', 'trans fat']
    nut_dict = {}
    for i, name in enumerate(nut_names):
        idxname = 'NUTR_CONT' + str(i+1)
        value = df[idxname][0]
        nut_dict[name] = value
    return nut_dict


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(MyEncoder, self).default(obj)


class PhotoUpload(Resource):
    def post(self):
        data = parser.parse_args()
        if data['file'] == "":
            return {
                    'data':'',
                    'message':'No file found',
                    'status':'error'
                    }

        photo = data['file']
        if photo:
            # 파일 저장
            filename = 'uploaded_image.png'
            filepath = os.path.join(UPLOAD_FOLDER,filename)
            photo.save(filepath)
            # 음식 이름 예측하기
            modelpath = "model/model.tflite"
            label_info = predict_food(modelpath, filepath)
            # 음식 영양소 정보 가져오기
            nut_info = predict_nut(label_info['ko_label'])
            # 결과 리턴
            return json.dumps({**label_info, **nut_info}, cls=MyEncoder, ensure_ascii=False)

        return {
                'data':'',
                'message':'Something when wrong',
                'status':'error'
                }


api.add_resource(PhotoUpload,'/upload')

if __name__ == '__main__':
    app.run(debug=True)
