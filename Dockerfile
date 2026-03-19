# Dockerfile

# 0. Base stage (공통 의존성 설치)
FROM node:22-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# 1. Development stage
FROM base AS development
# dev 환경에서는 command로 실행하므로 CMD는 불필요
# 소스코드는 docker-compose.dev.yaml에서 볼륨 마운트함

# 2. Builder stage (프로덕션 빌드용)
FROM base AS builder
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN npm run build

# 3. Runner stage (프로덕션 실행용)
FROM node:22-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
# standalone 빌드 결과물 복사
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public
RUN mkdir -p ./public/images/post
# 스키마, 마이그레이션, 생성된 prisma client, prisma.config.ts 복사
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/prisma.config.ts ./prisma.config.ts
# prisma 마이그레이션 진행
COPY --from=builder /usr/src/app/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "server.js"]
