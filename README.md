## 🛠 프로젝트 초기 세팅 방법

팀원이 동일한 개발 환경을 갖추기 위해 아래 순서를 그대로 따라주세요.

---

### 1. 저장소 클론

```bash
git clone https://github.com/CAPSTONE-team-21/FE.git
cd FE
```

---

### 2. 패키지 설치

```bash
npm install
```

> Tailwind, ESLint, Prettier 등 모든 개발 도구가 자동 설치됩니다.

---

### 3. 개발 서버 실행

```bash
npm run dev
```

> 기본 포트는 http://localhost:5173

---

### 4. VSCode 확장 추천

아래 확장 프로그램을 설치하면 저장 시 코드 자동 정리 및 오류 수정이 가능합니다.

- ESLint
- Prettier – Code formatter
- Tailwind CSS IntelliSense

---

### 5. VSCode 설정 (자동 저장 및 수정용)

`.vscode/settings.json` 파일에 아래 내용을 추가하거나, 전역 설정에서 적용해도 됩니다.

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

---

### 6. Tailwind 커스텀 색상 시스템

`tailwind.config.js`에 다음과 같이 커스텀 색상 시스템이 정의되어 있습니다.

```js
// tailwind.config.js 발췌
colors: {
  main: '#00B19F',
  'main-95': 'rgba(0, 177, 159, 0.95)',
  'main-90': 'rgba(0, 177, 159, 0.90)',
  ...
  'main-5':  'rgba(0, 177, 159, 0.05)',

  gray: '#E6E6E6',
  'gray-95': 'rgba(230, 230, 230, 0.95)',
  ...
  'gray-5':  'rgba(230, 230, 230, 0.05)',

  before: '#D2D5D6',
  'before-95': 'rgba(210, 213, 214, 0.95)',
  ...
  'before-5':  'rgba(210, 213, 214, 0.05)',
}
```

- 각각의 색상은 `불투명도 5% 단위`로 세분화되어 있습니다.
- Tailwind 클래스처럼 `bg-main-60`, `text-gray-30` 등으로 바로 사용 가능해요.

> ✅ 배경 투명도는 `bg-opacity-60` 방식도 지원됩니다.

---

### 💡 `experimental.classRegex` 사용 중

```js
experimental: {
  classRegex: [
    ['className="([^"]+)"', 1],
    ['className={`([^`]+)`', 1],
  ],
}
```

이 설정은 JSX 내부의 동적 `className`을 Tailwind가 감지할 수 있도록 도와줍니다.
복잡한 class 조합에서도 Tailwind가 정상적으로 CSS를 생성할 수 있어요.

---

### 7. 프로젝트 폴더 구조

```bash
src/
├── components/       # 공통 컴포넌트 (Header 등)
├── pages/            # Index, Login, Signup 페이지 등
├── utils/            # 유틸 함수
├── App.jsx           # 전체 앱 구조
├── main.jsx          # 앱 진입점
└── index.css         # Tailwind 및 전역 스타일
```

---

### 8. 기타 참고

- `.gitkeep`으로 빈 폴더도 유지됩니다
- `index.html`에 title, og:meta, Pretendard 폰트 적용 완료
- ESLint, Prettier 설정 완료
