# 가위바위보 게임 앱 (RPS Game App)

[개인 프로젝트]

## 프로젝트 소개

이 프로젝트는 사용자가 온라인으로 가위바위보 게임을 즐길 수 있도록 설계된 웹 애플리케이션입니다. RESTful API를 통해 다른 사용자와의 대결을 지원하며, 회원가입 및 로그인 기능을 통해 실제 사용자들이 서비스를 이용할 수 있도록 구현하였습니다.

이 애플리케이션은 사용자 인증 및 게임 전적 관리 기능을 제공하여 사용자 경험을 개선하고, 다양한 게임 데이터를 효과적으로 처리하는 데 중점을 두었습니다. 이를 통해 사용자는 자신의 게임 기록을 쉽게 관리하고, 다른 사용자와 경쟁하며 즐거움을 느낄 수 있습니다.

[👉🏻 RPS Game App](https://hy0ni.github.io/rsp-game-app/)

## 주요 기능

### 1. 메인 페이지

- 사용자 로그인 여부에 따라 헤더 내용이 동적으로 변경됩니다.
- 모든 사용자의 리스트를 표시하고, 각 사용자 전적 페이지로 이동할 수 있는 버튼이 제공됩니다.

### 2. 회원가입 및 로그인

- 이메일과 비밀번호를 통한 회원가입 및 로그인 기능 구현.
- 사용자 인증 과정은 Bearer Token을 이용하여 처리됩니다.
- 성공적인 회원가입 또는 로그인 후 메인 페이지로 리다이렉트되며, 실패 시 알림을 표시합니다.

### 3. 특정 사용자 전적 페이지

- 사용자 리스트에서 선택한 특정 사용자의 전적을 확인할 수 있는 페이지입니다.
- 사용자 게임 정보와 함께 삭제 기능을 제공하여, 본인의 전적만 삭제할 수 있습니다.

### 4. 마이페이지

- 로그인한 사용자와 컴퓨터의 결투 기능을 제공합니다.
- 사용자가 선택한 가위, 바위, 보 결과를 API를 통해 받아와 전적을 기록할 수 있습니다.

## 예외 처리 및 보안

- 로그인, 회원가입 및 마이페이지에서 발생할 수 있는 예외를 처리하여 사용자에게 적절한 안내를 제공합니다.
- API 호출 시 .catch 문을 사용하여 에러를 핸들링하고, 사용자 경험을 개선했습니다.
- 환경 변수를 통해 API 주소를 관리하여 보안을 강화했습니다.

---

- React를 사용하여 컴포넌트 기반의 UI를 구성했습니다.
- Context API를 활용해 전역 상태를 관리했습니다.
- 다양한 API와 예외 처리 기능을 구현하여 안정성을 높였습니다.
- CSS를 사용해 반응형 디자인을 구현했습니다.

이 경험을 통해 프론트엔드 개발에 대한 이해도를 높이고, 문제 해결 능력을 향상시킬 수 있었습니다.
