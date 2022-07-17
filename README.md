# Nestify

## Description

NestJS Framework Boilerplate

## Need to know

1. Dto가 작동하게 만들기 위해서는 Dto class에 적절한 데코레이터를 넣고, Controller에서 @UsePipe(ValidationPipe)를 씌어줘야한다
2. ValidationPipe는 dto에 정의된 규약사항에 대해서 입력값이 잘 들어왔는지 확인하는 Pipe이다
3. 만약 NestJS에서 오류가 발생하고 try catch로 개발자가 잡아주지 않는다면 해당 에러는 Controller 레벨로 가서 500에러를 던져 버린다.(예를 들면 Repository에서 오류가 발생하면
   something.repository.ts에서 try catch로 개발자가 에러를 잡아서 처리할 수 있다)