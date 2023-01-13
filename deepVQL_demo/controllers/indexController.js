const express = require('express');
const fs = require('fs');

module.exports = {
	index: function (req, res, next) {
		res.render('index', { title: 'DeepVQL Demo' });
	},
	demo: function (req, res, next) {
		res.render('demo', { title: 'DeepVQL Demo' });
	},
	// down1Create: function (req, res, next) {
	// 	res.send({result:'ok'});
	// }
}