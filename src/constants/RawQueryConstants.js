module.exports = {
	GET_USER_FRIENDS_ORDERED_BY_METERS: {
		query:
			"select u.id, " +
			"u.username, " +
			"u.meters_high_score, " +
			"u.stars_high_score, " +
			"u.current_league_stars_score, " +
			"u.honor_points, " +
			"u.total_time_spent_in_seconds, " +
			"u.last_login, " +
			"l.id as `league.id`, " +
			"l.name as `league.name`, " +
			"d.id as `division.id`, " +
			"d.name as `division.name`, " +
			"c.id as `country.id`," +
			"c.name as `country.name`," +
			"c.iso_code as `country.iso_code` " +
			"from users as u \n" +
			"\n" +
			"left join leagues as l on l.id = u.league_id\n" +
			"left join divisions as d on d.id = u.division_id\n" +
			"left join countries as c on c.id = u.country_id\n" +
			"where u.id in(\n" +
			"\tselect f.addressee_id from friendships as f\n" +
			"   where f.requester_id = :userId" +
			"   and f.friendship_status = 'ACCEPTED'\n" +
			")\n" +
			"or u.id in (\n" +
			"\tselect f.requester_id from friendships as f\n" +
			"    where f.addressee_id = :userId\n" +
			"    and f.friendship_status = 'ACCEPTED'\n" +

			")" +
			"order by u.meters_high_score desc;"
	},
	GET_ACHIEVEMENTS_BY_USER: {
		query: "SELECT ach.id, \n" +
			"       ach.achievement_code,\n" +
			"       REPLACE(ach.title, '{{wildcard}}', al.max_count) AS title,\n" +
			"       REPLACE(ach.description, '{{wildcard}}', al.max_count) AS description,\n" +
			"       al.reward,\n" +
			"       al.level,\n" +
			"       au.is_claimed,\n" +
			"       au.current_level_id,\n" +
			"       au.previous_level_id,\n" +
			"       al.level,\n" +
			"       ach.max_levels,\n" +
			"       al.max_count,\n" +
			"       au.current_count,\n" +
			"       ach.google_play_string,\n" +
			"       ach.game_center_string,\n" +
			"       ach.is_hidden,\n" +
			"       CASE\n" +
			"         WHEN ( ach.max_levels = al.level\n" +
			"                AND au.current_count >= al.max_count ) THEN true\n" +
			"         ELSE false\n" +
			"       end                                              AS is_done\n" +
			"FROM   achievements ach\n" +
			"       LEFT JOIN achievement_user au\n" +
			"              ON au.achievement_id = ach.id\n" +
			"       INNER JOIN achievement_levels al\n" +
			"               ON al.achievement_id = ach.id\n" +
			"WHERE  al.id = (SELECT current_level_id\n" +
			"                FROM   achievement_user au1\n" +
			"                       INNER JOIN achievement_levels al2\n" +
			"                               ON au1.current_level_id = al2.id\n" +
			"                WHERE  user_id = au.user_id\n" +
			"                       AND au1.achievement_id = ach.id\n" +
			"                ORDER  BY al2.level DESC\n" +
			"                LIMIT  1)\n" +
			"       AND user_id = :userId \n" +
			"       order by ach.id asc;"
	},
	GET_USERS_FOR_LEAGUE_ONE: {
		query: "SELECT *\n" +
			"FROM   users\n" +
			"WHERE  league_id = :leagueId\n" +
			"       AND meters_high_score >= (SELECT min_meters_required\n" +
			"                                 FROM   leagues\n" +
			"                                 WHERE  id <> :leagueId\n" +
			"                                 LIMIT  1); "
	},
	GET_USER_SKINS: {
		query: "SELECT s.id,\n" +
			"       s.name,\n" +
			"       s.price,\n" +
			"       s.is_promo,\n" +
			"       su.has_been_unlocked\n" +
			"FROM   skins s\n" +
			"       JOIN skin_user su\n" +
			"         ON s.id = su.skin_id\n" +
			"WHERE  user_id = :userId;"
	},
	GET_USER_WALLPAPERS: {
		query: "SELECT w.id,\n" +
			"       w.price,\n" +
			"       w.image_path,\n" +
			"       w.image_thumbnail_path,\n" +
			"       wu.has_been_unlocked\n" +
			"FROM   wallpapers w\n" +
			"       INNER JOIN wallpaper_user wu\n" +
			"               ON wu.wallpaper_id = w.id\n" +
			"WHERE  wu.user_id = :userId;"
	}
}