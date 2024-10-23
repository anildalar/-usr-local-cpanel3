-- 2024082600
-- RUNS ONLY ONCE; IGNORE ALL ERRORS

REPLACE INTO `system` (`name`, `value`) VALUES ('calendar-database-version', '2024082600');
REPLACE INTO `system` (`name`, `value`) VALUES ('calendar-caldav-version',   '2024082600');

DROP VIEW IF EXISTS caldav_calendars_merged;
ALTER TABLE carddav_addressbooks_X RENAME TO carddav_addressbooks;
