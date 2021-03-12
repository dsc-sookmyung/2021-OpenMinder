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


@RestController
@CrossOrigin
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AccountController {

    final AuthenticationManager authenticationManager;
    final AccountRepository accountRepository;
    final AccountService accountService;
    final PasswordEncoder passwordEncoder;
    final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/signIn")
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

        return ResponseEntity.ok(new JwtResponse(jwt, fileDownloadUri));
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        if (accountRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        Account account = new Account(signUpRequest.getUsername(), signUpRequest.getPassword(), true, true, true, true);
        account.setPassword(passwordEncoder.encode(account.getPassword()));

        Authority authority = new Authority(AuthorityName.ROLE_USER, signUpRequest.getUsername());

        accountService.save(account, authority);

        /** Registering Basic Avatar */
        UploadFile uploadFile = new UploadFile("basic.png", "/downloadFile/basic.png", "image/png", (long)6909, signUpRequest.getUsername());
//        uploadFile.setFileName("basic.png");
//        uploadFile.setFileDownloadUri("/downloadFile/basic.png");
//        uploadFile.setFileType("image/png");
//        uploadFile.setSize((long)6909);
//        uploadFile.setUsername(signUpRequest.getUsername());

        accountRepository.insertAvatar(uploadFile);

        return new ResponseEntity(new ApiResponse(true, "User registered successfully"), HttpStatus.OK);

    }
}
