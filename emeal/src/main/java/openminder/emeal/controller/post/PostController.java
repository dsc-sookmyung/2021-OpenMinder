package openminder.emeal.controller.post;

import lombok.RequiredArgsConstructor;
import openminder.emeal.config.file.FileStorageProperties;
import openminder.emeal.controller.file.FileUploadController;
import openminder.emeal.domain.file.Picture;
import openminder.emeal.domain.file.UploadFile;
import openminder.emeal.domain.file.UploadFileResponse;
import openminder.emeal.domain.post.*;
import openminder.emeal.service.file.FileStorageService;
import openminder.emeal.service.file.PictureStorageService;
import openminder.emeal.service.post.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    final PostService postService;
    final PictureStorageService pictureStorageService;
    final FileStorageService fileStorageService;

    @PostMapping("/upload/foodInfo")
    public Long uploadFoodInfo(@RequestBody Post post) {
        postService.uploadPost(post);
        return post.getPostId();
    }


    @PostMapping("/upload/post")
    public UploadFileResponse uploadPost(@RequestParam("picture") MultipartFile picture, @RequestParam("postId") String postId) {

        int id = Integer.parseInt(postId);

        String pictureName = pictureStorageService.storePicture(picture);
        String pictureDownloadUri = "/downloadPicture/" + pictureName;

        Picture pictureInfo = new Picture(pictureName, pictureDownloadUri, picture.getContentType(), picture.getSize(), (long) id);
        postService.uploadPicture(pictureInfo);

        /** flask server 에서 return 한 음식 수만큼 for 문 돌리기 */
        Menu menu = new Menu("Almond", (long) id);
        postService.uploadMenu(menu);
        Nutrient nutrient = new Nutrient(NutrientType.MEAL, (long) 579, (long) 21, (long) 21, (long) 49, (long) 4, (long) 1, (long) 0, (long) 3, (long) 0, menu.getMenuId());
        postService.uploadNutrient(nutrient);


        menu.setMenuName("Soy Milk");
        postService.uploadMenu(menu);
        nutrient.setCalorie((long) 125);
        nutrient.setCarbohydrate((long) 17);
        nutrient.setSugars((long) 10);
        nutrient.setCholesterol((long) 0);
        nutrient.setFat((long) 4.5);
        nutrient.setFattyAcid((long) 0.7);
        nutrient.setProtein((long) 6.6);
        nutrient.setSodium((long) 120);
        nutrient.setTransFat((long) 0);
        nutrient.setMenuId(menu.getMenuId());

        postService.uploadNutrient(nutrient);


        UploadFileResponse uploadFileResponse = new UploadFileResponse(pictureName, pictureDownloadUri, picture.getContentType(), picture.getSize());
        return uploadFileResponse;

    }

    @PostMapping("update/postAccountInfo")
    public void updatePostAccountInfo(@RequestBody Post post) {
        postService.updatePostAccountInfo(post);
    }

    @GetMapping("downloadPicture/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = pictureStorageService.loadFileAsResource(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException e) {
            logger.info("Could not determine file type.");
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(contentType))
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//                .body(resource);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, contentType);

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);

    }

    @GetMapping("/download/postCategory")
    public List<Post> findPostByPostType(@RequestParam("category") String postType) {
        return postService.findPosts(postType);
    }

    @GetMapping("/download/userPosts")
    public List<Post> findPostByUsername(@RequestParam("username") String username) {
        return postService.findUserPosts(username);
    }

    @GetMapping("/download/onePost")
    public Post findOnePostByPostId(@RequestParam("postId") Long postId) {
        return postService.findOnePost(postId);
    }

    @GetMapping("download/menuAndNutrient")
    public List<Menu> findMenuByPostId(@RequestParam("postId") Long postId) {
        return postService.findMenusByPostId(postId);
    }


//    @PostMapping("/upload/post/pictures")
//    public List<UploadFileResponse> uploadPictures(@RequestParam("post") Post post, @RequestParam("pictures") MultipartFile[] pictures) {
//
//        postService.uploadPost(post);
//
//        Menu menu = new Menu("Almond", post.getPostId());
//        postService.uploadMenu(menu);
//        Nutrient nutrient = new Nutrient(NutrientType.MEAL, (long)579, (long)21, (long)21, (long)49, (long)4, (long)1, (long)0, (long)3, (long)0, menu.getMenuId());
//        postService.uploadNutrient(nutrient);
//
//        return Arrays.asList(pictures)
//                .stream()
//                .map(picture -> uploadPicture(picture))
//                .collect(Collectors.toList());
//    }
}
