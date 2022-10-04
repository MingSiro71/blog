create table post_tag_connections (
	id bigint AUTO_INCREMENT PRIMARY KEY,
    post_id bigint,
    tag_id bigint,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now(),
    FOREIGN KEY (post_id) REFERENCES posts (id),
    FOREIGN KEY (tag_id) REFERENCES tags (id)
)
ENGINE=innoDB,
CHARACTER SET=utf8mb4,
collate=utf8mb4_general_ci
