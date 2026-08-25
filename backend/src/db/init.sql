CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    imdb_id VARCHAR(20) NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 10),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, imdb_id)
);

-- Seed user default untuk testing (password: mutiaraIndahAnugrah)
INSERT INTO users (username, password_hash)
VALUES ('demo', '$2b$10$djRVL7L3uqXS8hoMw0NGgulRFKSMrUR5iLlilIMxTzVhQJgG6K.qC')
ON CONFLICT (username) DO NOTHING;