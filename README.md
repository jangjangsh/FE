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

> 기본 포트는 http://localhost:5173 입니다.

---

## 4. 추천 VSCode 확장 프로그램

- ESLint
- Prettier – Code formatter
- Tailwind CSS IntelliSense

> 이 확장 프로그램들은 저장 시 자동 포맷팅 및 오류 수정 기능을 제공합니다.

---

## 5. VSCode 설정 (.vscode/settings.json)

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## 6. Prettier와 ESLint 충돌 방지 설정

### 🔧 Prettier 설정과 충돌 방지를 위해 아래 패키지를 설치하세요.

```bash
npm install -D eslint-config-prettier
```

### 🔧 `.eslintrc.js`에 아래 설정을 추가하세요.

```js
extends: [
  "eslint:recommended",
  "plugin:react/recommended",
  "prettier"
]
```

---

## 7. Tailwind CSS 커스텀 색상 시스템

`tailwind.config.js`는 아래와 같이 커스터마이징 되어 있습니다:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard'],
      },
      colors: {
        main: {
          DEFAULT: 'rgb(var(--color-main) / <alpha-value>)',
          hover: 'rgb(var(--color-main-hover) / <alpha-value>)',
          buttonStroke: 'rgba(59, 104, 239, 0.3)',
          buttonFill: 'rgba(59, 104, 239, 0.05)',
          typeStroke: 'rgba(59, 104, 239, 0.1)',
          typeBackground: 'rgba(59, 104, 239, 0.04)',
          newChatHover: 'rgba(59, 104, 239, 0.04)',
        },
        login: {
          DEFAULT: 'rgb(var(--color-login) / <alpha-value>)',
        },
        star: {
          DEFAULT: 'rgb(var(--color-star) / <alpha-value>)',
        },
        gray: {
          DEFAULT: 'rgb(var(--color-star) / <alpha-value>)',
          stroke03: 'rgba(0, 0, 0, 0.03)',
          stroke07: 'rgba(0, 0, 0, 0.07)',
          stroke30: 'rgba(0, 0, 0, 0.3)',
          stroke70: 'rgba(0, 0, 0, 0.7)',
        },
        bubble: {
          DEFAULT: 'rgb(var(--color-bubble) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
  experimental: {
    classRegex: [
      ['className="([^"]+)"', 1],
      ['className={`([^`]+)`', 1],
    ],
  },
};
```

> ✅ 색상은 불투명도와 상태별로 세분화되어 있으며, Tailwind 클래스처럼 `bg-main-hover`, `text-gray-stroke30` 등으로 사용 가능합니다.

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
