<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

> [!NOTE]
> IDE에서 eslint, prettier 파일의 위치 설정 필요  
> 코드 컨벤션 및 깃 컨벤션은 다음 [📁 개발 가이드](https://www.notion.so/modernlion/1b373b277d478099bf10c93261ca2e61)를 따름  
> 명시된 문서는 MVC 아키텍쳐 기반이기 때문에 아키텍쳐에 관한 것은 본 글 하단을 참고

## 📌 Before start

### package install

```bash
$ npm install
```

### setting env

- `.env.{production | development}` << 실행 환경에 맞는 이름으로 env 파일 생성
- `.env.example`을 참고하여 env 값 설정

```bash
$ cp .env.example .env.{실행환경}
```

## 📌 Running the app

```bash
# start app
$ npm run start

# development + watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 📌 DB migration

> **prod 환경 기준 작성 -> dev mode로 진행 시 모든 명령어 앞에 `dev:`를 붙이면 됨**  
>  e.g. `npm run dev:db:migrate:show`

### generate migration

- `.env.{production | development}` 환경변수에 세팅된 값으로 빌드 진행 후 데이터베이스 변경사항 추가됨
- `npm run db:migrate-generate ${저장될 경로}/${작업명}`

  - e.g. npm run db:migrate-generate ./src/migration/initial-schema

- migration 파일 저장 경로는 `database.config.ts`에 설정한 값에 맞춰서 지정 필요

### migration run

- `.env.{production | development}` 환경변수에 세팅된 값으로 빌드 진행 후 데이터베이스 변경사항 반영
- `npm run db:migrate:show` (데이터베이스 변경사항 확인)
- `npm run db:migrate:run` (데이터베이스 변경사항 반영)

## 📌 Project format

**본 프로젝트는 CQRS 기반의 아키텍쳐를 가짐**

### file tree

```bash
config # 전체적인 프로젝트 설정에 관련된 공통 영역
 ㄴ aws, database, swagger, logger, redis +a
shared # 내부 파일들이 공유하면서 사용하는 부분
 ㄴ decorator, dto, entity, exception, interceptor, pipe, type +a
module #
 ㄴ common # 공통 api
 ㄴ {서비스 기준 분리된 모듈}
  ㄴ application
    ㄴ command # command (domain의 vo or entity가 input/output)
    ㄴ query # query 정의 (domain의 vo or entity가 input/output)
    ㄴ handler # command, query, event handler
    ㄴ service # 실제 서비스(repository import 등)
  ㄴ domain
    ㄴ cache
    ㄴ database
      ㄴ entity
      ㄴ repository
    ㄴ event
    ㄴ port # infra의 어댑터와 연결
    ㄴ service # 내부 서비스 interface 정의
    ㄴ vo
  ㄴ infrastructure
    ㄴ adapter
    ㄴ cache
    ㄴ database
      ㄴ entity
      ㄴ repository
  ㄴ interface
    ㄴdto
    ㄴcontroller
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
