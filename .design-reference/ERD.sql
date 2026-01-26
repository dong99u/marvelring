-- Marvelring B2B Platform - Final ERD
-- Last Updated: 2026-01-26

-- ===========================================
-- 1. MEMBER (회원)
-- ===========================================
CREATE TABLE `member` (
    `member_id`           bigint       NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
    `username`            varchar(50)  NOT NULL COMMENT '아이디 UK1',
    `role`                enum('ROLE_ADMIN', 'ROLE_USER') NOT NULL DEFAULT 'ROLE_USER' COMMENT 'ROLE_ADMIN, ROLE_USER',
    `email`               varchar(255) NOT NULL COMMENT '이메일 UK2',
    `password`            varchar(255) NOT NULL COMMENT '비밀번호',
    `company_name`        varchar(100) NOT NULL COMMENT '상호명',
    `ceo_name`            varchar(50)  NOT NULL COMMENT '대표자명',
    `biz_reg_num`         varchar(20)  NOT NULL COMMENT '사업자 등록 번호',
    `biz_reg_image_url`   varchar(500) NOT NULL COMMENT '사업자 등록증 이미지',
    `business_type`       enum('WHOLESALE', 'RETAIL') NOT NULL COMMENT 'WHOLESALE, RETAIL',
    `approval_status`     enum('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING' COMMENT 'PENDING, APPROVED, REJECTED',
    `approved_at`         datetime     NULL COMMENT '가입 승인 시간',
    `zip_code`            varchar(10)  NOT NULL COMMENT '우편번호',
    `main_address`        varchar(255) NOT NULL COMMENT '주소',
    `detail_address`      varchar(255) NULL COMMENT '상세 주소',
    `created_at`          datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`          datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`member_id`),
    UNIQUE KEY `uk_member_username` (`username`),
    UNIQUE KEY `uk_member_email` (`email`)
);

-- ===========================================
-- 2. COLLECTION (브랜드/컬렉션)
-- ===========================================
CREATE TABLE `collection` (
    `collection_id`    bigint       NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
    `brand_name`       varchar(100) NOT NULL COMMENT '브랜드 이름(샤넬, 까르띠에 등)',
    `slug`             varchar(100) NOT NULL COMMENT '슬러그 UK',
    `logo_image_url`   varchar(500) NULL COMMENT '로고 이미지',
    `display_order`    int          NOT NULL DEFAULT 0 COMMENT '표기 순서',
    `created_at`       datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`       datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`collection_id`),
    UNIQUE KEY `uk_collection_slug` (`slug`)
);

