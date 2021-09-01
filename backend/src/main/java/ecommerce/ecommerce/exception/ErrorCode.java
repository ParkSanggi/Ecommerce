package ecommerce.ecommerce.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST.value(), "invalid input value", 1),
    NOT_BLANK_ARGUMENT(HttpStatus.BAD_REQUEST.value(), "The argument should not be blank.", 2);


    private final int status;
    private final String message;
    private final int code;
}
