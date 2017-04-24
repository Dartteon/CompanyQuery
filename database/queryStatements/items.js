
exports.TEST = 'SELECT * FROM company';

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