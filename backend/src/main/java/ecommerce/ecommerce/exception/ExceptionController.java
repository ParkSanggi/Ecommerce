package ecommerce.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController{

    @ExceptionHandler({
            UsernameNotFoundException.class,
            BadCredentialsException.class,
    })
    ResponseEntity<ErrorResponse> handleAuthenticationException() {
        ErrorResponse response = new ErrorResponse(ErrorCode.INVALID_INPUT_VALUE);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({
            MethodArgumentNotValidException.class,
    })
    ResponseEntity<ErrorResponse> handleRequestArgumentException() {
        ErrorResponse response = new ErrorResponse(ErrorCode.NOT_BLANK_ARGUMENT);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
