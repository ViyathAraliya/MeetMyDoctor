const express = require('express');
const app = require('./index');

module.exports = (req, res) => {
  return new Promise((resolve, reject) => {
    app(req, res).on('finish', () => resolve());
  });
};