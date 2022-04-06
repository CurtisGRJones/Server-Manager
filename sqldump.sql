/* CREATE users table */

CREATE TABLE IF NOT EXISTS users (
	username VARCHAR(16) PRIMARY KEY,
	password VARCHAR(128) NOT NULL,
	verified BOOL DEFAULT false,
	email VARCHAR(64) UNIQUE NOT NULL,
	first_name VARCHAR(32) NOT NULL,
	last_name VARCHAR(32) NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT NOW(),
	verified_on TIMESTAMP,
	last_login TIMESTAMP,
	verified_by VARCHAR(16)
		REFERENCES users,
	role INT DEFAULT 0
)

/* validate role */
UPDATE users
SET verified_on = NOW(),
    verified = true,
    role = 3
WHERE first_name = 'Curtis'

/* CREATE cookies table */
CREATE TABLE IF NOT EXISTS loginCookies (
    /* TODO make this a UUPD type */
    cookie VARCHAR(36) UNIQUE,
    expiry TIMESTAMP DEFAULT NOW() + INTERVAL '30 DAYS',
    last_used TIMESTAMP DEFAULT NOW(),
    remember BOOL DEFAULT false,
	username VARCHAR(16) PRIMARY KEY,
	CONSTRAINT fk_username
    	FOREIGN KEY(username)
        REFERENCES users (username)
        ON DELETE CASCADE
)

/* CREATE games table */
CREATE TABLE IF NOT EXISTS games (
	name VARCHAR(64) PRIMARY KEY,
	config VARCHAR(256),
	image_path VARCHAR(64),
	added_by VARCHAR(16),
	CONSTRAINT fk_added_by
    	FOREIGN KEY(added_by)
        REFERENCES users (username)
        ON DELETE SET NULL
)

/* ADD games */
INSERT INTO games
VALUES
	('COD WAW', '{ name: "cod waw" }', 'assets/waw.png', 'CJ'),
	('Minecraft', '{ name: "minecraft" }', 'assets/minecraft.png', 'CJ'),
	('AOE 4', '{ name: "aoe 4" }', 'assets/aoe4.png', 'CJ'),
	('AOE 2', '{ name: "aoe 2" }', 'assets/aoe4.png', 'CJ')


/* CREATE servers table */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS servers (
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	created_on TIMESTAMP DEFAULT NOW() NOT NULL,
	ip VARCHAR(15),
	active BOOL NOT NULL,
	game VARCHAR(64) NOT NULL,
	added_by VARCHAR(16),
	CONSTRAINT fk_game
        	FOREIGN KEY(game)
            REFERENCES games (name)
            ON DELETE CASCADE,
	CONSTRAINT fk_added_by
    	FOREIGN KEY(added_by)
        REFERENCES users (username)
        ON DELETE SET NULL
)

/* Add servers */
INSERT INTO servers (ip, active, game, added_by) VALUES
('192.168.0.1', false, 'Minecraft', 'CJ'),
('192.168.0.2', true, 'AOE 2', 'CJ'),
('192.168.0.3', false, 'Minecraft', 'CJ'),
('192.168.0.4', false, 'AOE 4', 'CJ'),
('192.168.0.5', false, 'Minecraft', 'CJ'),
('192.168.0.6', false, 'Minecraft', 'CJ'),
('192.168.0.7', false, 'COD WAW', 'CJ'),
('192.168.0.8', false, 'Minecraft', 'CJ'),
('192.168.0.9', false, 'Minecraft', 'CJ')
