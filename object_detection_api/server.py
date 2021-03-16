import urllib.request
import urllib
import json
import pandas as pd
import logging
from pandas.io.json import json_normalize

def getfoodname():
    """이미지 인식해서 모델명 받아오는 코드"""
    """여기서 함수를 3개 만들어서 함수명으로 알아보기 쉽게 하는게 좋을지 아니면 getfoodname에서 nurtrients불러와서 한번에 리턴하는게 좋을지.."""


def getnutrients(foodname):
    
    logger.info("data")
    logger.info(foodname)
    
    with open('secret.json') as json_file:
        json_data = json.load(json_file)
    accesskey=json_data['accesskey']
    encoding_foodname=urllib.parse.quote(foodname)

    url = "http://openapi.foodsafetykorea.go.kr/api/"+accesskey+"/I2790/json/1/21/DESC_KOR="+encoding_foodname

    response = urllib.request.urlopen(url)
    json_str = response.read().decode("utf-8")
    json_object = json.loads(json_str)

    df=pd.json_normalize(json_object['I2790']['row'])
    send_data_list=list()

    send_data_list.append(df['DESC_KOR'][0])

    for i in range(1,10):
    #순서대로 음식명 열량 / 탄수화물 / 단백질 / 지방 / 당류 / 나트륨 / 콜레스테롤 / 포화지방산 / 트랜스지방
        idxname='NUTR_CONT'
        idxname=idxname+str(i)
        value=df[idxname][0]
        send_data_list.append(value)

    return send_data_list


def __get_logger():
    __logger = logging.getLogger('logger')

    # 로그 포멧 정의
    formatter = logging.Formatter(
        'BATCH##AWSBATCH##%(levelname)s##%(asctime)s##%(message)s >> @@file::%(filename)s@@line::%(lineno)s')
    # 스트림 핸들러 정의
    stream_handler = logging.StreamHandler()
    # 각 핸들러에 포멧 지정
    stream_handler.setFormatter(formatter)
    # 로거 인스턴스에 핸들러 삽입
    __logger.addHandler(stream_handler)
    # 로그 레벨 정의
    __logger.setLevel(logging.DEBUG)

    return __logger


if __name__ == "__main__":
    print("start")
    logger = __get_logger()
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM);
    # 소켓 레벨과 데이터 형태를 설정한다.
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1);
    # 서버는 복수 ip를 사용하는 pc의 경우는 ip를 지정하고 그렇지 않으면 None이 아닌 ''로 설정한다.
    # 포트는 pc내에서 비어있는 포트를 사용한다. cmd에서 netstat -an | find "LISTEN"으로 확인할 수 있다.
    server_socket.bind(('', 9000));
    # server 설정이 완료되면 listen를 시작한다.
    server_socket.listen();

    try:
        # 서버는 여러 클라이언트를 상대하기 때문에 무한 루프를 사용한다.
        while True:
            # client로 접속이 발생하면 accept가 발생한다.
            # 그럼 client 소켓과 addr(주소)를 튜플로 받는다.
            client_socket, addr = server_socket.accept();
            th = threading.Thread(target=binder, args = (client_socket,addr));
            # 쓰레드를 이용해서 client 접속 대기를 만들고 다시 accept로 넘어가서 다른 client를 대기한다.
            th.start();
    except:
        print("server");
    finally:
            # 에러가 발생하면 서버 소켓을 닫는다.
        server_socket.close();
