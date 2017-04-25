
exports.TEST = 'SELECT * FROM company';

exports.CREATE_TEMP_COMPANY =
	'INSERT INTO COMPANY (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING;';

exports.CREATE_UPDATE_COMPANY =
	'INSERT INTO COMPANY VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ' +
	'ON CONFLICT (id) DO UPDATE SET ' +
	'crunchbase_url = $3, ' +
	'homepage_url = $4, ' + 
	'category_code = $5, ' +
	'number_of_employees = $6, ' + 
	'founded_year = $7, ' +
	'founded_month = $8, ' +
	'founded_day = $9, ' +
	'deadpooled_year = $10, ' +
	'deadpooled_month = $11, ' +
	'deadpooled_day = $12, ' +
	'email_address = $13, ' +
	'phone_number = $14, ' +
	'overview = $15 ' +
	';';

exports.CREATE_COMPETITOR =
	'INSERT INTO competitor VALUES ($1, $2) ON CONFLICT(cid1, cid2) DO NOTHING';

exports.CREATE_FUNDING_ROUND =
	'INSERT INTO funding_round VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO NOTHING;';

exports.GET_COMPANIES_WITH_CONSTRAINTS =
	'SELECT c.name ' +
	'FROM company c, funding_round fr ' +
	'WHERE c.founded_year > $2 ' +
	'AND c.id = fr.cid ' +
	'AND c.id IN ( ' +
	'	SELECT fr.cid ' +
	'	FROM funding_round fr ' +
 	'   GROUP BY fr.cid ' +
	'	HAVING COUNT(*) > $1 ' +
	') ' +
	'GROUP BY c.id ' +
	'HAVING SUM(fr.raised_amount) > $3; ' +
	';'
;

/*
	SELECT c.name 
	FROM company c, funding_round fr
	WHERE c.founded_year > 2000
	AND c.id = fr.cid
	AND c.id IN (
		SELECT fr.cid
		FROM funding_round fr
		GROUP BY fr.cid
		HAVING COUNT(*) > 3
	)
	GROUP BY c.id
	HAVING SUM(fr.raised_amount) > 2000000;

	Q2
	SELECT c.name, f.title
	FROM company c, person p, founded f
	WHERE f.cid = c.cid
	AND f.pid = p.pid
	AND p.id = '';

	Q3
	//this query will span across multiple queries
	//find companies that it acquired
	SELECT c1.name, 'Acquired' as relationship
	FROM company c1, company c2, acquire a
	WHERE a.acquirer = c1.id
	AND a.acquired = c2.id
	AND c1.id = '%1'
	GROUP BY c1.id;
	SELECT c1.name, 'Acquired by' as relationship
	FROM company c1, company.c2, acquire a
	WHERE a.acquired = c1.id
	AND a.acquirer = c2.id
	AND c1.id = '%1'
	GROUP BY c1.id;
	SELECT c1.id, 'Competitor' as relationship
	FROM company c1, company c2, competitor co
	WHERE co.cid1 = c1.id
	AND co.cid2 = c2.id;

	Q4
	SELECT c1.cname
	FROM company c1, company c2, acquire a
	WHERE a.acquirer = c1.id
	AND a.acquired = c2.id
	AND c2.category_code = 'AI'
	GROUP BY c1.id;
*/