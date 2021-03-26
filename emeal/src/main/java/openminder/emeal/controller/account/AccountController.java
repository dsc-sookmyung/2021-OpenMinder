package openminder.emeal.controller.account;

import lombok.RequiredArgsConstructor;
import openminder.emeal.config.JwtTokenUtil;
import openminder.emeal.domain.account.*;
import openminder.emeal.domain.file.UploadFile;
import openminder.emeal.mapper.account.AccountRepository;
import openminder.emeal.service.account.AccountService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@CrossOrigin
@RequiredArgsConstructor
public class AccountController {


    final AuthenticationManager authenticationManager;
    final AccountRepository accountRepository;
    final AccountService accountService;
    final PasswordEncoder passwordEncoder;
    final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/api/auth/signIn")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("signIn: " + loginRequest.getUsername());
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        System.out.println("authenticate: " + authenticate);

        SecurityContextHolder.getContext().setAuthentication(authenticate);

        String jwt = jwtTokenUtil.generateToken(authenticate);

        UploadFile uploadFile = accountRepository.selectAvatarByUserName(loginRequest.getUsername());
        String fileDownloadUri = uploadFile.getFileDownloadUri();

        Account account = accountRepository.findByUserName(loginRequest.getUsername());
        String userId = account.getUserId();
        String goal = account.getGoal();
        Long height = account.getHeight();
        Long weight = account.getWeight();
        Long age = account.getAge();

        return ResponseEntity.ok(new JwtResponse(jwt, fileDownloadUri, userId, goal, height, weight, age));
    }

    @PostMapping("/api/auth/signUp")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        System.out.println(signUpRequest.getUsername());
        System.out.println(signUpRequest.getPassword());

        System.out.println("1 "+accountRepository.existsByUsername(signUpRequest.getUsername()));
        if (accountRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

//        Account account = new Account(signUpRequest.getUsername(), signUpRequest.getPassword(), true, true, true, true);
        Account account = new Account(signUpRequest.getUsername(), signUpRequest.getUsername(), signUpRequest.getPassword(), true, true, true, true);
        account.setPassword(passwordEncoder.encode(account.getPassword()));

        Authority authority = new Authority(AuthorityName.ROLE_USER, signUpRequest.getUsername());

        accountService.save(account, authority);

        /** Registering Basic Avatar */
        UploadFile uploadFile = new UploadFile("basic.png", "/downloadFile/basic.png", "image/png", (long)6909, signUpRequest.getUsername());
        accountRepository.insertAvatar(uploadFile);

        return new ResponseEntity(new ApiResponse(true, "User registered successfully"), HttpStatus.OK);

    }

//    @PostMapping("/updateProfile")
//    public int updateAccount(@RequestParam("username") String username, @RequestParam("userId") String userId, @RequestParam("goal") String goal) {
//        Account account = new Account(username, userId, goal);
//        int result = accountService.updateAccount(account);
//        return result;
//    }

    @PostMapping("/updateProfile")
    public int updateAccount(@RequestBody Account account) {
        int result = accountService.updateAccount(account);
        return result;
    }

}
