# 🛠 SSPOID 프론트엔드 프로젝트 초기 세팅 가이드

이 문서는 SSPOID 프론트엔드 저장소를 처음 클론한 팀원이 동일한 개발 환경을 빠르게 구축할 수 있도록 도와줍니다. 아래 절차에 따라 세팅을 진행해주세요.

---

## 1. 저장소 클론

```bash
git clone https://github.com/CAPSTONE-team-21/FE.git
cd FE
```

---

## 2. 패키지 설치

```bash
npm install
```

> Tailwind, ESLint, Prettier 등 개발 도구가 자동으로 설치됩니다.

---

## 3. 개발 서버 실행

```bash
npm run dev
```

> [기본 포트는 여기](http://localhost:5173) 입니다.

---

## 4. 추천 VSCode 확장 프로그램

- ESLint
- Prettier – Code formatter
- Tailwind CSS IntelliSense

> 이 확장 프로그램들은 저장 시 자동 포맷팅 및 오류 수정 기능을 제공합니다.

---

## 5. VSCode 설정 (.vscode/settings.json)

```bash
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

> 저장 시 자동으로 ESLint 규칙을 따라 오류를 수정하고, Prettier로 코드 포맷팅을 적용해줍니다.

---

## 6. ESLint & Prettier 설정

ESLint와 Prettier 설정은 저장소 내 `.eslintrc.js`와 `.prettierrc` 파일에 이미 포함되어 있으며, 다음과 같은 기능을 합니다:

- **ESLint (`.eslintrc.js`)**

  - React, React Hooks, Tailwind CSS 관련 권장 규칙 사용
  - Prettier와 충돌 방지를 위해 `eslint-config-prettier` 포함
  - JSX에서 `React import` 생략 허용 (`react/react-in-jsx-scope: off`)

- **Prettier (`.prettierrc`)**
  - 작은따옴표, 세미콜론 사용
  - 탭 너비 2칸, 줄 길이 100자 제한 등 스타일 지정

> 설정 파일은 직접 열어보고 팀 코드 스타일을 확인해보세요.

---

## 7. Tailwind CSS 커스텀 색상 시스템

이 프로젝트는 팀 전용 색상 시스템을 사용합니다. `tailwind.config.js`의 `extend.colors`에 정의된 변수들은 다음과 같은 방식으로 사용할 수 있습니다.

### 🎨 예시: 사용 방법

```bash
<!-- 버튼 배경에 메인 색상 적용 -->
<button class="bg-main hover:bg-main-hover text-white">확인</button>

<!-- 회색 테두리 스타일 적용 -->
<div class="border border-gray-stroke30"></div>
```

### 주요 색상 구조

- `main`: 브랜드 메인 컬러 (청록 계열)
- `gray`: 회색 계열 (투명도 다양한 테두리/배경)
- `login`, `star`, `bubble`: 기능별 포인트 컬러

> ✅ 예: `bg-main-hover`, `text-gray-stroke30` 등으로 활용 가능

---

## 8. 폴더 구조

```bash
src/
├── components/       # 공통 컴포넌트 (Header 등)
├── pages/            # Index, Login, Signup 페이지 등
├── utils/            # 유틸 함수 및 아이콘 export 파일
├── App.jsx           # 전체 앱 구조
├── main.jsx          # 앱 진입점
└── index.css         # Tailwind 및 전역 스타일
```

---

## 9. 기타 참고 사항

- `.gitkeep`을 사용해 빈 폴더도 버전에 포함됩니다
- `index.html`에 meta 태그 및 Pretendard 폰트 적용 완료
- ESLint + Prettier 설정 완료, Tailwind 동적 class 감지 설정도 적용됨 (`experimental.classRegex`)

> 이 설정을 통해 동적 className도 Tailwind에서 인식되어 최종 빌드 시 누락되지 않습니다.
