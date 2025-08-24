INSERT INTO roles (name) VALUES
  ('admin'), ('manager'), ('user');

INSERT INTO users (email, hashed_password)
SELECT
  'user' || i || '@example.com',
  'hashed_pw_' || i
FROM generate_series(1, 10) AS s(i);
