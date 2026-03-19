# kotys.dev — 개인 블로그

Next.js 기반의 개인 블로그입니다.

## 기술 스택

| 분류       | 기술                              |
| ---------- | --------------------------------- |
| 프레임워크 | Next.js 16 (App Router), React 19 |
| 언어       | TypeScript                        |
| 스타일     | Tailwind CSS, Radix UI            |
| 상태 관리  | TanStack Query                    |
| 인증       | Better Auth (GitHub OAuth)        |
| ORM        | Prisma                            |
| DB         | PostgreSQL 17                     |
| 인프라     | Docker, Nginx, Cloudflare         |
| CI/CD      | GitHub Actions                    |

프로덕션 환경은 `.env.prod` 파일과 `nginx/certs/` 디렉토리에 SSL 인증서가 필요합니다.

## CI/CD

`main` 브랜치에 push 또는 PR 머지 시 GitHub Actions가 자동으로 서버에 SSH 접속하여 `make deploy`를 실행합니다.
