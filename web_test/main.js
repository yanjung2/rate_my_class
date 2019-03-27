var express = require('express');
// var cors = require('cors');
var sql = require("mysql");

var app = express();
var port = process.env.PORT || 5000;

var connection = sql.createConnection({
	host: '',
	user: '',
	password: '',
	database: ''
});

connection.connect(function(err) {
	if (err) throw err;
});

// app.use(cors());
app.listen(port, function() {
	console.log(port);
});

app.get('/stat', function(req, res) {
	connection.query(`SELECT * FROM Class ORDER BY cid`, 
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
	connection.query(`SELECT * FROM Class WHERE cid = '${cid}' ORDER BY professor`, 
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
	var {cid, professor} = req.query;
	connection.query(`SELECT uid, time, comment, diff, interest, useful 
					FROM Rating 
					WHERE cid = '${cid}' AND professor = '${professor}' ORDER BY time`, 
	function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			return res.json({data : result});
		}
	});
});

app.get('comments/insert', function(req, res) {
	var {cid, professor, uid, time, comment, diff, interest, useful} = req.query;
	connection.query(`INSERT INTO Rating VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, 
	[cid, professor, uid, time, comment, diff, interest, useful],
	function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			return res.json({"success" : 1});
		}
	});
});

app.get('comments/delete', function(req, res) {
	var {cid, professor, uid} = req.query;
	connection.query(`DELETE FROM Rating 
					WHERE cid = ? AND professor = ? and uid = ?`, 
	[cid, professor, uid]
	function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			return res.json({"success" : 1});
		}
	})
});

app.get('comments/update', function(req, res) {
	var {cid, professor, uid, time, comment, diff, interest, useful} = req.query;
	connection.query(`UPDATE Rating SET time = ?, comment = ?, diff = ?, interest = ?, useful = ?
					WHERE cid = ? AND professor = ? AND uid = ?`, 
	[time, comment, diff, interest, useful, cid, professor, uid], 
	function(err, result) {
		if (err) {
			return res.send(err);
		}
		else {
			return res.json({"success" : 1});
		}
	});
});

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

