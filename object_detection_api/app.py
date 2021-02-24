from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
app = Flask(__name__)

# 업로드 HTML 렌더링
@app.route('/')
def main():
    return render_template('upload.html')

# 저장한 이미지를 object detection 코드로 음식 이름값 str로 리턴하기

#리턴한 str값을 바탕으로 api키를 이용해 식품안전db에서 값들 다 가져와서 뿌리기



# 파일 업로드 처리 - 이미지 파일에 저장하기
@app.route('/imgModel', methods = ['GET', 'POST'])
def imgModel():
    if request.method == 'POST':
        f = request.files['file']
        # 저장할 경로 + 파일명
        f.save(secure_filename(f.filename))
        msg = "uploads success"
        return render_template('after.html',data = msg)

if __name__ == '__main__':
    # 서버 실행
    app.run(debug = True)
