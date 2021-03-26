package openminder.emeal.controller.Result;

import lombok.RequiredArgsConstructor;
import openminder.emeal.controller.post.PostController;
import openminder.emeal.domain.account.Account;
import openminder.emeal.domain.post.Menu;
import openminder.emeal.domain.post.Nutrient;
import openminder.emeal.domain.post.Post;
import openminder.emeal.mapper.account.AccountRepository;
import openminder.emeal.service.post.PostService;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.lang.reflect.Array;
import java.security.Principal;
import java.util.*;

@RequiredArgsConstructor
public class ResultController {

    final Menu menu;
    PostController postController;
    AccountRepository accountRepository;


    public String GetNutrientChart(RequestBody LoginRequest loginRequest, Model model) {


        //현재 로그인 된 유저 account 가져오기(loginRequest말고 다른 거 없나?)
        Account account = accountRepository.findByUserName(loginRequest.getUsername());
        String userId = account.getUserId();

        //해당 사용자의 게시글 찾기
        List<Post> userPost = postController.findPostByUsername(userId);

        //최근 3개 게시글 뽑기(일단 아침, 점심, 저녁으로 일케 3개)
        int PostSize = userPost.size();

        Post post1 = userPost.get(PostSize-1);
        Post post2 = userPost.get(PostSize-2);
        Post post3 = userPost.get(PostSize-3);


        /*여기는 리스트 만들어서 이중 반복문으로 하려고 했는데 의식의 흐름으로 일단..스
        /List<Post> dataPost = new List<Post>()
        dataPost.add(post1);
        dataPost.add(post2);
        dataPost.add(post3);

        int dataPostSize = dataPost.size();
        */

        //뽑은 게시글에서 탄수화물, 단백질, 지방 값 각각 더하기
        List<Menu> post1Menu = post1.getMenus();
        int MenuSize = post1Menu.size();
        int sumCarbohydrate = 0;
        int sumProtein = 0;
        int sumFat = 0;
        for(int i = 0; i < post1Menu.size(); i++){
            Menu Datamenu = post1Menu.get(i);
            sumCarbohydrate += Datamenu.getNutrient().getCarbohydrate();
            sumProtein += Datamenu.getNutrient().getProtein();
            sumFat += Datamenu.getNutrient().getFat();
        }

        List<Menu> post2Menu = post2.getMenus();
        MenuSize = post2Menu.size();
        for(int i = 0; i < MenuSize; i++){
            Menu Datamenu = post1Menu.get(i);
            sumCarbohydrate += Datamenu.getNutrient().getCarbohydrate();
            sumProtein += Datamenu.getNutrient().getProtein();
            sumFat += Datamenu.getNutrient().getFat();
        }

        List<Menu> post3Menu = post3.getMenus();
        MenuSize = post3Menu.size();
        for(int i = 0; i < MenuSize; i++){
            Menu Datamenu = post1Menu.get(i);
            sumCarbohydrate += Datamenu.getNutrient().getCarbohydrate();
            sumProtein += Datamenu.getNutrient().getProtein();
            sumFat += Datamenu.getNutrient().getFat();
        }

        //json으로 column 각각 carbohydrate, protein, fat으로 PieChart로 보내기
        JSONArray sendjson = new JSONArray();
        JSONObject subjson = new JSONObject();
        subjson.put("carbohydrate",sumCarbohydrate);
        sendjson.add(subjson);
        JSONObject subjson = new JSONObject();
        subjson.put("protein",sumProtein);
        sendjson.add(subjson);

        JSONObject subjson = new JSONObject();
        subjson.put("fat",sumFat);
        sendjson.add(subjson);

        //PieChart로 보내
        model.addAttribute(sendjson);

        return


    }

    //라인 그래프. 유저들이 먹은 모든 탄수화물, 단백질, 지방 가져오기
    public Long GetNutrientGraph(RequestBody LoginRequest loginRequest) {
        //현재 로그인 된 유저 account 가져오기(loginRequest말고 다른 거 없나?)
        Account account = accountRepository.findByUserName(loginRequest.getUsername());
        String userId = account.getUserId();

        //해당 사용자의 게시글 찾기
        List<Post> userPost = postController.findPostByUsername(userId);
        int userPostSize = userPost.size()


        //해당 사용자의 게시글들에서 carbonhydrate, protein, fat 값들 각각 ArrayList/List로 만들기
        List<Integer> carbonhydrateList;
        List<Integer> proteinList;
        List<Integer> fatList;
        
        for(int i = 0; i < userPostSize; i++){

            //json배열 만드는 반복문으로 해당 포스트의 값들 전부 column에 "y" 추가해서 넣기
            //이 때 한 게시글에 여러 메뉴가 나올 경우 게시글당메뉴 더하고 해당 위치에서 점/저 값도 더하기
            //날짜값 받아오는 걸 모르겠어서 이렇게 했는데 날짜값 받아오면 이렇게 안해도 될 듯.
            
        }


        //json배열 만드는 반복문으로 해당 포스트의 값들 전부 column에 "y" 추가해서 넣기

        //json배열 리턴하
    }

    public String getWaterAndPhoto(RequestBody LoginRequest loginRequest){
        //현재 로그인 된 유저 account 가져오기(loginRequest말고 다른 거 없나?)
        Account account = accountRepository.findByUserName(loginRequest.getUsername());
        String userId = account.getUserId();

        //해당 사용자의 게시글 찾기
        List<Post> userPost = postController.findPostByUsername(userId);
        
        //물 버튼 횟수 가져와서 확인하기
        
        //게시글에서 사진 값 중 아침 사진을 가져오기 - 얘는 community 코드 참고해서 사진 갖고오

    }

}

