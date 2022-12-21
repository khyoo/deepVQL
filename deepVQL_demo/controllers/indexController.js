const express = require('express');
const fs = require('fs');

module.exports = {
	index: function (req, res, next) {
		res.render('index', { title: 'InfoLab 데모' });
	},
	// down1Create: function (req, res, next) {
	// 	res.send({result:'ok'});
	// }
}