INSERT INTO "BlogChannel" (
name,
platform,
base_url,
client_id,
client_secret,
access_token,
refresh_token,
is_active,
created_at,
updated_at,
deleted_at
)
VALUES (
'customsite',
'CUSTOM', -- 반드시 대문자로!
'https://customsite.com',
'example-client-id',
'example-client-secret',
'example-access-token',
'example-refresh-token',
true,
NOW(),
NOW(),
NULL
);
