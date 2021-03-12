package openminder.emeal.domain.account;

import lombok.Getter;
import lombok.Setter;
import openminder.emeal.domain.file.UploadFile;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Account {

    private Long accountId;

    private String username;

    private String password;

    private UploadFile avatar;

    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    private List<Authority> authorities = new ArrayList<>();

    public Account() {

    }

    public Account(String username, String password,
                   boolean isAccountNonExpired, boolean isAccountNonLocked,
                   boolean isCredentialsNonExpired, boolean isEnabled) {
        this.username = username;
        this.password = password;
        this.isAccountNonExpired = isAccountNonExpired;
        this.isAccountNonLocked = isAccountNonLocked;
        this.isCredentialsNonExpired = isCredentialsNonExpired;
        this.isEnabled = isEnabled;
    }

}
