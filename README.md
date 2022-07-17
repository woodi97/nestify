# Nestify

## Description

NestJS Framework Boilerplate

## Need to know

1. Dto가 작동하게 만들기 위해서는 Dto class에 적절한 데코레이터를 넣고, Controller에서 @UsePipe(ValidationPipe)를 씌어줘야한다
2. ValidationPipe는 dto에 정의된 규약사항에 대해서 입력값이 잘 들어왔는지 확인하는 Pipe이다