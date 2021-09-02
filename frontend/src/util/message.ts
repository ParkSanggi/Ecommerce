export {CompletionMessage, ErrorMessage, cleanMessages};

class CompletionMessage {
    static loginIdIsUsable() {
        let message = "사용 가능한 아이디 입니다";
        return this.create(message);
    }

    static passwordsAreMatch() {
        let message = "비밀번호가 일치합니다";
        return this.create(message);
    }

    private static create(message:string) {
        let errorMessage = document.createElement('div');

        errorMessage.innerText = message;
        errorMessage.className = "completionMessage";
        return errorMessage;
    }
}

class ErrorMessage {
    static mustFillData() {
        let message = "필수 항목입니다"
        return ErrorMessage.create(message);
    }

    static idAlreadyExist() {
        let message = "이미 존재하는 아이디입니다"
        return ErrorMessage.create(message);
    }

    static passwordDoNotMatch() {
        let message = "비밀번호가 일치하지 않습니다";
        return ErrorMessage.create(message);
    }

    static invalidLoginInfo() {
        let message = "등록되지 않은 아이디 이거나 비밀번호가 일치하지 않습니다."
        return ErrorMessage.create(message);
    }

    private static create(message:string) {
        let errorMessage = document.createElement('div');

        errorMessage.innerText = message;
        errorMessage.className = "errorMessage"
        return errorMessage;
    }

}

function cleanMessages(target:HTMLElement) {
    let errorMessages:HTMLCollectionOf<Element> = 
        target.parentElement!.getElementsByClassName("errorMessage");
    let completionMessages:HTMLCollectionOf<Element> = 
        target.parentElement!.getElementsByClassName("completionMessage");

    for (let message of Array.from(errorMessages)) {
        message.remove();
    }
    for (let message of Array.from(completionMessages)) {
        message.remove();
    }
}