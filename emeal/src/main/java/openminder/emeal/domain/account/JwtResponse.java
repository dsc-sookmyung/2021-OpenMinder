package openminder.emeal.domain.account;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class JwtResponse {

    private String accessToken;
    private String tokenType = "Bearer";
    private String fileDownloadUri;

    public JwtResponse(String accessToken, String fileDownloadUri) {
        this.accessToken = accessToken;
        this.fileDownloadUri = fileDownloadUri;
    }

}
