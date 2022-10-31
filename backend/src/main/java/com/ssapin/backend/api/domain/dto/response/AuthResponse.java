package com.ssapin.backend.api.domain.dto.response;

import lombok.Builder;
import lombok.Getter;

public class AuthResponse {

    @Getter
    public static class Detail{
        private String accessToken;
        private String refreshToken;
        private long accessTokenExpiresIn;
        private boolean firstLogin;

        @Builder
        Detail(String accessToken, String refreshToken, long accessTokenExpiresIn, boolean firstLogin){
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.accessTokenExpiresIn = accessTokenExpiresIn;
            this.firstLogin = firstLogin;
        }

    }
}
