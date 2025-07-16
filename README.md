# 🌍 Global Nomad
<img width="2072" height="955" alt="image" src="https://github.com/user-attachments/assets/d1cd418d-05b8-4112-93d2-267e2972674c" />


## 🌍 Global Nomad는 어떤 서비스인가요?
- Global Nomad는 사용자가 다양한 체험(액티비티나 음식 등)을 지도와 캘린더를 활용하여 예약할 수 있는 플랫폼입니다.<br/>
  직접 체험을 등록하는 판매자 역할을 할 수도 있습니다.
## 🚀 배포 링크
[🌍 Global Nomad 바로가기](https://global-nomad-omega.vercel.app/)

## 🖐️ 팀원 및 R&R
| **팀원** | **페이지** | **API** | **공통 컴포넌트** | **기타** |
| --- | --- | --- | --- | --- |
| **윤진우** | 메인 페이지, 내 정보 페이지 | Users | 페이지네이션, 아이콘 | 팀장, Readme |
| **이지현** | 예약 현황 페이지, 예약 내역 페이지  | MyNotifications, MyReservations | 사이드메뉴 | 코드래빗 적용 |
| **김다인** | 로그인 및 회원가입 페이지, 알림 기능 | 기본 axios 설정, Auth, OAuth | 푸터, 모달 | tailwind 세팅 |
| **문주영** | 내 체험 관리 페이지, 내 체험 등록/수정 페이지 | MyActivities | 헤더, 인풋, 드롭다운 |  |
| **신성오** | 체험 상세 페이지 | Activities | 버튼 |  |

## 📚 기술 스택

| 분류 | 항목 |
| --- | --- |
| 언어 | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white) |
| 프론트엔드 프레임워크 | <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white"> |
| 스타일링 | <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=TailwindCSS&logoColor=white"> |
| 상태 관리 | ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat&logo=Zustand&logoColor=white) ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=ReactQuery&logoColor=white) |
| API 통신 | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) |
| 패키지 매니저 | ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat&logo=pnpm&logoColor=white) |
| 코드 품질 도구 | <img src="https://img.shields.io/badge/Eslint-4B32C3?style=flat&logo=Eslint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=Prettier&logoColor=white"> |
| 배포 및 CI/CD | <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=Vercel&logoColor=white"> ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=GitHub-Actions&logoColor=white) |
| 협업 도구 | <img src="https://img.shields.io/badge/Github-181717?style=flat&logo=Github&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=Discord&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white">  |

### 🐈‍⬛ 페이지 경로

| 페이지 | 경로 |
| --- | --- |
| 로그인 | /login |
| 회원가입 | /signup |
| 메인 화면 | / |
| 체험 상세 | /{activityId} |
| 내 정보 (모바일) | /mypage |
| 내 정보 | /mypage/info |
| 예약 내역  | /mypage/reserves |
| 내 체험 관리 | /mypage/activities |
| 내 체험 등록 | /mypage/add-activity |
| 내 체험 수정 | /mypage/{activityId} |
| 예약 현황  | /mypage/reserve-status |

## 📂 폴더 구조
``` bash
project-root/
├── node_modules/
├── public/                   # 정적 파일들이 위치하는 폴더
│   ├── fonts/                # 폰트 파일 폴더
│   └── images/               # 이미지 파일 폴더
├── src/
│   ├── app/                  
│   │   ├── activity/         # 페이지 폴더
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── assets/
│   │   └── icons/            # 아이콘 파일 폴더
│   ├── components/           # 컴포넌트 폴더 
│   ├── contexts/             # Context 폴더
│   ├── constants/            # 상수 관리 폴더
│   ├── lib/                  # api 함수
│   ├── types/                # 타입 지정
│   ├── utils/                # 유틸 함수
│   ├── hooks/                # 커스텀 훅
│   └── stores/               # zustand 상태 관리 폴더 
├── .coderabit.yaml           # 코드래빗 설정            
├── .gitignore
├── .prettierrc   
├── .prettierignore                            
├── package.json              
├── README.md
├── eslint.config.mjs
├── pnpm-lock.yaml
├── postcss.config.mjs        
├── tsconfig.json             
└── next.config.ts        
```

## 📝 컨벤션

### 🧐 Commit Type & Emoji Guide

| **commit type** | **description** |
|---------------|----------------|
| feat | ✨ 기능 추가 |
| feat | 🖼️ 아이콘 추가 |
| fix | 🐛 버그 수정 |
| docs | 📝 문서 수정 |
| style | 🎨 UI, 스타일 관련 추가 및 수정 |
| refactor | ♻️ 리팩토링 |
| chore | 🔧 설정, 빌드 변경 |
| chore | 📁 폴더 구조 변경 또는 디렉토리 작업 |
| remove | 🔥 불필요한 코드/파일 제거 |
| deploy | 🚀 프로젝트 배포 |

### 📂 폴더/파일명 네이밍 컨벤션

| **대상** | **규칙** | **예시** |
| --- | --- | --- |
| 폴더명 | 케밥케이스 (kebab-case) | components, user-profile |
| 컴포넌트 파일명 | 파스칼케이스 (PascalCase) | UserProfile.jsx |
| 이미지/아이콘 파일명 | 케밥케이스 (kebab-case) | logo-icon.png, profile-default.png |
| 함수명/변수명 | 카멜케이스 (camelCase) | fetchUserData, userList |
| 환경변수 | 스크리밍스네이크케이스 (SCREAMING_SNAKE_CASE) | VITE_API_URL |

### 🖊️ Git Flow

| **브랜치명** | **설명** |
|------------|---------|
| main | 배포 브랜치 |
| develop | 통합 개발 브랜치 |
| feat/* | 기능 개발 브랜치 |

### 🌿 브랜치 네이밍 컨벤션

| **브랜치 종류** | **네이밍 규칙** | **예시** |
| --- | --- | --- |
| 기능 개발 | feat/{이슈번호}-{이름} | feat/13-dropdown |
| 리팩토링 | refactor/{이슈번호}-{이름} | refactor/2-modal |
| 버그 수정 | fix/{이슈번호}-{이름} | fix/24-login-button-bug |
| 문서 수정 | docs/{이슈번호}-{이름} | docs/58-readme-update |
| 환경 설정 | chore/{이슈번호}-{이름} | chore/60-tailwind-setting |
