var express = require('express');
var cors = require('cors');
var sql = require("mysql");

var app = express();
var port = process.env.PORT || 5000;

var connection = sql.createConnection({
	// mysql://bd2cc55611689c:6fee58e8@us-cdbr-iron-east-03.cleardb.net/heroku_b2e5fb7fc11f642?reconnect=true
	host: 'us-cdbr-iron-east-03.cleardb.net',
	user: 'bd2cc55611689c',
	password: '6fee58e8',
	database: 'heroku_b2e5fb7fc11f642'
});

connection.connect(function(err) {
	if (err)
		throw err;
});

app.use(cors());
app.listen(port, function() {
	console.log(port);
});

app.get('/stat', function(req, res) {
	connection.query(`select S.cid, S.professor, S.title, S.GPA, R.diff, R.interst, R.useful from
					(select cid, professor, title, GPA
					from class) S left outer join
					(select cid, professor, title, round(avg(diff),1) as diff, round(avg(interst),1) as interst, round(avg(useful),1) as useful
					from rating
					group by cid, professor, title) R
					on S.cid = R.cid and S.professor = R.professor and S.title = R.title
					ORDER BY S.cid`,
	function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			return res.json({data : result});
		}
	});
});

app.get('/stat/search', function(req, res) {
	var {cid} = req.query;
	connection.query(`select S.cid, S.professor, S.title, S.GPA, R.diff, R.interst, R.useful from
					(select cid, professor, title, gpa
					from class) S left outer join
					(select cid, professor, title, round(avg(diff),1) as diff, round(avg(interst),1) as interst, round(avg(useful),1) as useful
					from rating
					group by cid, professor, title) R
					on S.cid = R.cid and S.professor = R.professor and S.title = R.title
					WHERE S.cid = '${cid}'
					ORDER BY S.cid`,
	function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			return res.json({data : result});
		}
	});
});

app.get('/comments', function(req, res) {
	var {cid, professor, title} = req.query;
	connection.query(`SELECT uid, time, comment, diff, interst, useful
					FROM Rating
					WHERE cid = '${cid}' AND professor = '${professor}' AND title = '${title}'`,
	function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			return res.json({data : result});
		}
	});
});

app.get('/comments/insert', function(req, res) {
	var {cid, professor, title, uid, time, comment, diff, interst, useful} = req.query;
	connection.query(`SELECT * FROM Rating
					WHERE cid = ? AND professor = ? AND title = ? AND uid = ?`,
					[cid, professor, title, uid],
	function(err, result) {
		if (err) {
			return res.send(err2);
		}
		else {
			console.log(result);
			if (result.length > 0) { // update
				connection.query(`UPDATE Rating SET time = ?, comment = ?, diff = ?, interst = ?, useful = ?
								WHERE cid = ? AND professor = ? AND title = ? AND uid = ?`,
				[time, comment, diff, interst, useful, cid, professor, title, uid],
				function(err2, result2) {
					if (err) {
						return res.send(err2);
					}
					else {
						return res.json({"success" : 1});
					}
				});
			}
			else { // insert
				console.log(`INSERT INTO Rating VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[cid, professor, title, uid, time, comment, diff, interst, useful]);
				connection.query(`INSERT INTO Rating VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[cid, professor, title, uid, time, comment, diff, interst, useful],
				function(err3, result3) {
					if (err) {
						return res.send(err3);
					}
					else {
						return res.json({"success" : 2});
					}
				});
			}
		}
	});

});

app.get('/comments/delete', function(req, res) {
	var {cid, professor, title, uid} = req.query;
	connection.query(`DELETE FROM Rating
					WHERE cid = ? AND professor = ? AND title = ? AND uid = ?`,
	[cid, professor, title, uid],
	function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			return res.json({"success" : 1});
		}
	})
});

// app.get('/comments/update', function(req, res) {
// 	var {cid, professor, title, uid, time, comment, diff, interst, useful} = req.query;
// 	connection.query(`UPDATE Rating SET time = ?, comment = ?, diff = ?, interst = ?, useful = ?
// 					WHERE cid = ? AND professor = ? AND title = ? AND uid = ?`,
// 	[time, comment, diff, interst, useful, cid, professor, uid],
// 	function(err, result) {
// 		if (err) {
// 			return res.send(err);
// 		}
// 		else {
// 			return res.json({"success" : 1});
// 		}
// 	});
// });

app.get('/login', function(req, res) {
	var {uid, password} = req.query;
	connection.query(`SELECT * FROM Users WHERE uid = '${uid}' AND password = '${password}'`,
	function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			if (result.length == 0) {
				return res.json({"success" : 0});
			}
			else {
				return res.json({"success" : 1});
			}
		}
	});
});

app.get('/signup', function(req, res) {
	var {uid, password} = req.query;
	connection.query(`SELECT * FROM Users WHERE uid = '${uid}'`, function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			if (result.length > 0) {
				return res.json({"success" : 0});
			}
			else {
				connection.query(`INSERT INTO Users(uid, password) VALUEs ('${uid}', '${password}')`,
				function(insert_err, insert_result) {
					if (insert_err) {
						return res.send(insert_err);
					}
					else {
						return res.json({"success" : 1});
					}
				});
			}
		}
	});
});

// app.get('/stat/group', function(req, res) {
// 	connection.query(`SELECT cid, ROUND((SUM(GPA * capacity)/SUM(capacity)),2) as GPA,
// 					SUM(capacity) as capacity
// 					FROM Class
// 					GROUP BY cid
// 					ORDER BY cid`,
// 	function(err, result) {
// 		if (err) {
// 			return res.send(err);
// 		}
// 		else {
// 			return res.json({data : result});
// 		}
// 	});
// });

app.get('/comments/profile', function(req, res) {
	var {uid} = req.query;
	connection.query(`SELECT cid, professor, title, time, comment, diff, interst, useful
					FROM Rating
					WHERE uid = '${uid}'`,
	function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			return res.json({data : result});
		}
	});
});
