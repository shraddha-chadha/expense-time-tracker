package com.plaid.quickstart.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Registration Failed because of Duplicate User Name")
public class RegistrationFailedException extends RuntimeException{
}