-- ===========================================
-- 3. CATEGORY (카테고리)
-- ===========================================
CREATE TABLE `category` (
    `category_id`      bigint       NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
    `category_name`    varchar(100) NOT NULL COMMENT '카테고리 이름(반지, 목걸이 등)',
    `slug`             varchar(100) NOT NULL COMMENT '슬러그 UK',
    `display_order`    int          NOT NULL DEFAULT 0 COMMENT '표기 순서',
    `created_at`       datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`       datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`category_id`),
    UNIQUE KEY `uk_category_slug` (`slug`)
);

-- ===========================================
-- 4. PRODUCT (상품)
-- ===========================================
CREATE TABLE `product` (
    `product_id`              bigint        NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
    `collection_id`           bigint        NULL COMMENT 'FK to collection',
    `category_id`             bigint        NOT NULL COMMENT 'FK to category',
    `product_name`            varchar(200)  NOT NULL COMMENT '제품 이름(코코7M-CNC)',
    `product_code`            varchar(50)   NOT NULL COMMENT '제품 번호 UK',
    `base_labor_cost`         decimal(10,2) NULL COMMENT '기본 공임 비용',
    `stone_setting_cost`      decimal(10,2) NULL COMMENT '알 공임 비용',
    `weight`                  double        NULL COMMENT '무게',
    `ring_size`               double        NULL COMMENT '반지 호수',
    `size`                    double        NULL COMMENT '사이즈(지름)',
    `description`             text          NULL COMMENT '제품 설명',
    `additional_information`  text          NULL COMMENT '추가 기제 사항',
    `retail_price`            decimal(12,2) NOT NULL COMMENT '소매 가격',
    `wholesale_price`         decimal(12,2) NOT NULL COMMENT '도매 가격',
    `is_sale`                 boolean       NOT NULL DEFAULT FALSE COMMENT '세일(하자) 여부',
    `sale_price`              decimal(12,2) NULL COMMENT '할인된 가격 (하자일때만)',
    `created_at`              datetime      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`              datetime      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`product_id`),
    UNIQUE KEY `uk_product_code` (`product_code`),
    FOREIGN KEY (`collection_id`) REFERENCES `collection`(`collection_id`),
    FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`)
);

-- ===========================================
-- 5. PRODUCT_DIAMOND_INFO (상품 다이아몬드 정보)
-- ===========================================
CREATE TABLE `product_diamond_info` (
    `product_diamond_info_id` bigint NOT NULL AUTO_INCREMENT COMMENT 'auto increment',
    `product_id`              bigint NOT NULL COMMENT 'FK to product',
    `diamond_size`            double NOT NULL COMMENT '다이아 사이즈',
    `diamond_amount`          int    NOT NULL COMMENT '다이아 개수',
    PRIMARY KEY (`product_diamond_info_id`),
    FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE
);

-- ===========================================
-- 6. PRODUCT_MATERIAL_INFO (상품 재질 정보)
-- ===========================================
CREATE TABLE `product_material_info` (
    `product_material_info_id` bigint       NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
    `product_id`               bigint       NOT NULL COMMENT 'FK to product UK1',
    `material_type`            enum('14K', '18K', '24K', 'PLATINUM', 'SILVER', 'WHITE_GOLD', 'ROSE_GOLD') NOT NULL COMMENT 'UK1',
    `weight`                   double       NOT NULL COMMENT '중량(g)',
    `purity`                   decimal(5,2) NULL COMMENT '순도(%)',
    PRIMARY KEY (`product_material_info_id`),
    UNIQUE KEY `uk_product_material` (`product_id`, `material_type`),
    FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE
);

-- ===========================================
-- 7. PRODUCT_IMAGE (상품 이미지)
-- ===========================================
CREATE TABLE `product_image` (
    `product_image_id` bigint       NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
    `product_id`       bigint       NOT NULL COMMENT 'FK to product',
    `image_url`        varchar(500) NOT NULL COMMENT '이미지 URL',
    `title`            varchar(100) NULL COMMENT '제목',
    `description`      text         NULL COMMENT '설명',
    `display_order`    int          NOT NULL DEFAULT 0 COMMENT '표시 순서',
    `is_main`          boolean      NOT NULL DEFAULT FALSE COMMENT '대표 이미지 여부',
    `created_at`       datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`product_image_id`),
    FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE
);

-- ===========================================
-- 8. NOTICE (공지사항)
-- ===========================================
CREATE TABLE `notice` (
    `notice_id`   bigint       NOT NULL AUTO_INCREMENT COMMENT 'auto_increment',
    `member_id`   bigint       NULL COMMENT 'FK to member (작성자)',
    `title`       varchar(200) NOT NULL COMMENT '제목',
    `content`     text         NOT NULL COMMENT '내용',
    `is_pinned`   boolean      NOT NULL DEFAULT FALSE COMMENT '중요 (상단 고정)',
    `view_count`  int          NOT NULL DEFAULT 0 COMMENT '조회수',
    `created_at`  datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`notice_id`),
    FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`) ON DELETE SET NULL
);

-- ===========================================
-- INDEXES
-- ===========================================
CREATE INDEX `idx_product_created_at` ON `product`(`created_at` DESC);
CREATE INDEX `idx_product_is_sale` ON `product`(`is_sale`);
CREATE INDEX `idx_member_approval_status` ON `member`(`approval_status`);
CREATE INDEX `idx_notice_is_pinned` ON `notice`(`is_pinned`, `created_at` DESC);
