create table tags (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	name varchar(500),
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
)
ENGINE=innoDB,
CHARACTER SET=utf8mb4,
collate=utf8mb4_general_ci
