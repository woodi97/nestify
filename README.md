# Nestify

## Description

NestJS Framework Boilerplate

## Need to know

1. Dto가 작동하게 만들기 위해서는 Dto class에 적절한 데코레이터를 넣고, Controller에서 @UsePipe(ValidationPipe)를 씌어줘야한다
2. ValidationPipe는 dto에 정의된 규약사항에 대해서 입력값이 잘 들어왔는지 확인하는 Pipe이다
3. 만약 NestJS에서 오류가 발생하고 try catch로 개발자가 잡아주지 않는다면 해당 에러는 Controller 레벨로 가서 500에러를 던져 버린다.(예를 들면 Repository에서 오류가 발생하면
   something.repository.ts에서 try catch로 개발자가 에러를 잡아서 처리할 수 있다)
4. nest start --watch 명령어를 실행하면 hot reload가 된다. 하지만 이는 전체 파일에 대해서 hot reload이므로 프로젝트가 커질수록 시간이 오래걸린다. 따라서 webpack관련 설정을
   해줘야 한다 [참고](https://velog.io/@kys6879/Nest.JS-Hot-reload-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
5. 루트 디렉토리에 orm.config가 있는 이유는 db migration때문이다. 만약 처음 해당 파일을 받았다면 database migration을 통해 자신의 db에 테이블 정보를 import해야한다. 만약
   이게 싫다면 apiConfig파일에서 synchronize:true로 설정하면 되지만 이 경우 db변경이 생기면 이전데이터를 전부 날려?버린다
6. SocketIO는 Gateway로 처리한다. Gateway는 Provider의 한 종류이며 Injectable들 앞에 위치한다
   1. 웹 소켓 namespace를 정규표현식으로 하면 동적으로 방 이름을 생성할 수 있다
   2. Events Module에서 provider에 Events Gateway를 넣어서 "단 한 번만" Events Gateway를 인스턴스화 해야하며, 이를 다른 모듈에서는 imports해서 사용한다
7. TypeORM의 OneToMany, ManyToOne 관계는 각자의 Entity에서 설정하면 되지만, OneToOne은 FK가 되는 대상이 있는 Entitydp OneToOne과 JoinColumn 데코레이터를
   씌워주면 된다
