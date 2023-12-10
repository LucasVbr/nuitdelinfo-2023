import express from 'express';

const slug = "/more-info";
const route = (req, res) => {
  res.render('more_info');
  res.end();
};

export default {slug, route};