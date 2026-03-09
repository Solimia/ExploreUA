
// import { refreshService } from "./refreshToken.service";

import { refreshService } from "./refreshToken.service";
import { tokenService } from "./token.service";
// import { tokenService } from "./token.service";
// import { userRole } from "./userRole.service";

export const accountService = {
    isAuthenticated() {
        return tokenService.get() !== null;
    },
    login(accessToken, refreshToken, Role) {
        tokenService.save(accessToken);
        refreshService.save(refreshToken);
        // userRole.set(Role)
    },
    logout() {
        tokenService.clear();
        refreshService.clear();
        // userRole.clear();
    }


}