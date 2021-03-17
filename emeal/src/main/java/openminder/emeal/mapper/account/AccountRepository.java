package openminder.emeal.mapper.account;

import openminder.emeal.domain.account.Account;
import openminder.emeal.domain.account.Authority;
import openminder.emeal.domain.file.UploadFile;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface AccountRepository {

    void insertUser(Account account);

    void insertUserAuthority(Authority authority);

    Account findByUserName(String username);

    Account findById(Long accountId);

    List findAuthoritiesByUserName(String username);

    Boolean existsByUsername(String username);

    void insertAvatar(UploadFile avatar);

    UploadFile selectAvatarByUserName(String username);

    void updateAvatar(UploadFile avatar);

    int updateAccount(Account account);

    void deleteAvatar(UploadFile avatar);

}
