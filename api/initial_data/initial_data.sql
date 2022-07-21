-- CONFIG
INSERT INTO public.up_permissions(id, action, created_at, updated_at)
VALUES
    (9, 'api::score-system.score-system.find', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (10, 'api::score-system.score-system.findOne', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (11, 'api::score-system.score-system.create', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (12, 'api::score-system.score-system.update', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (13, 'api::score-system.score-system.delete', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (14, 'api::session.session.find', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (15, 'api::session.session.findOne', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (16, 'api::session.session.create', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (17, 'api::session.session.update', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (18, 'api::session.session.delete', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (19, 'plugin::users-permissions.user.create', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (20, 'plugin::users-permissions.user.update', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (21, 'plugin::users-permissions.user.find', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (22, 'plugin::users-permissions.user.findOne', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (23, 'plugin::users-permissions.user.count', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid'),
    (24, 'plugin::users-permissions.user.destroy', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid')
;

INSERT INTO public.up_permissions_role_links(permission_id, role_id)
VALUES
    (9, 1),
    (10, 1),
    (11, 1),
    (12, 1),
    (13, 1),
    (14, 1),
    (15, 1),
    (16, 1),
    (17, 1),
    (18, 1),
    (19, 1),
    (20, 1),
    (21, 1),
    (22, 1),
    (23, 1),
    (24, 1)
;

-- INITIAL DATA
INSERT INTO public.up_users(username, name, email, provider, confirmed, blocked, created_at, updated_at, created_by_id, updated_by_id)
VALUES ('arrowscore', 'ArrowScore', 'arrowscore@arrowscore.app', 'local', 't', 'f', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid', 1, 1);

INSERT INTO public.score_systems(name, code, apiid, created_at, updated_at, published_at, created_by_id, updated_by_id, targets)
VALUES ('WA3D 4Z', '3FAF', '4b3ca0511e30b836', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid', current_timestamp(3) at time zone 'Europe/Madrid', 1, 1,
        '[[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]],[[11,10,8,5,0],[11,10,8,5,0]]]');

INSERT INTO public.score_systems_author_links(score_system_id, user_id)
VALUES ((SELECT id from score_systems where code='3FAF'), (SELECT id from up_users where username='arrowscore'));
