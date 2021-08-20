package ecommerce.ecommerce.domain.user.dto;

import lombok.Getter;

@Getter
public class CheckDuplicationDTO {
    private boolean duplStatus;

    public CheckDuplicationDTO(boolean duplStatus) {
        this.duplStatus = duplStatus;
    }
}
