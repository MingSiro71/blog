create table posts (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	title varchar(500),
    body text,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
)
ENGINE=innoDB,
CHARACTER SET=utf8mb4,
collate=utf8mb4_general_ci
