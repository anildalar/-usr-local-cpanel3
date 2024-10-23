-- 2024030500
-- BEST EFFORT; RUNS ONLY ONCE
REPLACE INTO `system` (`name`, `value`) VALUES ('calendar-database-version', '2024030500');
REPLACE INTO `system` (`name`, `value`) VALUES ('calendar-caldav-version',   '2024030500');
set @expectation := (SELECT DATA_TYPE FROM information_schema.COLUMNS c WHERE c.TABLE_SCHEMA = database() AND c.TABLE_NAME = 'calendars' AND c.COLUMN_NAME = 'driver');
set @sqlstmt := if( @expectation = 'varchar', 'DELETE FROM calendars WHERE driver <> ''database''', 'select ''Expectation not met, skipping 2024030500.''');
PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
