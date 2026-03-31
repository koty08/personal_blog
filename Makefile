COMPOSE = docker compose --env-file .env.prod -f docker-compose.yaml -f docker-compose.prod.yaml
COMPOSE_DEV = docker compose --env-file .env.dev -f docker-compose.yaml -f docker-compose.dev.yaml

# 최초 배포
init:
	docker volume create personal_blog_db_data
	$(COMPOSE) up --build -d

# 재배포 (로컬 빌드)
deploy:
	$(COMPOSE) up --build -d

# 재배포 (CI에서 빌드된 이미지 사용)
deploy-image:
	$(COMPOSE) pull app
	$(COMPOSE) up -d --no-build

# 재시작 (이미지 재빌드 없음)
restart:
	$(COMPOSE) up -d

# 종료
down:
	$(COMPOSE) down

# 로그
logs:
	$(COMPOSE) logs -f

# 개발 환경 실행
dev:
	$(COMPOSE_DEV) up --build

# 개발 환경 종료
dev-down:
	$(COMPOSE_DEV) down -v

.PHONY: init deploy deploy-image restart down logs dev dev-down
