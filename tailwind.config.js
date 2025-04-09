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
          buttonStroke: 'rgba(59, 104, 239, 0.3)', // 버튼 테두리 고정값
          buttonFill: 'rgba(59, 104, 239, 0.05)', // 버튼 fill 고정값
          typeStroke: 'rgba(59, 104, 239, 0.1)', // TypeStroke 고정값
          typeBackground: 'rgba(59, 104, 239, 0.04)', // TypeStroke 고정값
          newChatHover: 'rgba(59, 104, 239, 0.04)',
        },
        login: {
          DEFAULT: 'rgb(var(--color-login) / <alpha-value>)',
        },
        star: {
          DEFAULT: 'rgb(var(--color-star) / <alpha-value>)',
        },
        gray: {
          DEFAULT: 'rgb(var(--color-gray) / <alpha-value>)',
          stroke01: 'rgba(0, 0, 0, 0.01)',
          stroke03: 'rgba(0, 0, 0, 0.03)',
          stroke05: 'rgba(0, 0, 0, 0.05)',
          stroke07: 'rgba(0, 0, 0, 0.07)',
          stroke10: 'rgba(0, 0, 0, 0.1)',
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
    // Tailwind가 className 내부의 동적 표현식을 더 잘 감지하게 해주는 설정
    classRegex: [
      ['className="([^"]+)"', 1],
      ['className={`([^`]+)`', 1],
    ],
  },
};
